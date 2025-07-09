import styles from './FormFieldWrapper.module.css';

interface FormFieldWrapperProps {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: React.ReactNode;
  useCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
}

export default function FormFieldWrapper({
                                           label,
                                           required,
                                           help,
                                           error,
                                           children,
                                           useCheckbox = false,
                                           checked,
                                           onCheckboxChange,
                                         }: FormFieldWrapperProps) {
  return (
    <div className={styles.fieldWrapper}>
      <label className={styles.label}>
        {useCheckbox && (
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            onChange={(e) => onCheckboxChange?.(e.target.checked)}
          />
        )}
        <div>
          {label}
          {required && <span className={styles.required}>*</span>}
        </div>
      </label>

      {help && <div className={styles.help}>{help}</div>}
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}