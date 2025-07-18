import React from 'react';

type FilterRadioProps = {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
};

export default function FilterRadio ({label, name, value, checked, onChange}: FilterRadioProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize:'1.5rem' }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span>{label}</span>
    </label>
  );
}