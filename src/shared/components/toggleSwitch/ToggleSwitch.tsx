'use client';

import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
    checked: boolean;
    label?: string;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    width?: number; // width만 주면 나머지는 비례 계산
    height?: number,
}

export default function ToggleSwitch({
                                         checked,
                                         onChange,
                                         disabled = false,
                                         width = 30,
                                         height = 16,
                                         label,
                                     }: ToggleSwitchProps) {
    const thumbSize = height - 4;
    const translateX = width - height;

    return (
        <div style={{display: 'flex', alignItems: 'center', gap: '.6rem'}}>
            <button
                type="button"
                className={`${styles.toggle} ${checked ? styles.on : ''} ${disabled ? styles.disabled : ''}`}
                onClick={() => !disabled && onChange(!checked)}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    borderRadius: `${height}px`,
                    padding: 0,
                }}
                disabled={disabled}
            >
      <span
          className={styles.thumb}
          style={{
              width: `${thumbSize}px`,
              height: `${thumbSize}px`,
              top: '2px',
              left: '2px',
              transform: checked ? `translateX(${translateX}px)` : 'translateX(0)',
          }}
      />
            </button>
            {label && <div className={styles.toggleLabel}>{label}</div>}
        </div>
    );
}