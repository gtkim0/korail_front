'use client';
import {useMemo, useRef, useState, MouseEvent, useEffect} from "react";
import styles from './TransferList.module.scss';
import Image from "next/image";
import ArrowRightBlue from '@/shared/assets/images/arrow-right-blue.svg'
import ArrowTop from '@/shared/assets/images/arrow-top.svg'
import ArrowSort from '@/shared/assets/images/arrow-sort-both.svg'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {Updater} from "@tanstack/react-table";

type Side = 'LEFT' | 'RIGHT';
type ItemId = string | number;

interface Column<T> {
  key: keyof T & string;
  header: string;
}

type UserRow = {
  userId: string;
  userNm: string;
  jbgdCd?: string;
  deptCd?: string;
  cpNo?: string;
};

interface Props<T extends Record<string, any>> {
  /** 왼쪽 풀(전체 데이터) */
  allItems: T[];
  /** 오른쪽(선택된 데이터) - controlled */
  value: T[];
  /** value 변경 콜백 */
  onChange: (next: T[]) => void;
  /** 테이블 컬럼 (왼쪽) */
  columns: readonly Column<T>[];
  /** 테이블 컬럼 (오른쪽, 없으면 columns와 동일) */
  rightColumns?: readonly Column<T>[];
  /** 기본 id 키 */
  idKey?: keyof T & string;
}

const compare = (a: any, b: any) => {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'ko');
};


export default function TransferList<T extends Record<string, any>>({
                                                                      allItems,
                                                                      value,
                                                                      onChange,
                                                                      columns,
                                                                      rightColumns,
                                                                      idKey = 'id' as keyof T & string,
                                                                    }: Props<T>) {
  const getId = (row: T) => row[idKey] as ItemId;
  const colsBy = (side: Side) => (side === 'LEFT' ? columns : (rightColumns ?? columns));

  /** 왼쪽 리스트 = allItems - value (파생값) */
  const leftItems = useMemo(() => {
    const chosen = new Set(value.map(getId));
    return (allItems ?? []).filter(r => !chosen.has(getId(r)));
  }, [allItems, value]);

  const [leftSortKey, setLeftSortKey] = useState<keyof T & string | null>(null);
  const [leftSortAsc, setLeftSortAsc] = useState(true);

  const sortedLeft = useMemo(() => {
    if (!leftSortKey) return leftItems;
    const arr = [...leftItems].sort((a, b) => compare(a[leftSortKey!], b[leftSortKey!]));
    return leftSortAsc ? arr : arr.reverse();
  }, [leftItems, leftSortKey, leftSortAsc]);

  const [leftSelectedRows, setLeftSelectedRows] = useState<T[]>([]);
  const [rightSelectedRows, setRightSelectedRows] = useState<T[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState({left: false, right: false});
  const [lastClicked, setLastClicked] = useState<{
    index: number; id: ItemId; type: Side;
  } | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const isSelected = (rows: T[], row: T) => rows.some(r => getId(r) === getId(row));

  const syncHeaderChecks = (side: Side) => {
    if (side === 'LEFT') {
      if (selectAllChecked.left) setLeftSelectedRows(sortedLeft);
      else setLeftSelectedRows([]);
    } else {

      console.log('a');
      console.log(selectAllChecked.right);

      if (selectAllChecked.right) setRightSelectedRows(value);
      else setRightSelectedRows([]);
    }
  };

  const onChangeHeaderToggle = (type: Side) => {
    setSelectAllChecked(prev =>
      type === 'LEFT'
        ? {...prev, left: !prev.left}
        : {...prev, right: !prev.right}
    );
  };

  const toggleRow = (row: T, type: Side) => {
    const id = getId(row);
    if (type === 'LEFT') {
      setLeftSelectedRows(prev => {
        const exists = prev.some(r => getId(r) === id);
        return exists ? prev.filter(r => getId(r) !== id) : [...prev, row];
      });
    } else {
      setRightSelectedRows(prev => {
        const exists = prev.some(r => getId(r) === id);
        return exists ? prev.filter(r => getId(r) !== id) : [...prev, row];
      });
    }
  };

  const onCheckboxToggle = (row: T, type: Side) => {
    const list = type === 'LEFT' ? sortedLeft : value;
    const idx = list.findIndex(r => getId(r) === getId(row));
    toggleRow(row, type);
    setLastClicked({index: idx, id: getId(row), type});
  };

  const selectedOf = (type: Side) => (type === 'LEFT' ? leftSelectedRows : rightSelectedRows);
  const listOf = (type: Side) => (type === 'LEFT' ? sortedLeft : value);
  const setSelectedOf = (type: Side) => (type === 'LEFT' ? setLeftSelectedRows : setRightSelectedRows);

  const onClickRow = (e: MouseEvent<HTMLTableRowElement>, row: T, type: Side) => {
    const list = listOf(type);
    const idx = list.findIndex(r => getId(r) === getId(row));
    const setSel = setSelectedOf(type);
    const currentSel = selectedOf(type);

    if (e.shiftKey && lastClicked?.type === type) {
      const start = Math.min(lastClicked.index, idx);
      const end = Math.max(lastClicked.index, idx);
      const range = list.slice(start, end + 1);

      const existing = new Set(currentSel.map(getId));
      const merged = [...currentSel, ...range.filter(r => !existing.has(getId(r)))];
      setSel(merged);
      setLastClicked({index: idx, id: getId(row), type});
    } else if (e.ctrlKey || e.metaKey) {
      toggleRow(row, type);
      setLastClicked({index: idx, id: getId(row), type});
    } else {
      setSel([row]);
      setLastClicked({index: idx, id: getId(row), type});
    }
  };

  /** 이동/삭제/정렬 **/
  const onAdd = () => {
    if (leftSelectedRows.length === 0) return;
    onChange([...value, ...leftSelectedRows]);
    setLeftSelectedRows([]);
    setSelectAllChecked(prev => ({...prev, left: false}));
    setLastClicked(null);
  };

  const onDelete = () => {
    if (rightSelectedRows.length === 0) return;
    const removeIds = new Set(rightSelectedRows.map(getId));
    onChange(value.filter(r => !removeIds.has(getId(r))));
    setRightSelectedRows([]);
    setSelectAllChecked(prev => ({...prev, right: false}));
    setLastClicked(null);
  };

  const onMoveUp = () => {
    if (!lastClicked || lastClicked.type !== 'RIGHT') return;
    const idx = value.findIndex(r => getId(r) === lastClicked.id);
    if (idx > 0) {
      const copy = [...value];
      [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
      onChange(copy);
    }
  };

  const onMoveDown = () => {
    if (!lastClicked || lastClicked.type !== 'RIGHT') return;
    const idx = value.findIndex(r => getId(r) === lastClicked.id);
    if (idx >= 0 && idx < value.length - 1) {
      const copy = [...value];
      [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
      onChange(copy);
    }
  };

  const onSort = (key: keyof T & string, source: Side) => {
    if (source === 'LEFT') {
      // 좌측은 로컬 정렬 표시만
      if (leftSortKey === key) setLeftSortAsc(a => !a);
      else {
        setLeftSortKey(key);
        setLeftSortAsc(true);
      }
    } else {
      // 우측은 실제 데이터 순서를 바꿔서 onChange
      const sorted = [...value].sort((a, b) => compare(a[key], b[key]));
      onChange(sorted);
    }
  };


  const renderTable = (
    items: T[],
    selectedRows: T[],
    source: Side,
    isOrdered = false
  ) => {

    const cols = colsBy(source);

    // LEFT: 토글 변경될 때만 전체선택/해제
    useEffect(() => {
      setLeftSelectedRows(selectAllChecked.left ? sortedLeft : []);
    }, [selectAllChecked.left]); // ❗ sortedLeft 제거

// LEFT: 목록이 바뀌었는데 전체선택이 켜져 있으면 동기화
    useEffect(() => {
      if (selectAllChecked.left) setLeftSelectedRows(sortedLeft);
    }, [sortedLeft, selectAllChecked.left]);

// RIGHT: 토글 변경될 때만 전체선택/해제
    useEffect(() => {
      setRightSelectedRows(selectAllChecked.right ? value : []);
    }, [selectAllChecked.right]); // ❗ value 제거

// RIGHT: 목록이 바뀌었는데 전체선택이 켜져 있으면 동기화
    useEffect(() => {
      if (selectAllChecked.right) setRightSelectedRows(value);
    }, [value, selectAllChecked.right]);

    return (
      <table className={styles.table}>
        <thead style={{position: 'sticky', top: 0}}>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={source === 'LEFT'
                ? (selectedRows.length === items.length && items.length !== 0)
                : (selectedRows.length === value.length && value.length !== 0)}
              onChange={() => onChangeHeaderToggle(source)}
            />
          </th>
          {isOrdered && (
            <th className={styles.sortableHeader} onClick={() => onSort(idKey, source)}>
              <div className={styles.thContent}>
                <span className={styles.thText}>순서</span>
                {/* <Image src={ArrowSort} alt="" /> */}
              </div>
            </th>
          )}
          {cols.map(col => (
            <th
              key={col.key}
              onClick={() => onSort(col.key, source)}
              className={styles.sortableHeader}
            >
              <div className={styles.thContent}>
                <span className={styles.thText}>{col.header}</span>
                {/* <Image src={ArrowSort} alt="" /> */}
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
              key={String(getId(item))}
              onClick={(e) => onClickRow(e, item, source)}
              className={checked ? styles.selectedRow : ''}
              style={{background: '#fff'}}
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
              {cols.map(col => (
                <td key={col.key}>{String(item[col.key] ?? '')}</td>
              ))}
            </tr>
          );
        })}
        </tbody>
      </table>
    );
  };

  console.log(leftSelectedRows);
  console.log(rightSelectedRows);

  return (
    <div className={styles.container}>
      <div className={styles.leftArea}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div className={styles.inputArea}>
            <div style={{
              background: '#fff', display: 'flex', width: '100%',
              borderRadius: '6px', alignItems: 'center', padding: '0 1rem'
            }}>
              <input ref={inputRef} placeholder="검색어를 입력해주세요."/>
              <span><ImageWrapper width={20} height={20} src="/search.svg"/></span>
            </div>
          </div>
          <div style={{padding: '0 1.6rem 1.6rem 1.6rem'}}>
            <div style={{minHeight: '30rem', maxHeight: '60rem', overflowY: 'auto'}}>
              {renderTable(sortedLeft, leftSelectedRows, 'LEFT')}
            </div>
          </div>
        </div>

        <div style={{padding: '1.2rem 1.6rem', borderTop: '1px solid #EBEBEB'}} className={styles.footer}>
          <span style={{fontSize: '1.4rem'}}>선택된 <span
            style={{color: '#0061B8', fontSize: '1.4rem', fontWeight: 600}}>{leftSelectedRows.length}</span>대 차량</span>
          <button
            type="button"
            onClick={onAdd}
            style={{
              display: 'flex', alignItems: 'center', height: '3.2rem',
              background: '#E2F0FE', padding: '0 1rem', color: '#00417A',
              border: '1px solid #5EB2FE', borderRadius: '4px'
            }}
          >
            추가 <Image src={ArrowRightBlue} alt=""/>
          </button>
        </div>
      </div>

      <div className={styles.rightArea}>
        <div className={styles.rightHeader}>
          <span style={{fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Pretendard GOV'}}>
            총 <span style={{color: '#0061B8'}}>{value.length}</span>대 등록됨
          </span>
          <div style={{display: 'flex', gap: '.8rem'}}>
            <button type="button" className={styles.arrowBtn} onClick={onMoveUp}>
              <Image src={ArrowTop} alt="up"/>
            </button>
            <button type="button" className={styles.arrowBtn} onClick={onMoveDown}>
              <Image src={ArrowTop} alt="down" style={{transform: 'rotate(180deg)'}}/>
            </button>
            <button className={styles.delBtn} type="button" onClick={onDelete}>선택삭제</button>
          </div>
        </div>
        <div style={{maxHeight: '30rem', overflowY: 'auto'}}>
          {renderTable(value, rightSelectedRows, 'RIGHT', true)}
        </div>
      </div>
    </div>
  );
}