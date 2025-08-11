import {useCallback, useState, MouseEvent, useEffect} from "react";

interface Props {
  initialItems: any[];
  selectedItems?: any[];
}

type LastClicked = {
  index: number;
  id: string;
  type: 'LEFT' | 'RIGHT';
} | null;

/**
 *
 * @param initialItems
 * @param selectedItems
 *
 * initialItems 는 왼쪽 영역에 배치할 item 리스트. 만약 수정이라면 initialItems 는 전체 아이템에서 선택된 아이템을 제외한 나머지 넣어주기.
 * selectedItems 는 오른쪽 선택된 영역에 배치할 item 리스트.
 */
export function useTransferList({initialItems, selectedItems}: Props) {

  const [leftItems, setLeftItems] = useState(initialItems || []);
  const [rightItems, setRightItems] = useState(selectedItems || []);
  const [leftSelected, setLeftSelected] = useState<number[]>([]);
  const [rightSelected, setRightSelected] = useState<number[]>([]);
  const [lastClicked, setLastClicked] = useState<LastClicked>(null);

  const [selectAllChecked, setSelectAllChecked] = useState({
    left: false,
    right: false
  })

  const [enableUp, setEnableUp] = useState(false);

  /**
   * 왼쪽 리스트에서 오른쪽 리스트로 이동
   */
  const handleAdd = useCallback(() => {
    const selected = leftItems.filter(i => leftSelected.includes(i.id));
    setRightItems(prev => [...prev, ...selected]);
    setLeftItems(prev => prev.filter(i => !leftSelected.includes(i.id)));
    setLeftSelected([]);
    setLastClicked(null);
    setSelectAllChecked(prev => ({
      ...prev,
      left: false,
      right: false
    }))
  }, [leftItems, leftSelected, setLeftItems, setRightItems, setLeftSelected, setLastClicked, setSelectAllChecked])

  /**
   * 오른쪽 리스트에서 왼쪽 리스트로 이동
   */
  const handleDelete = useCallback(() => {
    const selected = rightItems.filter(i => rightSelected.includes(i.id));

    setRightItems(prev => prev.filter(i => !rightSelected.includes(i.id)));
    setLeftItems(prev => {
      const existingIds = new Set(prev.map(i => i.id));
      const filteredToAdd = selected.filter(i => !existingIds.has(i.id));
      return [...prev, ...filteredToAdd]
    })

    setRightSelected([]);
    setLastClicked(null);
    setSelectAllChecked(prev => ({
      ...prev,
      left: false,
      right: false
    }))
  }, [rightItems, rightSelected, setLeftItems, setRightItems, setSelectAllChecked])

  /**
   * 체크박스 toggle 함수
   */
  const handleCheckboxToggle = (selected: any, type: 'LEFT' | 'RIGHT') => {
    const list = getSelectedList(type)
    const idx = list.findIndex(i => i.id === selected.id)

    toggleSelect(selected.id, type);
    updateLastClicked(idx, selected.id, type);
  }

  /**
   * LEFT or RIGHT 선택인지에 따라 아이템 leftItems or rightItems 가져오는 함수
   */
  const getSelectedList = (type: 'LEFT' | 'RIGHT') =>
    type === 'LEFT' ? leftItems : rightItems

  /**
   * @param id
   * @param type
   * 선택한
   */
  const toggleSelect = (id: number, type: 'LEFT' | 'RIGHT') => {
    const setSelected = type === 'LEFT' ? setLeftSelected : setRightSelected

    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  /**
   * 아이템 클릭, shift 나 ctrl 로 다중 선택 가능하게 처리
   */
  const handleClick = (e: MouseEvent<HTMLDivElement>, item: any, type: 'LEFT' | 'RIGHT') => {

    const list = getSelectedList(type);
    const currentIndex = list.findIndex((i) => i.id === item.id);

    const setSelected = type === 'LEFT' ? setLeftSelected : setRightSelected;

    if (e.shiftKey && lastClicked?.type === type) {
      const start = Math.min(lastClicked.index, currentIndex);
      const end = Math.max(lastClicked.index, currentIndex);
      const range = list.slice(start, end + 1).map((i) => i.id);
      setSelected((prev) => Array.from(new Set([...prev, ...range])));
    } else if (e.ctrlKey || e.metaKey) {
      toggleSelect(item.id, type);
      updateLastClicked(currentIndex, item.id, type);
    } else {
      setSelected([item.id]);
      updateLastClicked(currentIndex, item.id, type);
    }
  }

  /**
   * 순서 위로 올리는 함수
   */
  const handleMoveUp = useCallback(() => {

    setRightItems(prev => {
      const index = prev.findIndex(i => i.id === lastClicked?.id);
      if (index > 0) {
        const newItems = [...prev];

        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]]
        return newItems;
      }
      return prev;
    })
  }, [lastClicked, setRightItems])

  /**
   * 순서 아래로 내리는 함수
   */
  const handleMoveDown = useCallback(() => {
    setRightItems(prev => {
      const index = prev.findIndex(i => i.id === lastClicked?.id);

      if (index >= 0 && index < rightItems.length - 1) {
        const newItems = [...prev];

        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
        return newItems;
      }
      return prev;
    })
  }, [rightItems, lastClicked, setRightItems])

  /**
   * @param type
   * type 에 따라 왼쪽 헤더 체크박스, 오른쪽 체크박스에 따라 전체선택 or 전체해제
   */
  const handleChangeHeaderToggle = (type: 'LEFT' | 'RIGHT') => {
    if (type === 'LEFT') {
      setSelectAllChecked(prev => ({
        ...prev,
        left: !prev.left
      }))
    } else {
      setSelectAllChecked(prev => ({
        ...prev,
        right: !prev.right
      }))
    }
  }

  const handleSort = (sortKey: string, source: 'LEFT' | 'RIGHT') => {

    // @TODO desc 인지 asc 인지 구분 필요.

    if (!source) return;

    if (source === 'LEFT') {
      const a = leftItems.sort((a, b) => a[sortKey] - b[sortKey]);
      setLeftItems(prev => prev.sort((a, b) => a[sortKey] - b[sortKey]))
    } else {

    }
  }

  const updateLastClicked = (index: number, id: string, type: 'LEFT' | 'RIGHT') =>
    setLastClicked({index, id, type});

  useEffect(() => {
    if (selectAllChecked.left) {
      setLeftSelected(leftItems.map(i => i.id));
    } else {
      setLeftSelected([])
    }

    if (selectAllChecked.right) {
      setRightSelected(rightItems.map(i => i.id));
    } else {
      setRightSelected([])
    }
  }, [selectAllChecked]);

  return {
    leftItems,
    rightItems,
    leftSelected,
    rightSelected,
    selectAllChecked,
    onSort: handleSort,
    onAdd: handleAdd,
    onDelete: handleDelete,
    onMoveUp: handleMoveUp,
    onMoveDown: handleMoveDown,
    enableUp: enableUp,
    onCheckboxToggle: handleCheckboxToggle,
    onChangeHeaderToggle: handleChangeHeaderToggle,
    onClick: handleClick
  }
}