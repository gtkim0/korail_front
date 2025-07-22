import styles from './FileInput.module.scss'
import {useRef, ChangeEvent} from "react";

interface Props {
  value: string;
  onChange: (file: File | null) => void;
  placeHolder?: string;
}

export const FileInput = ({value, placeHolder, onChange}: Props) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputView}>
        <span className={styles.text}>{value || (placeHolder ?? '이미지 파일을 첨부해 주세요.')}</span>
      </div>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={styles.fileAddBtn}
      >
        파일선택
      </button>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  )
}