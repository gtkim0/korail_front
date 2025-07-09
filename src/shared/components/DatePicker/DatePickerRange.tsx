import React, {forwardRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './DatePickerRange.module.css'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

export default function DatePickerRange() {
  return (
    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
      <DatePicker
        selected={new Date()}
        dateFormat={'yyyy-MM-dd'}
        customInput={<CustomInput/>}
      />
      <span style={{fontWeight: 700, lineHeight: '150%', fontSize: '1.5rem'}}>-</span>
      <DatePicker
        selected={new Date()}
        dateFormat={'yyyy-MM-dd'}
        customInput={<CustomInput/>}
      />
    </div>
  )
}

const CustomInput = forwardRef<HTMLInputElement, any>(
  ({value, onClick}, ref) => (
    <div className={styles.inputWrapper} onClick={onClick}>
      <input
        ref={ref}
        value={value}
        readOnly
        className={styles.input}
        placeholder="날짜 선택"
      />
      <ImageWrapper width={20} height={20} src={'/calendar.svg'}/>
    </div>
  )
)