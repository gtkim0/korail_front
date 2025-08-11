'use client';
import {useTransferList} from "@/shared/hooks/useTransferList";
import styles from './TransferList.module.scss';
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useRef} from "react";
import clsx from "clsx";
import Image from "next/image";
import ArrowRightBlue from '@/shared/assets/images/arrow-right-blue.svg'
import ArrowTop from '@/shared/assets/images/arrow-top.svg'
import ArrowSort from '@/shared/assets/images/arrow-sort-both.svg'

const dummy = [
  {id: 1, num: '4081', type: 'normal'},
  {id: 2, num: '4082', type: 'normal'},
  {id: 3, num: '4083', type: 'normal'},
  {id: 4, num: '4084', type: 'normal'},
  {id: 5, num: '4085', type: 'normal'},
  {id: 6, num: '4085', type: 'normal'},
  {id: 7, num: '4085', type: 'normal'},
  {id: 8, num: '4085', type: 'normal'},
  {id: 9, num: '4085', type: 'normal'},
  {id: 10, num: '4085', type: 'normal'},
  {id: 11, num: '4085', type: 'normal'},
  {id: 12, num: '4085', type: 'normal'},
]
const rightDummy = [
  {
    id: 13,
    num: '4086',
    type: 'normal'
  },
]

interface Column {
  key: string;
  header: string;
}

interface Props<T> {
  columns: readonly Column[]
  initialItems: Array<T>
  selectedItems: Array<T>
}

export default function TransferList<T>({columns, initialItems, selectedItems}: Props<T>) {

  const {
    leftItems,
    rightItems,
    leftSelected,
    rightSelected,
    onSort,
    onAdd,
    onDelete,
    onMoveUp,
    onMoveDown,
    onCheckboxToggle,
    onChangeHeaderToggle,
    onClick
  } = useTransferList({
    initialItems: dummy,
    selectedItems: rightDummy
  })

  const inputRef = useRef(null);

  const handleSearch = () => {
  }

  const renderList = (items: any[], selected: number[], source: 'LEFT' | 'RIGHT', isOrdered = false) => {
    return (
      <div className={styles.stationArea}>
        <div className={styles.header}>
          <div className={styles.checkbox}>
            <input
              checked={source === 'LEFT' ?
                (leftSelected.length === leftItems.length && leftItems.length !== 0) :
                (rightSelected.length === rightItems.length && rightItems.length !== 0)}
              onChange={() => onChangeHeaderToggle(source)} type={'checkbox'}/>
          </div>
          {isOrdered && (
            <div
              onClick={() => onSort('id', source)}
              style={{
                padding: '.6rem 1.2rem',
                fontSize: '1.4rem',
                width: '8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}>
              순서
              <Image src={ArrowSort} alt={''}/>
            </div>
          )}
          {
            columns.map(column => (
              <div
                onClick={() => onSort(column.key, source)}
                style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}
                key={column.key}
                className={clsx(styles.item, styles.number)}
              >
                {column.header}
                <Image src={ArrowSort} alt={''}/>
              </div>
            ))
          }
        </div>
        <div
          className={styles.stationList}
        >
          {
            items.map((item, idx) => {
              const isSelected = selected.includes(item.id)
              return (
                <div
                  key={item.id}
                  className={styles.station}
                  onClick={(e) => onClick(e, item, source)}
                >
                  {
                    <div className={styles.item}>
                      <input
                        onClick={e => e.stopPropagation()}
                        onChange={() => {
                          onCheckboxToggle?.(item, source);
                        }}
                        checked={isSelected}
                        type={'checkbox'}
                      />
                    </div>
                  }
                  {isOrdered && (
                    <div style={{width: '8rem'}} className={clsx(styles.item, styles.order)}>{idx + 1}</div>
                  )}
                  {
                    columns.map(col => (
                      <div className={styles.item} style={{flex: 1}} key={col.key}>
                        {item[col.key]}
                      </div>
                    ))
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div style={{display: 'flex', width: '100%'}}>
        <div className={styles.leftArea}>
          <div className={styles.inputArea}>
            <div className={styles.input}>
              <input ref={inputRef} placeholder={'검색어를 입력해주세요.'}/>
              <span onClick={handleSearch} style={{cursor: 'pointer'}}>
                <ImageWrapper width={20} height={20} src={'/search.svg'}/>
              </span>
            </div>
          </div>
          {
            renderList(leftItems, leftSelected, 'LEFT')
          }
          <div
            style={{
              display: 'flex',
              padding: '1.2rem 0',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'stretch',
              borderTop: '1px solid #EBEBEB'
            }}
          >
            <span
              style={{
                fontSize: '1.4rem',
                color: '#363637'
              }}
            >
              선택된
              <span
                style={{
                  fontWeight: 600,
                  color: '#0061b8'
                }}
              >
                {leftSelected.length}
              </span>
              대 차량
            </span>

            <button
              type={'button'}
              onClick={onAdd}
              style={{
                display: 'flex',
                height: '3.2rem',
                minWidth: '6.4rem',
                padding: '0 1rem',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '4px',
                border: '1px solid #5EB2FE',
                background: '#E2F0FE',
                color: '#00417A'
              }}
            >
              추가
              <Image src={ArrowRightBlue} alt={''}/>
            </button>

          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '1.6rem',

          }}
        >
          <div
            style={{
              display: 'flex',
              paddingBottom: '1.2rem',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'stretch',
            }}
          >
            <div style={{fontSize: '1.4rem', color: '#363637', fontWeight: 700}}>총
              <span style={{color: '#0061b8', fontFamily: 'Pretendard GOV'}}> 24</span>
              대 등록됨
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '.8rem',
                height: '100%'
              }}
            >
              <div className={styles.buttonArea}>
                <button onClick={onMoveUp} type={'button'}>
                  <Image src={ArrowTop} alt={'button'}/>
                </button>
                <button onClick={onMoveDown} type={'button'}>
                  <Image src={ArrowTop} alt={'button'} style={{transform: 'rotate(180deg)'}}/>
                </button>
              </div>
              <button onClick={onDelete} type={'button'} className={styles.deleteBtn}>
                선택삭제
              </button>
            </div>
          </div>
          {
            renderList(rightItems, rightSelected, 'RIGHT', true)
          }
        </div>
      </div>
    </div>

  )
}