import {ChangeEvent} from "react";
import styles from './InputTextArea.module.scss'

interface InputTextAreaProps {
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function InputTextArea(props: InputTextAreaProps) {

  const { rows = 3, name, value, onChange, placeholder, disabled } = props;

  return (
    <textarea
      style={{
        fontFamily:'Pretendard'
      }}
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      disabled={disabled}
      className={styles.textArea}
    />
  )
}