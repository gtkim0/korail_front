import {useState, useMemo, useEffect} from 'react';
import type {
  RowSelectionState,
  Row,
  Table,
} from '@tanstack/react-table';

export function useTableSelection<T extends object>(
  data: T[],
  onChange?: (selectedIds: string[]) => void,
) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectedIds = useMemo(() => Object.keys(rowSelection), [rowSelection]);

  useEffect(() => {
    onChange?.(selectedIds);
  }, [selectedIds]);

  return {
    rowSelection,
    onRowSelectionChange: setRowSelection,
    selectedIds,
  };
}