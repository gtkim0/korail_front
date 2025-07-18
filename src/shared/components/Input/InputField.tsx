import React, { useState } from 'react';
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import styles from './InputField.module.css';
import clsx from "clsx";

interface InputFieldProps {
  field: any;
  label: string;
  help?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  updateMenuField?: (value: string) => void;
  useCheckbox?: boolean;
  defaultChecked?: boolean;
  name?: string;
  helpPosition?: 'bottom' | 'top';
  height?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export const InputField = (
  {
    field,
    label,
    help,
    placeholder = '',
    name = '',
    type = 'text',
    disabled = false,
    required = false,
    updateMenuField,
    useCheckbox = false,
    defaultChecked = false,
    helpPosition = 'top',
    height = '4.4rem',
    onChange,
    value
  }: InputFieldProps) => {

  const [checked, setChecked] = useState(defaultChecked);
  const meta = field.getMeta();

  const showError = meta.isTouched && meta.errors?.[0]?.message;

  const isDisabled = disabled || (useCheckbox && !checked);

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      help={help}
      // error={showError}
      useCheckbox={useCheckbox}
      checked={checked}
      onCheckboxChange={setChecked}
      helpPosition={helpPosition}
    >
      <input
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        type={type}
        value={value ?? field?.state?.value ?? ''}
        onBlur={field?.handleBlur}
        onChange={onChange ?? ((e) => {
          const val = e.target.value;
          field?.handleChange(val);
          updateMenuField?.(val);
        })}
        className={clsx(styles.input, isDisabled && styles.disabled)}
        style={{ height }}
      />
      {
        showError && <div className={styles.error}>{field.state.meta.errors?.[0].message}</div>
      }
    </FormFieldWrapper>
  );
};