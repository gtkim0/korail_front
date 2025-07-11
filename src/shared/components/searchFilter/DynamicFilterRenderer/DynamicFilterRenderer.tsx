import FilterGroup from '../Filters/FilterGroup/FilterGroup';
import FilterCheckbox from '../Filters/FilterCheckbox/FilterCheckbox'
import FilterSelect from "../Filters/FilterSelect/FilterSelect";
import ColorPicker from "@/shared/components/colorPicker/ColorPicker";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import DatePickerRange from "@/shared/components/DatePicker/DatePickerRange";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {FilterType} from "@/shared/enum/FilterType";

type FilterSchema = {
  type: string;
  key: string;
  label: string;
  options?: { key: string, label: string }[];
}

export function DynamicFilterRenderer({schema, value, onChange, endPoint}: {
  schema: FilterSchema[];
  value: Record<string, any>;
  onChange: (next: Record<string, any>) => void;
  endPoint?: string;
}) {
  const handleChange = (key: string, val: any) => {
    onChange({...value, [key]: val});
  };

  return (
    <div style={{display: 'flex', flexWrap:'wrap', gap:'3.6rem', padding:'1.6rem',background:'#EBEBEB', borderTop:'1px solid #D5D5D6'}}>
      {schema.map(filter => (
        <FilterGroup key={filter.key}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent:'space-between', height:'100%' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{filter.label}</div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap:'wrap'  }}>
              {filter.type === FilterType.Checkbox && (
                <>
                  {/* 전체 선택 옵션 */}
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

                  {/* 실제 옵션들 */}
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
                />
              )}

              {filter.type === FilterType.DateRange && (
                <DatePickerRange
                  startDate={value[filter.key]?.startDate}
                  endDate={value[filter.key]?.endDate}
                  onChange={({ startDate, endDate}) => handleChange(filter.key, { startDate, endDate })}
                />
              )}

              {filter.type === FilterType.ColorPicker && (
                <ColorPicker
                  color={value[filter.key] || '#000000'}
                  onChangeAction={(val: string) => handleChange(filter.key, val)}
                />
              )}

              {filter.type === FilterType.SearchModal && endPoint && (
                <SearchModalTrigger
                  value={value[filter.key]}
                  onSelect={(v)=> handleChange(filter.key, v)}
                  endPoint={endPoint}
                />
              )}
            </div>
          </div>
        </FilterGroup>
      ))}
    </div>
  );
}