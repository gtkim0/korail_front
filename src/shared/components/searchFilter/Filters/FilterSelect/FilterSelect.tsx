import {ChangeEvent} from "react";

type FilterSelectProps = {
  options: { key: string,label: string }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>)=> void;
}

export default function FilterSelect ({ options, value, onChange }: FilterSelectProps) {
  return (
    <select onChange={onChange} value={value} style={{ fontSize: '1.4rem' }}>
      {options.map(opt => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
    </select>
  );
}