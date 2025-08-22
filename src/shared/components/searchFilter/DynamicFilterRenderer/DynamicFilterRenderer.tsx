import FilterGroup from '../Filters/FilterGroup/FilterGroup';
import FilterCheckbox from '../Filters/FilterCheckbox/FilterCheckbox'
import FilterSelect from "../Filters/FilterSelect/FilterSelect";
import ColorPicker from "@/shared/components/colorPicker/ColorPicker";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import DatePickerRange from "@/shared/components/DatePicker/DatePickerRange";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {FilterType} from "@/shared/enum/FilterType";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";
import {useEffect, useState} from "react";
import styles from './DynamicFilterRenderer.module.scss';

type FilterSchema = {
  type: string;
  key: string;
  label: string;
  options?: readonly { key: string, label: string }[];
  style?: any;
  endPoint?: string;
}

export function DynamicFilterRenderer({schema, value, onChange, modalEndPoint}: {
  schema: FilterSchema[];
  value: Record<string, any>;
  onChange: (next: Record<string, any>) => void;
  modalEndPoint?: string;
}) {

  const handleChange = (key: string, val: any) => {
    onChange({...value, [key]: val});
  };

  /** @TODO 추후 동적으로 데이터 받아와서 필터에 넣어야되는경우 사용하기. **/
  const [optionsMap, setOptionsMap] = useState<FilterSchema[]>([]);

  useEffect(() => {
    const fetchAllOptions = async () => {
      const entries = await Promise.all(
        schema.map(async (item) => {
          if (item.endPoint) {
            const res = await fetch(item.endPoint);
            const data = await res.json();
            const options = data.map((d: any) => ({
              key: d.id?.toString() ?? d.code,
              label: d.name ?? d.label ?? d.title,
            }));
            // return [item.key, options] as const;
            return {
              key: item.key,
              options: options,
              label: item.label,
              type: item.type,
              style: item.style
            }
          }
          return {
            key: item.key,
            options: item.options,
            label: item.label,
            type: item.type,
            style: item.style
          }
          // return [item.key, item.options ?? []] as const;
        })
      );
      setOptionsMap(entries)
      // setOptionsMap(Object.fromEntries(entries));
    };

    fetchAllOptions();
  }, [schema]);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '3.6rem',
      padding: '1.6rem',
      background: '#EBEBEB',
      borderTop: '1px solid #D5D5D6'
    }}>
      {optionsMap.map(filter => (
        <FilterGroup key={filter.key}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            justifyContent: 'space-between',
            height: '100%'
          }}>
            <div style={{fontSize: '1.3rem', fontWeight: '600', lineHeight: '150%'}}>{filter.label}</div>
            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              {filter.type === FilterType.Checkbox && (
                <>
                  <FilterCheckbox
                    key="all"
                    label="전체"
                    checked={value[filter.key]?.length === filter.options?.length}
                    onChange={() => {
                      const allKeys = filter.options?.map(opt => opt.key) || [];
                      const isAllSelected = value[filter.key]?.length === allKeys.length;
                      handleChange(filter.key, isAllSelected ? [] : allKeys);
                    }}
                  />

                  {filter.options?.map(opt => (
                    <FilterCheckbox
                      key={opt.key}
                      label={opt.label}
                      checked={value[filter.key]?.includes(opt.key)}
                      onChange={() => {
                        const prev = value[filter.key] || [];
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
                  options={filter.options!}
                  value={value[filter.key] || ''}
                  onChange={(value) => handleChange(filter.key, value)}
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
                  options={filter.options!}
                  selected={value[filter.key]}
                  onChange={(val) => handleChange(filter.key, val)}
                />
              )}
            </div>
          </div>
        </FilterGroup>
      ))}
    </div>
  );
}