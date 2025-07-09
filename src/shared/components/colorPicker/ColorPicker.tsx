'use client';
import styles from './ColorPicker.module.css';
import {useState, useRef, useEffect, CSSProperties} from 'react';
import dynamic from 'next/dynamic';

const SketchPicker = dynamic(() => import('react-color').then(mod => mod.SketchPicker), {
  ssr: false,
});

type Props = {
  color: string;
  onChangeAction: (color: string) => void;
}

export default function ColorPicker ({color, onChangeAction}: Props) {

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onClick={() => setShowPicker((prev) => !prev)}
    >
      <input
        type="text"
        className={styles.colorInput}
        value={color}
        onChange={(e) => onChangeAction(e.target.value)}
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(true);
        }}
        onBlur={() => {
          if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            alert('올바른 HEX 코드 (#RRGGBB)를 입력하세요');
          }
        }}
      />
      <div
        className={styles.colorPreview}
        style={{ '--color': color } as CSSProperties}
      />

      {showPicker && (
        <div ref={pickerRef} style={{ position: 'absolute', top: '3rem', width:'100%', left: 0, zIndex: 100 }}>
          <SketchPicker
            color={color}
            onChange={(updatedColor) => onChangeAction(updatedColor.hex)}
          />
        </div>
      )}
    </div>
  );
}