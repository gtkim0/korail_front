import FilterRadio from "@/shared/components/searchFilter/Filters/FilterRadio/FilterRadio";
type Option = {
  key: string;
  label: string;
};

type FilterRadioGroupProps = {
  name: string;
  options: Option[];
  selected: string;
  onChange: (key: string) => void;
};

export default function FilterRadioGroup({name, options, selected, onChange}: FilterRadioGroupProps) {
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {options.map((opt) => (
        <FilterRadio
          key={opt.key}
          name={name}
          label={opt.label}
          value={opt.key}
          checked={selected === opt.key}
          onChange={onChange}
        />
      ))}
    </div>
  );
}