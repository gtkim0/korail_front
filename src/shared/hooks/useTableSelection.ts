import {useState, useMemo, useEffect, useCallback} from 'react';
import type {
  RowSelectionState,
  Row,
  Table, Updater,
} from '@tanstack/react-table';

type UseTableSelectionOptions<T> = {
  onChangeIds?: (ids: string[]) => void;
  rowIdAccessor?: (row: T, index: number) => void;
}

export function useTableSelection<T>(
  data: T[],
  options: UseTableSelectionOptions<T> = {}
) {

  const {onChangeIds, rowIdAccessor} = options;

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const onRowSelectionChange = useCallback(
    (updater: Updater<RowSelectionState>) => {
      setRowSelection((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;

        if (onChangeIds) {
          const selectedIds = Object.keys(next).filter((k) => next[k]);
          onChangeIds(selectedIds);
        }
        return next;
      })
    },
    [onChangeIds]
  )

  const selectedIds = useMemo(() => Object.keys(rowSelection), [rowSelection]);

  const selectedRows = useMemo(() => {
    if (!data.length) return [];

    return selectedIds
      .map((id) => {
        const idx = Number(id);

        if (!Number.isNaN(idx)) {
          return data[idx]
        }

        if (rowIdAccessor) {
          const foundIdx = data.findIndex((row, i) => rowIdAccessor(row, i) === id);
          return foundIdx >= 0 ? data[foundIdx] : undefined
        }

        return undefined
      })
      .filter(Boolean) as T[]
  }, [selectedIds, data, rowIdAccessor])

  const clearSelection = useCallback(() => setRowSelection({}), [])

  // useEffect(() => {
  //   onChange?.(selectedIds);
  // }, [selectedIds]);

  // return {
  //   rowSelection,
  //   onRowSelectionChange: setRowSelection,
  //   selectedIds,
  // };
  return {
    rowSelection,
    setRowSelection,
    onRowSelectionChange,
    selectedIds,
    selectedRows,
    clearSelection
  }
}