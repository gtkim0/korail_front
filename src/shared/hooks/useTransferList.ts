import {useCallback, useEffect, useMemo, useRef, useState, MouseEvent} from "react";

type Side = 'LEFT' | 'RIGHT';
type ItemId = string | number;

interface Props<T> {
  initialItems: T[];
  selectedItems?: T[];        // 오른쪽 초기값(전체 row)
  idKey?: keyof T & string;   // 기본 'id'
}

type LastClicked = {
  index: number;
  id: ItemId;
  type: Side;
} | null;

export function useTransferList<T extends Record<string, any>>({
                                                                 initialItems,
                                                                 selectedItems = [],
                                                                 idKey = 'id',
                                                               }: Props<T>) {

  const getId = (row: T) => row[idKey] as ItemId;

  const [leftItems, setLeftItems] = useState<T[]>([]);
  const [rightItems, setRightItems] = useState<T[]>([]);

  const [leftSelectedRows, setLeftSelectedRows] = useState<T[]>([]);
  const [rightSelectedRows, setRightSelectedRows] = useState<T[]>([]);

  const [selectAllChecked, setSelectAllChecked] = useState({left: false, right: false});
  const [lastClicked, setLastClicked] = useState<LastClicked>(null);
  const [initialized, setInitialized] = useState(false);

  /**
   * initial 배열과 selected 배열로 왼쪽 초기값 계산
   */
  const computedInitialLeft = useMemo(() => {
    const chosen = new Set(selectedItems.map(getId));
    return (initialItems ?? []).filter(r => !chosen.has(getId(r)));
  }, [initialItems, selectedItems, idKey]);

  /**
   * 데이터 들어온후 처음에 일단 초기화
   */
  useEffect(() => {
    if (!initialized && ((initialItems?.length ?? 0) > 0 || (selectedItems?.length ?? 0) > 0)) {
      setLeftItems(computedInitialLeft);
      setRightItems(selectedItems);
      setInitialized(true);
    }
  }, [initialized, computedInitialLeft, selectedItems, initialItems]);

  // 전체선택 체크와 리스트 변화 동기화
  useEffect(() => {
    if (selectAllChecked.left) setLeftSelectedRows(leftItems);
    else setLeftSelectedRows([]);
  }, [selectAllChecked.left, leftItems]);

  useEffect(() => {
    if (selectAllChecked.right) setRightSelectedRows(rightItems);
    else setRightSelectedRows([]);
  }, [selectAllChecked.right, rightItems]);

  const listOf = (type: Side) => (type === 'LEFT' ? leftItems : rightItems);
  const setSelectedOf = (type: Side) => (type === 'LEFT' ? setLeftSelectedRows : setRightSelectedRows);
  const selectedOf = (type: Side) => (type === 'LEFT' ? leftSelectedRows : rightSelectedRows);

  const updateLastClicked = (index: number, id: ItemId, type: Side) =>
    setLastClicked({index, id, type});

  // row 선택/해제 (row 자체 보관, 비교는 id)
  const toggleRow = (row: T, type: Side) => {
    const id = getId(row);
    const setSel = setSelectedOf(type);
    setSel(prev => {
      const exists = prev.some(r => getId(r) === id);
      return exists ? prev.filter(r => getId(r) !== id) : [...prev, row];
    });
  };

  // 체크박스 토글
  const onCheckboxToggle = (row: T, type: Side) => {
    const list = listOf(type);
    const idx = list.findIndex(r => getId(r) === getId(row));
    toggleRow(row, type);
    updateLastClicked(idx, getId(row), type);
  };

  const onClick = (e: MouseEvent<HTMLDivElement>, row: T, type: Side) => {
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
      updateLastClicked(idx, getId(row), type);
    } else if (e.ctrlKey || e.metaKey) {
      toggleRow(row, type);
      updateLastClicked(idx, getId(row), type);
    } else {
      setSel([row]);
      updateLastClicked(idx, getId(row), type);
    }
  };

  /**
   * 왼쪽 > 오른쪽 추가
   */
  const onAdd = useCallback(() => {
    setRightItems(prev => [...prev, ...leftSelectedRows]);
    const selectedIds = new Set(leftSelectedRows.map(getId));
    setLeftItems(prev => prev.filter(r => !selectedIds.has(getId(r))));
    setLeftSelectedRows([]);
    setSelectAllChecked({left: false, right: false});
    setLastClicked(null);
  }, [leftSelectedRows, idKey]);

  /**
   * 오른쪽 > 왼쪽 추가
   */
  const onDelete = useCallback(() => {
    const selectedIds = new Set(rightSelectedRows.map(getId));
    setRightItems(prev => prev.filter(r => !selectedIds.has(getId(r))));
    setLeftItems(prev => {
      const exist = new Set(prev.map(getId));
      const toAdd = rightSelectedRows.filter(r => !exist.has(getId(r)));
      return [...prev, ...toAdd];
    });
    setRightSelectedRows([]);
    setSelectAllChecked({left: false, right: false});
    setLastClicked(null);
  }, [rightSelectedRows, idKey]);

  /**
   * 우선 기능 만들어둔후 추후 사용
   * @param a
   * @param b
   */
  const compare = (a: any, b: any) => {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a).localeCompare(String(b), 'ko');
  };

  const onSort = (key: keyof T & string, source: Side) => {
    if (source === 'LEFT') setLeftItems(prev => [...prev].sort((a, b) => compare(a[key], b[key])));
    else setRightItems(prev => [...prev].sort((a, b) => compare(a[key], b[key])));
  };

  const onMoveUp = () => {
    setRightItems(prev => {
      const idx = prev.findIndex(r => r && getId(r) === lastClicked?.id);
      if (idx > 0) {
        const copy = [...prev];
        [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
        return copy;
      }
      return prev;
    });
  };

  const onMoveDown = () => {
    setRightItems(prev => {
      const idx = prev.findIndex(r => r && getId(r) === lastClicked?.id);
      if (idx >= 0 && idx < prev.length - 1) {
        const copy = [...prev];
        [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
        return copy;
      }
      return prev;
    });
  };

  const onChangeHeaderToggle = (type: Side) => {
    setSelectAllChecked(prev => ({
      ...prev,
      [type === 'LEFT' ? 'left' : 'right']: !prev[type === 'LEFT' ? 'left' : 'right']
    }));
  };

  return {
    leftItems,
    rightItems,
    leftSelectedRows,
    rightSelectedRows,
    onSort,
    onAdd,
    onDelete,
    onMoveUp,
    onMoveDown,
    onCheckboxToggle,
    onChangeHeaderToggle,
    onClick,
    idKey,
    getId
  };
}