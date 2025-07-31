import styles from './FormFieldWrapper.module.css';
import clsx from "clsx";

interface FormFieldWrapperProps {
  label: string;
  required?: boolean;
  help?: string;
  helpPosition?: 'top' | 'bottom'
  error?: string;
  children: React.ReactNode;
  useCheckbox?: boolean;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  direction?: 'horizontal' | 'vertical'
}

export default function FormFieldWrapper({
                                           label,
                                           required,
                                           help,
                                           helpPosition = 'top',
                                           error,
                                           children,
                                           useCheckbox = false,
                                           checked,
                                           onCheckboxChange,
  direction = 'vertical'
                                         }: FormFieldWrapperProps) {
  return (
    <div className={clsx(styles.fieldWrapper, direction === 'horizontal' ? styles.horizontal : styles.vertical )}>
      {
        label &&
        <label className={styles.label}>
          {useCheckbox && (
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={checked}
              onChange={(e) => onCheckboxChange?.(e.target.checked)}
            />
          )}
          <div style={{display:'flex',gap:'.2rem'}}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </div>
        </label>
      }


      {help && helpPosition === 'top' && <div className={styles.help}>{help}</div>}
      {children}
      {help && helpPosition === 'bottom' && <div className={styles.help}>{help}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}