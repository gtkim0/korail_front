import React, { ChangeEvent } from 'react'

interface InputFieldProps {
  field: any;
  label: string;
  help?: string;
  type?: string;
  disabled?: boolean;
  updateMenuField?: (value: string)=> void;
}

export const InputField = ({ field, label, help, disabled = false, type = 'text', updateMenuField }: InputFieldProps) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>{label}</label>
      <input
        disabled={disabled}
        type={type}
        value={field.getValue()}
        onBlur={field.handleBlur}
        onChange={(e)=> {
          const value = e.target.value;
          field.handleChange(value);
          updateMenuField && updateMenuField(value)
        }}
        // onChange={(e) => field.handleChange(e.target.value)}
        // onChange: {(e) => {
        //   field.handleChange(e);
        //   updateMenuField(selectedMenu!.id, { description: e.target.value });
        // }},
        style={{
          padding: '0.4rem 0.6rem',
          border: '1px solid #ccc',
          borderRadius: 4,
          width: '100%',
        }}
      />
      {help && <div style={{ fontSize: '0.85rem', color: '#666' }}>{help}</div>}
      {field.getMeta().touchedErrors && (
        <div style={{ color: 'red', fontSize: '0.8rem' }}>{field.getMeta().touchedErrors}</div>
      )}
    </div>
  );
};