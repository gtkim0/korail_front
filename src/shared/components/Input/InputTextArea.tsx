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

<<<<<<< HEAD
  const { rows = 3, name, value, onChange } = props;

  return (
    <textarea
=======
  const { rows = 3, name, value, onChange, placeholder, disabled } = props;

  return (
    <textarea
      style={{
        fontFamily:'Pretendard'
      }}
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
<<<<<<< HEAD
=======
      placeholder={placeholder}
      disabled={disabled}
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
      className={styles.textArea}
    />
  )
}