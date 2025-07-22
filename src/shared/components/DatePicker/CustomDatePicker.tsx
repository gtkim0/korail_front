import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import DatePicker from "react-datepicker";
import {CustomInput} from "./DatePickerRange";

type Props = {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

export default function CustomDatePicker ({date,onChange}: Props) {
  return (
    <DatePicker
      selected={date}
      dateFormat={'yyyy-MM-dd'}
      portalId="root-portal"
      customInput={<CustomInput className={'fullWidth'}/>}
      onChange={(date: Date | null) => onChange(date)}
    />
  )
}