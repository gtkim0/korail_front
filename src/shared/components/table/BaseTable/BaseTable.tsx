'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn, RowSelectionState, SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import styles from './BaseTable.module.css';

interface TableProps<T extends object> {
  columns: ColumnDef<T, any>[];
  data: T[];
  sorting: SortingState;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>; // ✅ 이걸로 변경
  onRowSelectChange?: (selectedRows: T[]) => void;
}

export default function Table<T extends object>({
                                                  columns,
                                                  data,
                                                  sorting,
                                                  rowSelection,
                                                  onRowSelectionChange,
                                                  onSortingChange,
                                                  onRowSelectChange,
                                                }: TableProps<T>) {

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange,
    onRowSelectionChange,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
  });

  if (onRowSelectChange) {
    const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);
    onRowSelectChange(selectedRows);
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className={styles.table}>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id} className={styles.tr}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className={styles.th}
                onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}

                {header.column.getCanSort() && (
                  <span className={styles.sortIcon}>
                  {{
                    asc: '↑',
                    desc: '↓',
                    false: '⇅',
                  }[header.column.getIsSorted() as string || 'false']}
                </span>
                )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className={styles.tr}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className={styles.td}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}