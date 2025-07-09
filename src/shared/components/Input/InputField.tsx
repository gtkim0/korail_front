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
}

export const InputField = ({
                             field,
                             label,
                             help,
                             placeholder = '',
                             type = 'text',
                             disabled = false,
                             required = false,
                             updateMenuField,
                             useCheckbox = false,
                             defaultChecked = false,
                           }: InputFieldProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  const meta = field.getMeta();

  const isDisabled = disabled || (useCheckbox && !checked);

  return (
    <FormFieldWrapper
      label={label}
      required={required}
      help={help}
      error={meta.touchedErrors}
      useCheckbox={useCheckbox}
      checked={checked}
      onCheckboxChange={setChecked}
    >
      <input
        placeholder={placeholder}
        disabled={isDisabled}
        type={type}
        value={field.getValue()}
        onBlur={field.handleBlur}
        onChange={(e) => {
          const value = e.target.value;
          field.handleChange(value);
          updateMenuField?.(value);
        }}
        className={clsx(styles.input, isDisabled && styles.disabled)}
      />
    </FormFieldWrapper>
  );
};