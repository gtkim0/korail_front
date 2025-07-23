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
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
};

export default function FilterSelect({options, value, onChange}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(opt => opt.key === value)?.label || '전체';

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
        <li
          className={value === '' ? styles.active : ''}
          onClick={() => {
            onChange('');
            setOpen(false);
          }}
        >
          전체
        </li>
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