import styles from './Dropdown.module.scss';
import clsx from "clsx";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {ReactNode, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

interface Props {
  options: { key: string, label: string }[];
  onSelect: (value: { key: string, label: string })=> void;
  renderSelected?: ( selected: { key: string, label: string }) => ReactNode;
}

export default function DropDown ({onSelect, renderSelected, options}: Props) {

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: { key: string, label: string }) => {
    setSelected(option);
    onSelect && onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={styles.container}>
      <div onClick={toggleDropdown} className={styles.dropdown}>
        {renderSelected
          ? renderSelected(selected)
          : (
            <>
              <span className={clsx('font', 'font_md')} style={{flex: 1}}>{selected.label}</span>
              <ImageWrapper width={16} height={16} src={'/arrow-down.svg'} />
            </>
          )
        }
      </div>

      {isOpen && (
        <AnimatePresence>
          <motion.div
            key="dropdown"
            className={clsx(styles.dropdown_content)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <div
                className={option.key === selected.key ? styles.selected : ''}
                key={option.key}
                onClick={() => handleSelect(option)}
                style={{width:'100%'}}
              >
                <span>{option.label}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}