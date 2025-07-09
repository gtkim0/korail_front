'use client';
import Image from "next/image";
import styles from './SearchFilter.module.css'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {ForwardedRef, forwardRef} from "react";
import useModal from "@/shared/hooks/useModal";
import DatePickerRange from "@/shared/components/DatePicker/DatePickerRange";
import AddButton from "@/shared/components/button/AddButton";
import clsx from "clsx";
import {DynamicFilterRenderer} from "@/shared/components/searchFilter/DynamicFilterRenderer/DynamicFilterRenderer";
import {menuColumns} from "@/features/menu/columns/menuColumns";
import {isAccessorColumn} from "@/shared/utils/isAccessorColumn";
import {filterSchemas} from "@/shared/contants/filterSchemas";

interface Props {
  onAdd: ()=> void;
  type: string;
  value: {[key:string]: any}
  onChange: ( value: any )=> void;
}

export const SearchFilter = forwardRef<HTMLInputElement, Props>((props, ref: ForwardedRef<HTMLInputElement>) => {

  const { onAdd, type, value, onChange} = props;
  const {isOpen, open, close} = useModal();

  return (
    <div className={styles.container}>
      <div className={styles.searchFilter}>
        <div className={styles.wrapper}>
          <div className={styles.inputWrapper}>
            <input placeholder={'검색어를 입력해주세요.'} ref={ref}/>
            <ImageWrapper width={24} height={24} src={'/search.svg'}/>
          </div>
          <div onClick={() => isOpen ? close() : open()} className={clsx(styles.filter, isOpen && styles.open)}>
            <Image src={isOpen ? '/table-filter-fill.svg' : '/table-filter.svg'} alt={'logo'} width={16} height={16}/>
            <span>필터</span>
          </div>
        </div>

        <AddButton text={'등록'} onClick={onAdd}/>
      </div>
      {
        isOpen &&
        <DynamicFilterRenderer
          schema={filterSchemas[type]}
          value={value}
          onChange={onChange}
        />
      }
    </div>
  )
})
