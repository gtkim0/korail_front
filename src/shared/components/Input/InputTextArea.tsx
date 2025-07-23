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

  const { rows = 3, name, value, onChange } = props;

  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className={styles.textArea}
    />
  )
}