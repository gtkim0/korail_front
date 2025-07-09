import styles from './FilterCheckbox.module.css';
type FilterCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function FilterCheckbox ({label, ...inputProps}: FilterCheckboxProps) {
  return (
    <label className={styles.container}>
      <input type="checkbox" {...inputProps}/>
      <span className={styles.label}>{label}</span>
    </label>
  );
}