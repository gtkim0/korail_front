import React, {forwardRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './DatePickerRange.module.css'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import { ko } from 'date-fns/locale'

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
};

export default function DatePickerRange({ startDate, endDate, onChange }: Props ) {
  return (
    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
      <DatePicker
        locale={ko}
        selected={startDate}
        dateFormat={'yyyy-MM-dd'}
        portalId="root-portal"
        customInput={<CustomInput />}
        onChange={(date: Date | null) => onChange({ startDate: date, endDate })}
      />
      <span style={{fontWeight: 700, lineHeight: '150%', fontSize: '1.5rem'}}>-</span>
      <DatePicker
        locale={ko}
        selected={endDate}
        dateFormat={'yyyy-MM-dd'}
        portalId="root-portal"
        customInput={<CustomInput />}
        onChange={(date: Date | null) => onChange({ startDate, endDate: date })}
      />
    </div>
  )
}

export const CustomInput = forwardRef<HTMLInputElement, any>(
  ({value, onClick, className}, ref) => (
    <div className={`${styles.inputWrapper} ${className ?? ''}`} onClick={onClick}>
      <input
        ref={ref}
        value={value}
        readOnly
        className={styles.input}
        placeholder="날짜 선택"
        style={{
          cursor:'pointer',
          fontSize:'1.5rem',
          lineHeight: '150%',
          // #A3A3A9
        }}
      />
      <ImageWrapper width={20} height={20} src={'/calendar.svg'}/>
    </div>
  )
)