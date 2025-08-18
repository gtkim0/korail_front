import styles from './TableFilter.module.scss'
import clsx from "clsx";
import DropDown from "@/shared/components/dropDown/DropDown";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import Download from '@/shared/assets/images/download.svg';
import Image from "next/image";

interface Props {
  onSelect?: (value: { key: string, label: string }) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  enabledEdit?: boolean;
  enabledDelete?: boolean;
}

export default function TableFilter({onSelect, onEdit, onDelete, onDownload, enabledEdit, enabledDelete}: Props) {

  return (
    <div className={styles.tableFilter}>
      <div className={styles.wrapper}>
        <span style={{display: 'flex', whiteSpace: 'nowrap', gap: '.3rem'}}
              className={clsx('font_lg', 'text_bold', 'font')}>
          검색 결과
          <span className={'primary'}> 24개</span>
        </span>
        <span className={styles.line}> &nbsp; </span>

        <DropDown
          onSelect={onSelect!}
          options={[
            {key: '10', label: '10개씩 보기'},
            {key: '30', label: '30개씩 보기'},
            {key: '50', label: '50개씩 보기'},
            {key: '100', label: '100개씩 보기'}
          ]}
          renderSelected={(selected) => (
            <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
              <span style={{
                fontWeight: 500,
                color: '#363637',
                fontSize: '1.4rem',
                whiteSpace: 'nowrap'
              }}>{selected.label}</span>
              <ImageWrapper width={16} height={16} src="/arrow-down.svg"/>
            </div>
          )}
        />
      </div>


      <div className={styles.buttonWrapper}>
        {
          enabledDelete && <button onClick={() => onDelete?.()} className={styles.delete}>삭제</button>
        }
        {
          enabledEdit && <button onClick={() => onEdit?.()} className={styles.edit}>수정</button>
        }
        {
          onDownload &&
            <button className={styles.download}>
                내려받기
                <Image src={Download} alt={'logo'}/>
            </button>
        }
      </div>
    </div>
  )
}