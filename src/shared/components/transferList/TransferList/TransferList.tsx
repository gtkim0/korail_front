'use client';
import {useTransferList} from "@/shared/hooks/useTransferList";
import styles from './TransferList.module.scss';
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useEffect, useRef} from "react";
import Image from "next/image";
import ArrowRightBlue from '@/shared/assets/images/arrow-right-blue.svg'
import ArrowTop from '@/shared/assets/images/arrow-top.svg'
import ArrowSort from '@/shared/assets/images/arrow-sort-both.svg'

interface Column<T> {
  key: keyof T & string;
  header: string;
}

interface Props<T extends Record<string, any>> {
  columns: readonly Column<T>[];
  rightColumns?: readonly Column<T>[];
  initialItems: T[];
  value: T[];
  onChange: (next: T[]) => void;
  idKey?: keyof T & string;
}

export default function TransferList<T extends Record<string, any>>({
                                                                      columns,
                                                                      rightColumns,
                                                                      initialItems,
                                                                      value,
                                                                      onChange,
                                                                      idKey = 'id' as keyof T & string
                                                                    }: Props<T>) {

  const {
    leftItems, rightItems,
    leftSelectedRows, rightSelectedRows,
    onSort, onAdd, onDelete, onMoveUp, onMoveDown,
    onCheckboxToggle, onChangeHeaderToggle, onClick,
    getId,
  } = useTransferList<T>({initialItems, selectedItems: value, idKey});

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onChange?.(rightItems);
  }, [rightItems, onChange]);

  const isSelected = (rows: T[], row: T) =>
    rows.some(r => getId(r) === getId(row));

  const renderTable = (
    items: T[],
    selectedRows: T[],
    source: 'LEFT' | 'RIGHT',
    isOrdered = false
  ) => (
    <table className={styles.table}>
      <thead style={{position: 'sticky', top: 0}}>
      <tr>
        <th>
          <input
            type="checkbox"
            checked={source === 'LEFT'
              ? (leftSelectedRows.length === leftItems.length && leftItems.length !== 0)
              : (rightSelectedRows.length === rightItems.length && rightItems.length !== 0)}
            onChange={() => onChangeHeaderToggle(source)}
          />
        </th>
        {isOrdered &&
            <th className={styles.sortableHeader} onClick={() => onSort(idKey, source)}>
                <div className={styles.thContent}>
                    <span className={styles.thText}>순서</span>
                  {/*<Image src={ArrowSort} alt=""/>*/}
                </div>
            </th>
        }
        {columns.map(col => (
          <th
            key={col.key}
            onClick={() => onSort(col.key, source)}
            className={styles.sortableHeader}  // 클릭 커서/효과만 유지 (flex는 여기서 제거)
          >
            <div className={styles.thContent}>
              <span className={styles.thText}>{col.header}</span>
              {/*<Image src={ArrowSort} alt=""/>*/}
            </div>
          </th>
        ))}
      </tr>
      </thead>
      <tbody style={{minHeight: '300px'}}>
      {items.map((item, idx) => {
        const checked = isSelected(selectedRows, item);
        return (
          <tr
            style={{background: '#fff'}}
            key={String(getId(item))}
            onClick={(e) => onClick(e, item, source)}
            className={checked ? styles.selectedRow : ''}
          >
            <td>
              <input
                type="checkbox"
                checked={checked}
                onClick={e => e.stopPropagation()}
                onChange={() => onCheckboxToggle(item, source)}
              />
            </td>

            {isOrdered && <td>{idx + 1}</td>}
            {columns.map(col => (
              <td key={col.key}>{String(item[col.key] ?? '')}</td>
            ))}
          </tr>
        );
      })}
      </tbody>
    </table>
  );

  return (
    <div className={styles.container}>
      <div className={styles.leftArea}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div className={styles.inputArea}>
            <div style={{
              background: '#fff',
              display: 'flex',
              width: '100%',
              borderRadius: '6px',
              alignItems: 'center',
              padding: '0 1rem'
            }}>
              <input type={'text'} ref={inputRef} placeholder="검색어를 입력해주세요."/>
              <span><ImageWrapper width={20} height={20} src="/search.svg"/></span>
            </div>
          </div>
          <div
            style={{
              padding: '0 1.6rem 1.6rem 1.6rem'
            }}
          >
            <div
              style={{
                // padding: '0 1.6rem 1.6rem 1.6rem',
                minHeight: '30rem',
                maxHeight: '60rem',
                overflowY: 'auto',
              }}
            >
              {renderTable(leftItems, leftSelectedRows, 'LEFT')}
            </div>
          </div>
        </div>
        <div style={{padding: '1.2rem 1.6rem'}} className={styles.footer}>
          <span style={{fontSize: '1.4rem'}}>선택된 {leftSelectedRows.length}명</span>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '3.2rem',
              background: '#E2F0FE',
              padding: '0 1rem',
              color: '#00417A',
              border: '1px solid #5EB2FE',
              borderRadius: '4px'
            }}
            type={'button'}
            onClick={onAdd}
          >추가 <Image
            src={ArrowRightBlue} alt=""/></button>
        </div>
      </div>

      <div className={styles.rightArea}>
        <div className={styles.rightHeader}>
          <span style={{fontSize: '1.4rem', fontFamily: 'Pretendard GOV'}}>총 {rightItems.length}명 등록됨</span>
          <div style={{display: 'flex', gap: '.8rem'}}>
            <button type={'button'} className={styles.arrowBtn} onClick={onMoveUp}><Image src={ArrowTop} alt="up"/>
            </button>
            <button type={'button'} className={styles.arrowBtn} onClick={onMoveDown}><Image src={ArrowTop} alt="down"
                                                                                            style={{transform: 'rotate(180deg)'}}/>
            </button>
            <button className={styles.delBtn} type={'button'} onClick={onDelete}>선택삭제</button>
          </div>
        </div>
        <div
          style={{
            maxHeight: '30rem',
            overflowY: 'auto',
          }}
        >
          {renderTable(rightItems, rightSelectedRows, 'RIGHT', true)}
        </div>
      </div>
    </div>
  );
}