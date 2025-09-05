import {useEffect, useMemo, useRef, useState} from "react";
import FilterGroup from '../Filters/FilterGroup/FilterGroup';
import FilterCheckbox from '../Filters/FilterCheckbox/FilterCheckbox'
import FilterSelect from "../Filters/FilterSelect/FilterSelect";
import ColorPicker from "@/shared/components/colorPicker/ColorPicker";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import DatePickerRange from "@/shared/components/DatePicker/DatePickerRange";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";
import {FilterType} from "@/shared/enum/FilterType";
import styles from './DynamicFilterRenderer.module.scss';
import {useClientApi} from "@/shared/hooks/useClientApi";

export type Option = { key: string; label: string };

export type PreloadConfig = {
  endpoint?: string | ((params?: any) => Promise<any>);
  method?: 'GET' | 'POST';
  params?: () => Record<string, any>;
  datasetKey: string;
};

export type DerivedOptionsConfig = {
  fromDataset: string;
  dependsOn: string[];
  derive: (dataset: any, value: Record<string, any>) => Option[];
};

type AsyncOptionsConfig = {
  endpoint?: string | ((params: Record<string, any>) => Promise<Option[]>);
  method?: 'GET' | 'POST';
  params?: (value: Record<string, any>) => Record<string, any>;
  dependsOn?: string[];
  map?: (res: any) => Option[];
  debounceMs?: number;
  cacheKey?: (value: Record<string, any>) => string;
};

export type FilterSchema = {
  type: string;
  key: string;
  label: string;
  enabledAll?: boolean;
  options?: readonly Option[];
  preload?: PreloadConfig;
  asyncOptions?: AsyncOptionsConfig;
  derivedOptions?: DerivedOptionsConfig;
  style?: any;
};

export function DynamicFilterRenderer({
                                        schema,
                                        value,
                                        onChange,
                                        modalEndPoint
                                      }: {
  schema: FilterSchema[];
  value: Record<string, any>;
  onChange: (next: Record<string, any>) => void;
  modalEndPoint?: string;
}) {
  const api = useClientApi();
  const [optionsMap, setOptionsMap] = useState<Record<string, Option[]>>({});
  const [datasets, setDatasets] = useState<Record<string, any>>({});
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  // asyncOptions용: 캐시/중단/디바운스 핸들러
  const cacheRef = useRef<Map<string, Option[]>>(new Map());
  const abortRef = useRef<Record<string, AbortController | null>>({});
  const debounceRef = useRef<Record<string, number | null>>({});

  const setOptions = (key: string, opts: Option[]) =>
    setOptionsMap(prev => ({...prev, [key]: opts}));

  const setLoading = (key: string, b: boolean) =>
    setLoadingMap(prev => ({...prev, [key]: b}));

  /** ───────────────────────── preload (dataset 미리 불러오기) ───────────────────────── **/
  useEffect(() => {
    const jobs = schema.map(f => f.preload).filter(Boolean) as NonNullable<FilterSchema["preload"]>[];
    if (jobs.length === 0) return;

    (async () => {
      await Promise.all(jobs.map(async (job) => {
        setLoading(job.datasetKey, true);
        try {
          let data: any;
          if (typeof job.endpoint === 'function') {
            data = await job.endpoint(job.params?.());
          } else if (job.endpoint) {
            const method = job.method ?? 'GET';
            const params = job.params?.() ?? {};
            const resp = method === 'POST'
              ? await api.post(job.endpoint, params)
              : await api.get(job.endpoint, params);
            // 응답 구조 유연 처리
            data = resp?.result?.list ?? resp?.result ?? resp?.data ?? resp;
          }
          setDatasets(prev => ({...prev, [job.datasetKey]: data}));
        } catch (e) {
          console.error('[preload error]', e);
        } finally {
          setLoading(job.datasetKey, false);
        }
      }));
    })();
  }, [schema]);

  /** ───────────────────────── derivedOptions (클라 파생) ───────────────────────── **/
  useEffect(() => {
    const derivedList = schema.filter(f => !!f.derivedOptions);

    derivedList.forEach(f => {
      const d = f.derivedOptions!;
      const dataset = datasets[d.fromDataset];

      if (!dataset) {
        setOptions(f.key, []);
        return;
      }

      const ready = d.dependsOn.every(k => value[k] !== undefined && value[k] !== '');
      if (!ready) {
        setOptions(f.key, []);
        return;
      }

      const opts = d.derive(dataset, value) || [];
      setOptions(f.key, opts);

      // 현재 선택값 유효성 정리
      const curr = value[f.key];
      const keys = new Set(opts.map(o => o.key));
      const invalid = Array.isArray(curr) ? curr.some((c: string) => !keys.has(c)) : curr && !keys.has(curr);
      if (invalid) {
        onChange({...value, [f.key]: Array.isArray(curr) ? [] : ''});
      }
    });
  }, [
    schema,
    datasets,
    ...useMemo(
      () => Array.from(new Set(schema.flatMap(f => f.derivedOptions?.dependsOn ?? []))).map(k => value[k]),
      [schema, value]
    )
  ]);

  /** ───────────────────────── asyncOptions (API 기반 옵션) ───────────────────────── **/

    // 공용 fetch 함수
  const fetchAsyncOptions = async (f: FilterSchema) => {
      const cfg = f.asyncOptions!;
      const debounceMs = cfg.debounceMs ?? 150;

      // 디바운스 처리
      if (debounceRef.current[f.key]) {
        window.clearTimeout(debounceRef.current[f.key]!);
      }
      await new Promise<void>(resolve => {
        debounceRef.current[f.key] = window.setTimeout(() => resolve(), debounceMs);
      });

      // 기존 요청 취소
      abortRef.current[f.key]?.abort?.();
      const ac = new AbortController();
      abortRef.current[f.key] = ac;

      // 캐시 키
      const ck = cfg.cacheKey
        ? cfg.cacheKey(value)
        : `${f.key}:${JSON.stringify((cfg.dependsOn ?? []).map(k => value[k]))}`;

      // 캐시 사용
      if (cacheRef.current.has(ck)) {
        setOptions(f.key, cacheRef.current.get(ck)!);
        return;
      }

      setLoading(f.key, true);
      try {
        let opts: Option[] = [];

        if (typeof cfg.endpoint === 'function') {
          const p = cfg.params?.(value) ?? {};
          const res = await cfg.endpoint(p);
          opts = res; // 함수형이면 Option[] 반환 가정
        } else if (cfg.endpoint) {
          const method = cfg.method ?? 'GET';
          const params = cfg.params?.(value) ?? {};
          const resp = method === 'POST'
            ? await api.post(cfg.endpoint, params)
            : await api.get(cfg.endpoint, params);
          const raw = resp?.result?.list ?? resp?.result ?? resp?.data ?? resp;
          opts = cfg.map ? cfg.map(raw) : (
            Array.isArray(raw)
              ? raw.map((d: any) => ({
                key: String(d.id ?? d.code ?? d.key ?? d.value ?? ''),
                label: String(d.name ?? d.label ?? d.title ?? d.text ?? d.id ?? d.code ?? '')
              }))
              : []
          );
        }

        cacheRef.current.set(ck, opts);
        setOptions(f.key, opts);

        // 선택값 유효성 정리
        const curr = value[f.key];
        const keys = new Set(opts.map(o => o.key));
        const invalid = Array.isArray(curr) ? curr.some((c: string) => !keys.has(c)) : curr && !keys.has(curr);
        if (invalid) {
          onChange({...value, [f.key]: Array.isArray(curr) ? [] : ''});
        }
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          console.error(`[asyncOptions: ${f.key}] fetch error`, e);
          setOptions(f.key, []);
        }
      } finally {
        setLoading(f.key, false);
      }
    };

  // 1) dependsOn 없는 asyncOptions: 마운트 시 1회
  useEffect(() => {
    const list = schema.filter(f => f.asyncOptions && !(f.asyncOptions!.dependsOn?.length));
    list.forEach(f => {
      fetchAsyncOptions(f);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  // 2) dependsOn 있는 asyncOptions: 의존 값 변화 시마다
  useEffect(() => {
    const dependent = schema.filter(f => f.asyncOptions?.dependsOn?.length);
    dependent.forEach(f => {
      const deps = f.asyncOptions!.dependsOn!;
      const ready = deps.every(k => value[k] !== undefined && value[k] !== '');
      if (ready) fetchAsyncOptions(f);
      else setOptions(f.key, []); // 부모 선택 해제 시 옵션 비우기
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    schema,
    ...useMemo(
      () => Array.from(new Set(schema.flatMap(f => f.asyncOptions?.dependsOn ?? []))).map(k => value[k]),
      [schema, value]
    )
  ]);

  /** ───────────────────────── 공용 onChange (부모 바뀌면 자식 초기화) ───────────────────────── **/
  const handleChange = (key: string, val: any) => {
    const next = {...value, [key]: val};
    schema.forEach((f) => {
      const deps = [
        ...(f.derivedOptions?.dependsOn ?? []),
        ...(f.asyncOptions?.dependsOn ?? []),
      ];
      if (deps.includes(key)) {
        next[f.key] = Array.isArray(next[f.key]) ? [] : '';
      }
    });
    onChange(next);
  };

  /** ───────────────────────── render ───────────────────────── **/
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '3.6rem',
      padding: '1.6rem',
      background: '#EBEBEB',
      borderTop: '1px solid #D5D5D6'
    }}>
      {schema.map(filter => {
        const opts = optionsMap[filter.key] ?? filter.options ?? [];
        const busy =
          (filter.preload && loadingMap[filter.preload.datasetKey]) ||
          loadingMap[filter.key];

        return (
          <FilterGroup key={filter.key}>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
              <div style={{fontSize: '1.3rem', fontWeight: 600}}>
                {filter.label}
              </div>

              <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                {filter.type === FilterType.Checkbox && (
                  <>
                    <FilterCheckbox
                      key="all"
                      label="전체"
                      checked={Array.isArray(value[filter.key]) && value[filter.key]?.length === opts.length && opts.length > 0}
                      onChange={() => {
                        const allKeys = opts.map(o => o.key);
                        const isAll = Array.isArray(value[filter.key]) && value[filter.key]?.length === allKeys.length;
                        handleChange(filter.key, isAll ? [] : allKeys);
                      }}
                    />
                    {opts.map(opt => (
                      <FilterCheckbox
                        key={opt.key}
                        label={opt.label}
                        checked={Array.isArray(value[filter.key]) && value[filter.key]?.includes(opt.key)}
                        onChange={() => {
                          const prev = Array.isArray(value[filter.key]) ? value[filter.key] : [];
                          const next = prev.includes(opt.key)
                            ? prev.filter((v: string) => v !== opt.key)
                            : [...prev, opt.key];
                          handleChange(filter.key, next);
                        }}
                      />
                    ))}
                  </>
                )}

                {filter.type === FilterType.Switch && (
                  <ToggleSwitch
                    width={30}
                    label={value[filter.key] === 'ON' ? 'ON' : 'OFF'}
                    checked={value[filter.key] === 'ON'}
                    onChange={(checked) => handleChange(filter.key, checked ? 'ON' : 'OFF')}
                  />
                )}

                {filter.type === FilterType.Select && (
                  <FilterSelect
                    enabledAll={filter.enabledAll}
                    options={opts}
                    value={value[filter.key] || ''}
                    onChange={(v) => handleChange(filter.key, v)}
                    style={filter.style}
                  />
                )}

                {filter.type === FilterType.DateRange && (
                  <DatePickerRange
                    startDate={value[filter.key]?.startDate}
                    endDate={value[filter.key]?.endDate}
                    onChange={({startDate, endDate}) => handleChange(filter.key, {startDate, endDate})}
                  />
                )}

                {filter.type === FilterType.ColorPicker && (
                  <ColorPicker
                    className={styles.colorPicker}
                    color={value[filter.key] || '#000000'}
                    onChangeAction={(val: string) => handleChange(filter.key, val)}
                  />
                )}

                {filter.type === FilterType.SearchModal && modalEndPoint && (
                  <SearchModalTrigger
                    columns={[]}
                    value={value[filter.key]}
                    onSelect={(v) => handleChange(filter.key, v)}
                    endPoint={modalEndPoint}
                    isOpen={false}
                    onOpen={() => {
                    }}
                    onClose={() => {
                    }}
                  />
                )}

                {filter.type === FilterType.Radio && (
                  <FilterRadioGroup
                    name={filter.key}
                    options={opts}
                    selected={value[filter.key]}
                    onChange={(val) => handleChange(filter.key, val)}
                  />
                )}
              </div>
            </div>
          </FilterGroup>
        );
      })}
    </div>
  );
}