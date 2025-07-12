import styles from './TableFilter.module.scss'
import clsx from "clsx";
import DropDown from "@/shared/components/dropDown/DropDown";

interface Props {
  onSelect: (value: string)=> void;
}

export default function TableFilter ({ onSelect }: Props) {


  return (
    <div className={styles.tableFilter}>
      <div className={styles.wrapper}>
        <span className={clsx('font_lg', 'text_bold','font')}>
          검색 결과
          <span className={'primary'}> 24개</span>
        </span>
        <span className={styles.line}> &nbsp; </span>

        <DropDown
          onSelect={onSelect}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.delete}>삭제</button>
        <button className={styles.edit}>수정</button>
      </div>
    </div>
  )
}