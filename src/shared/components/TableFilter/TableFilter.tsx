import styles from './TableFilter.module.scss'
import clsx from "clsx";
import DropDown from "@/shared/components/dropDown/DropDown";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import Download from '@/shared/assets/images/download.svg';
import Image from "next/image";
import {ReactNode} from "react";

interface Props {
  onSelect?: (value: { key: string, label: string }) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  enabledEdit?: boolean;
  enabledDelete?: boolean;
  rightSlot?: () => ReactNode | undefined;
  renderToolbarRight: any;
  filteredOps: any;
  actions?: any;
}

export default function TableFilter({
                                      onSelect,
                                      onEdit,
                                      onDelete,
                                      onDownload,
                                      enabledEdit,
                                      enabledDelete,
                                      rightSlot,
                                      renderToolbarRight,
                                      filteredOps,
                                      actions
                                    }: Props) {

  const renderActions = actions

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

      {/*{*/}
      {/*  customTableFilter*/}
      {/*}*/}
      <div className={styles.buttonWrapper}>
        {
          renderActions ?
            renderActions.map((a) => {
              const className =
                a.variant === 'danger'
                  ? styles.delete
                  : a.variant === 'primary'
                    ? styles.edit :
                    styles.normal

              return (
                <button key={a.key} onClick={a.onClick()}>
                  {a.label}
                </button>
              )
            })
            :
            renderToolbarRight ?
              renderToolbarRight()
              :
              <>
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
                {
                  rightSlot && rightSlot()
                }
              </>
        }

      </div>
    </div>
  )
}