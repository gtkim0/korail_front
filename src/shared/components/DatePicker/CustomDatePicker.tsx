// import "react-datepicker/dist/react-datepicker.css";
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import {CustomInput} from "./DatePickerRange";
import {ko} from 'date-fns/locale'
// import '../../styles/datePicker.module.scss';
import '../../styles/datePicker-over.module.scss';

import CustomDatePickerHeader from "@/shared/components/DatePicker/CustomDatePickerHeader";

type Props = {
  date: Date | null;
  onChange: (date: Date | null) => void;
}

export default function CustomDatePicker({date, onChange}: Props) {

  const [openState, setOpenState] = useState({year: false, month: false});

  return (
    <DatePicker
      locale={ko}
      portalId="root-portal"
      selected={date}
      onChange={(d) => onChange(d)}
      dateFormat="yyyy-MM-dd"
      showPopperArrow={false}
      // placeholderText="날짜 선택"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      customInput={<CustomInput/>}
      renderCustomHeader={(props) => (
        <CustomDatePickerHeader
          {...props}
          openState={openState}
          setOpenState={setOpenState}
        />
      )}
    />
  )
}