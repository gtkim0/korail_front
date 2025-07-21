'use client';
import styles from './ColorPicker.module.css';
import {useState, useRef, useEffect, CSSProperties} from 'react';
import dynamic from 'next/dynamic';

const SketchPicker = dynamic(() => import('react-color').then(mod => mod.ChromePicker), {
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
    const handleClickOutside = (e: PointerEvent) => {
      // setTimeout으로 SketchPicker 내부 클릭 DOM이 완전히 마운트되기를 기다림
      setTimeout(() => {
        if (
          pickerRef.current &&
          !pickerRef.current.contains(e.target as Node) &&
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setShowPicker(false);
        }
      }, 0);
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
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
        <div onClick={(e)=> e.stopPropagation()} ref={pickerRef} style={{ position: 'absolute', top: '3rem', width:'100%', left: 0, zIndex: 100 }}>
          <SketchPicker
            styles={{
              width:'100%'
            }}
            color={color}
            onChange={(updatedColor) => onChangeAction(updatedColor.hex)}
          />
        </div>
      )}
    </div>
  );
}