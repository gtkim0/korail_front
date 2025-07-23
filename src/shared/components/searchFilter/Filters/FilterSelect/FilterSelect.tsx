'use client';

import {useState, useRef, useEffect} from 'react';
import styles from './FilterSelect.module.scss';
import {ImageWrapper} from '@/shared/components/ImageWrapper/ImageWrapper';
import clsx from "clsx";

type Option = {
  key: string;
  label: string;
};

type FilterSelectProps = {
<<<<<<< HEAD
=======
  enabledAll?: boolean;
>>>>>>> 1e81324 (fit(비상 대응) - 알림 규칙 퍼블리싱)
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
};

export default function FilterSelect({options, value, enabledAll = true, onChange}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(opt => opt.key === value)?.label || ( enabledAll ? '전체' : '선택');

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className={styles.customSelectWrapper} ref={dropdownRef}>
      <div className={styles.selectedBox} onClick={() => setOpen(prev => !prev)}>
        <span style={{flex: 1}}>{selectedLabel}</span>
        <ImageWrapper width={16} height={16} src={'/arrow-down.svg'} alt=""/>
      </div>

      <ul
        className={clsx(styles.dropdown, {[styles.open]: open})}
      >
        {
          enabledAll &&
            <li
                className={value === '' ? styles.active : ''}
                onClick={() => {
                  onChange('');
                  setOpen(false);
                }}
            >
              전체
            </li>
        }
        {options.map(opt => (
          <li
            key={opt.key}
            className={value === opt.key ? styles.active : ''}
            onClick={() => {
              onChange(opt.key);
              setOpen(false);
            }}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
}