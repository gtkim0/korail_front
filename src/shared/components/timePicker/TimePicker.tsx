import {useState, useEffect, useRef} from "react";
import styles from './TimePicker.module.scss'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

interface Props {
  label?: string;
  value: { hour: string; minute: string; ampm?: 'AM' | 'PM' };
  onChange: (value: { hour: string; minute: string; ampm?: 'AM' | 'PM' }) => void;
  useAmPm?: boolean;
}

const pad = (num: number) => num.toString().padStart(2, '0');

export default function RcTimePicker({label = '', value, onChange, useAmPm}: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);
  const secondListRef = useRef<HTMLDivElement>(null);
  const ampmListRef = useRef<HTMLDivElement>(null);

  const [hour, setHour] = useState(value.hour);
  const [minute, setMinute] = useState(value.minute);
  const [second, setSecond] = useState(value.second || '00');
  const [ampm, setAmPm] = useState<'AM' | 'PM'>(value.ampm || 'AM');

  const hours = useAmPm
    ? Array.from({ length: 12 }, (_, i) => pad(i + 1))
    : Array.from({ length: 24 }, (_, i) => pad(i));
  const minutes = Array.from({ length: 60 }, (_, i) => pad(i));
  const seconds = Array.from({ length: 60 }, (_, i) => pad(i));

  useEffect(() => {
    setHour(pad(value.hour));
    setMinute(pad(value.minute));
    setSecond(pad(value.second || '00'));
    setAmPm(value.ampm || 'AM');
  }, [value]);

  useEffect(() => {
    onChange({ hour, minute, second, ampm: useAmPm ? ampm : undefined });
  }, [hour, minute, second, ampm]);

  const scrollToValue = (ref: React.RefObject<HTMLDivElement>, value: string) => {
    if (ref.current) {
      const el = ref.current.querySelector(`[data-value="${pad(value)}"]`) as HTMLElement;
      if (el) {
        ref.current.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToValue(hourListRef, hour);
      scrollToValue(minuteListRef, minute);
      scrollToValue(secondListRef, second);
      if (useAmPm) scrollToValue(ampmListRef, ampm);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const val = raw.length > 2 ? raw.slice(-2) : raw;
    if (!isNaN(+val) && +val <= (useAmPm ? 12 : 23)) {
      setHour(pad(val));
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const val = raw.length > 2 ? raw.slice(-2) : raw;
    if (!isNaN(+val) && +val <= 59) {
      setMinute(pad(val));
    }
  };

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const val = raw.length > 2 ? raw.slice(-2) : raw;
    if (!isNaN(+val) && +val <= 59) {
      setSecond(pad(val));
    }
  };

  const handleAmPmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    if (val === 'AM' || val === 'PM') {
      setAmPm(val);
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputGroup} onClick={() => setIsOpen(true)}>
        <div style={{flex: 1}}>
          <input
            className={styles.segmentInput}
            value={hour}
            onChange={handleHourChange}
            onFocus={() => setIsOpen(true)}
            placeholder="HH"
          />
          <span className={styles.separator}>:</span>
          <input
            className={styles.segmentInput}
            value={minute}
            onChange={handleMinuteChange}
            onFocus={() => setIsOpen(true)}
            placeholder="MM"
          />
          <span className={styles.separator}>:</span>
          <input
            className={styles.segmentInput}
            value={second}
            onChange={handleSecondChange}
            onFocus={() => setIsOpen(true)}
            placeholder="SS"
          />
          {useAmPm && (
            <input
              className={styles.segmentInput}
              value={ampm}
              onChange={handleAmPmChange}
              onFocus={() => setIsOpen(true)}
              placeholder="AM/PM"
            />
          )}
        </div>
        <ImageWrapper width={20} height={20} src={'/time.svg'} />
      </div>
      {isOpen && (
        <div className={styles.dropdownWrapper}>
          <div className={styles.dropdownColumn} ref={hourListRef}>
            {hours.map((h) => (
              <div
                key={h}
                className={`${styles.dropdownItem} ${h === hour ? styles.selected : ''}`}
                data-value={h}
                onClick={() => setHour(h)}
              >
                {h}
              </div>
            ))}
          </div>
          <span className={styles.separator}>:</span>
          <div className={styles.dropdownColumn} ref={minuteListRef}>
            {minutes.map((m) => (
              <div
                key={m}
                className={`${styles.dropdownItem} ${m === minute ? styles.selected : ''}`}
                data-value={m}
                onClick={() => setMinute(m)}
              >
                {m}
              </div>
            ))}
          </div>
          <span className={styles.separator}>:</span>
          <div className={styles.dropdownColumn} ref={secondListRef}>
            {seconds.map((s) => (
              <div
                key={s}
                className={`${styles.dropdownItem} ${s === second ? styles.selected : ''}`}
                data-value={s}
                onClick={() => setSecond(s)}
              >
                {s}
              </div>
            ))}
          </div>
          {useAmPm && (
            <div className={styles.dropdownColumn} ref={ampmListRef}>
              {['AM', 'PM'].map((ap) => (
                <div
                  key={ap}
                  className={`${styles.dropdownItem} ${ap === ampm ? styles.selected : ''}`}
                  data-value={ap}
                  onClick={() => setAmPm(ap as 'AM' | 'PM')}
                >
                  {ap}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}