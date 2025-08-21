import styles from './MultiSelect.module.scss';
import useModal from "@/shared/hooks/useModal";
import {useEffect, useRef, useState} from "react";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import clsx from "clsx";
import {useOutsideClick} from "@/shared/hooks/useOutsideClick";

interface Props {
  options: {
    key: string,
    label: string
  }[],
  value: {
    key: string,
    label: string
  }[],
  onChange: (val: {
    key: string,
    label: string
  }[]) => void;
}

export default function MultiSelect({options, value, onChange}: Props) {

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = (item) => {
    if (value.length === 0 || value.every(i => i.key !== item.key)) {
      onChange([...value, item])
    } else {
      onChange([
        ...value.filter(i => i.key !== item.key)
      ])
    }
  }

  const selectedLabel = value.length === 0 ? '선택' :
    value.length === 1 ? value[0].label : `${value[0].label} 외 ${value.length - 1}건`

  useOutsideClick({ref: dropdownRef, setOpen});

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <div className={styles.selectedBox} onClick={() => setOpen(prev => !prev)}>
        <span style={{flex: 1}}>
          {selectedLabel}
        </span>
        <ImageWrapper width={16} height={16} src={'/arrow-down.svg'} alt=""/>
      </div>
      <ul className={clsx(styles.dropdown, {[styles.open]: open})}>
        {
          options.map((item) => (
            <li
              onClick={() => handleChange(item)}
              key={item.key}
              className={value.some(i => i.key === item.key) ? styles.active : ''}
            >
              <input
                onChange={() => {
                }}
                checked={value.some(i => i.key === item.key)}
                type={'checkbox'}
                style={{
                  cursor: 'pointer'
                }}
              />
              {item.label}
            </li>
          ))
        }
      </ul>
    </div>

  )
}