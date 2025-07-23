'use client';
import Image from "next/image";
import React, {useState} from "react";
import styles from './CustomDatePickerHeader.module.scss'

interface Props {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
  openState: { year: boolean; month: boolean };
  setOpenState: React.Dispatch<React.SetStateAction<{ year: boolean; month: boolean }>>;
}

export default function CustomDatePickerHeader({date, changeYear, changeMonth, openState, setOpenState}: Props) {
  const years = Array.from({length: 30}, (_, i) => 2020 + i);
  const months = [
    '1', '2', '3', '4', '5', '6',
    '7', '8', '9', '10', '11', '12'
  ];

  const goToPrevMonth = () => {
    const month = date.getMonth();
    if (month === 0) {
      changeYear(date.getFullYear() - 1);
      setTimeout(() => {
        changeMonth(11);
      }, 0);
    } else {
      changeMonth(month - 1);
    }
  };

  const goToNextMonth = () => {
    const month = date.getMonth();
    if (month === 11) {
      changeYear(date.getFullYear() + 1);
      setTimeout(() => {
        changeMonth(0);
      }, 0);
    } else {
      changeMonth(month + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={goToPrevMonth} className={styles.navButton}>
        <Image src={'/arrow-left.svg'} alt={''} width={16} height={16} />
      </div>

      <div className={styles.centerGroup}>
        <div
          onClick={() => setOpenState({ year: !openState.year, month: false })}
          className={styles.toggleButton}
        >
          <span className={styles.toggleText}>{date.getFullYear()}년</span>
          <Image src={'/arrow-down-fill.svg'} alt={''} width={16} height={16} />
          {openState.year && (
            <div className={styles.dropdown}>
              {years.map((year) => (
                <div
                  key={year}
                  className={styles.dropdownItem}
                  onClick={() => {
                    changeYear(year);
                    setOpenState({ year: false, month: false });
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          onClick={() => setOpenState({ year: false, month: !openState.month })}
          className={styles.toggleButton}
        >
          <span className={styles.toggleText}>{date.getMonth() + 1}월</span>
          <Image src={'/arrow-down-fill.svg'} alt={''} width={16} height={16} />
          {openState.month && (
            <div className={styles.dropdown}>
              {months.map((month, idx) => {
                return (
                  <div
                    key={month}
                    className={styles.dropdownItem}
                    onClick={() => {
                      changeMonth(idx);
                      setOpenState({year: false, month: false});
                    }}
                  >
                    {month}월
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div onClick={goToNextMonth} className={styles.navButton}>
        <Image src={'/arrow-right.svg'} alt={''} width={16} height={16} />
      </div>
    </div>
  )
}