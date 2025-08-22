import React, {forwardRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './DatePickerRange.module.css'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {ko} from 'date-fns/locale'
import CustomDatePickerHeader from "@/shared/components/DatePicker/CustomDatePickerHeader";

type Props = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
};

//@TODO MAX DATE, MIN DATE props 로 받아야함.

export default function DatePickerRange({startDate, endDate, onChange}: Props) {

  const [openState, setOpenState] = useState({year: false, month: false});

  return (
    <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
      <DatePicker
        locale={ko}
        selected={startDate}
        dateFormat={'yyyy-MM-dd'}
        portalId="root-portal"
        customInput={<CustomInput/>}
        onChange={(date: Date | null) => onChange({startDate: date, endDate})}
        renderCustomHeader={(props) => (
          <CustomDatePickerHeader
            {...props}
            openState={openState}
            setOpenState={setOpenState}
          />
        )}
      />
      <span style={{fontWeight: 700, lineHeight: '150%', fontSize: '1.5rem'}}>-</span>
      <DatePicker
        locale={ko}
        selected={endDate}
        dateFormat={'yyyy-MM-dd'}
        portalId="root-portal"
        customInput={<CustomInput/>}
        onChange={(date: Date | null) => onChange({startDate, endDate: date})}
        renderCustomHeader={(props) => (
          <CustomDatePickerHeader
            {...props}
            openState={openState}
            setOpenState={setOpenState}
          />
        )}
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
        placeholder="YYYY-MM-DD"
        style={{
          cursor: 'pointer',
          fontSize: '1.5rem',
          lineHeight: '150%',
          // width: '17rem'
          // #A3A3A9
        }}
      />
      <ImageWrapper width={20} height={20} src={'/calendar.svg'}/>
    </div>
  )
)