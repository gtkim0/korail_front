'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn, RowSelectionState, SortingState, getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './BaseTable.module.scss';

type CustomMeta = {
  hidden?: boolean;
};

interface TableProps<T extends { id: string | number }> {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  clickedItem: T | undefined;
  sorting: SortingState;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  onRowSelectChange?: (selectedRows: T[]) => void;
  minWidth?: string;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  onChangeClickedItem: (item: T) => void;
}

export default function Table<T extends { id: string | number }>(
  {
    columns,
    data,
    clickedItem,
    sorting,
    rowSelection,
    onRowSelectionChange,
    onSortingChange,
    onChangeClickedItem,
    onRowSelectChange,
    minWidth = '120rem',
    pageCount, pageSize, pageIndex
  }: TableProps<T>) {

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      }
    },
    onSortingChange,
    onRowSelectionChange,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    manualPagination: true, // 이게 수동설정
    pageCount,  // 총 페이지수
  });

  return (
    <div style={{overflowX: 'auto', minWidth: '100%', flex: 1}}>
      <table className={styles.table} style={{minWidth}}>
        <thead style={{borderRadius: '6px'}}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr
            key={headerGroup.id}
            className={styles.tr}
          >
            {headerGroup.headers
              .filter(header=> header.column.columnDef.meta?.hidden !== true)
              .map(header => (
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
        <tbody className={styles.tbody}>
        {table.getRowModel().rows.map(row => {
          return (
            <tr
              style={{background: row.original.id === clickedItem?.id ? 'red' : '#fff'}}
              key={row.id}
              className={styles.tr}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Row:', row.original);
                onChangeClickedItem(row.original);
              }}
            >
              {row.getVisibleCells()
                .filter(cell=> cell.column.columnDef.meta?.hidden !== true)
                .map(cell => (
                <td key={cell.id} className={styles.td}>
                  <div className={styles.cellContent}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}