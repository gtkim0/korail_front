'use client';
import Image from "next/image";
import styles from './SearchFilter.module.scss'
import {KeyboardEvent, ForwardedRef, forwardRef, useEffect, ReactNode} from "react";
import useModal from "@/shared/hooks/useModal";
import AddButton from "@/shared/components/button/AddButton";
import clsx from "clsx";
import {DynamicFilterRenderer} from "@/shared/components/searchFilter/DynamicFilterRenderer/DynamicFilterRenderer";
import {filterSchemas} from "@/shared/contants/filterSchemas";
import {AnimatePresence, motion} from "framer-motion";
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import {PageType} from "@/shared/enum/PageType";

interface Props {
  onAdd: () => void;
  type: PageType;
  value: { [key: string]: any } | any;
  onChange: (value: any) => void;
  onSubmit?: () => void;
  enabledAdd?: boolean;
  CustomFilterSubRender?: ReactNode;
}

export const SearchFilter = forwardRef<HTMLInputElement, Props>((props, ref: ForwardedRef<HTMLInputElement>) => {

  const {onAdd, type, value, onChange, onSubmit, enabledAdd} = props;

  const {isOpen, open, close} = useModal();
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) onSubmit();
  }

  useEffect(() => {
    window.addEventListener('resize', (e) => {
    })
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.searchFilter}>
        <div className={styles.wrapper}>
          <SearchInput
            width={'32rem'}
            onKeyDown={handleKeyDown}
            onSubmit={() => onSubmit?.()}
            ref={ref}
            parentClass={styles.inputProps}
            inputClass={styles.input}
            showBorder
            showSearchTitle
          />
          <div onClick={() => isOpen ? close() : open()} className={clsx(styles.filter, isOpen && styles.open)}>
            <Image src={isOpen ? '/basic-search.svg' : '/multi-search.svg'} alt={'logo'} width={16} height={16}/>
            <span>검색 필터</span>
          </div>
        </div>
        {
          enabledAdd &&
            <div className={styles.buttonArea}>
                <AddButton text={'등록'} onClick={onAdd}/>
            </div>
        }
      </div>
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0,
        }}
        transition={{duration: 0.3, ease: 'easeInOut'}}
        style={{
          overflow: isOpen ? 'visible' : 'hidden',   // ★ 열릴 때는 보이게
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        aria-hidden={!isOpen}
      >
        <DynamicFilterRenderer
          schema={filterSchemas[type]}
          value={value}
          onChange={onChange}
          modalEndPoint="/"
        />
      </motion.div>
    </div>
  )
})
