import clsx from "clsx";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useState} from "react";

interface Props {
  onSelect: (value: string)=> void;
}

export default function DropDown ({onSelect}: Props) {

  const options = ['10개씩 보기', '20개씩 보기', '50개씩 보기'];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* 드롭다운 버튼 */}
      <div
        onClick={toggleDropdown}
        style={{
          display: 'flex',
          gap: '.2rem',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span className={clsx('font', 'font_md')}>{selected}</span>
        <ImageWrapper width={16} height={16} src={'/arrow-down.svg'} />
      </div>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '0.25rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backgroundColor: option === selected ? '#f0f0f0' : 'white',
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}