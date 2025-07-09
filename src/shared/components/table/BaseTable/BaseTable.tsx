'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn, RowSelectionState, SortingState,getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './BaseTable.module.css';

interface TableProps<T extends object> {
  columns: ColumnDef<T, any>[];
  data: T[];
  sorting: SortingState;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  onRowSelectChange?: (selectedRows: T[]) => void;
  setPagination?: any;
}

export default function Table<T extends object>({
  columns,
  data,
  sorting,
  rowSelection,
  onRowSelectionChange,
  onSortingChange,
  onRowSelectChange,
  setPagination
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
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    enableSorting: true,
  });

  if (onRowSelectChange) {
    const selectedRows = table.getSelectedRowModel().rows.map(r => r.original);
    onRowSelectChange(selectedRows);
  }

  return (
    <div style={{flex: 1}}>
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
                <div className={styles.cellContent}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}