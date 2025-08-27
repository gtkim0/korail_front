import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn, RowSelectionState, SortingState, getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './BaseTable.module.scss';
import Image from "next/image";
import ArrowSort from '@/shared/assets/images/arrow-sort-both.svg'
import ArrowSortAsc from '@/shared/assets/images/arrow-sort-both-asc.svg';
import ArrowSortDesc from '@/shared/assets/images/arrow-sort-both-desc.svg';

interface TableProps<T> {
  pkColumn?: keyof T;
  columns: ColumnDef<T, unknown>[];
  data: T[];
  clickedItem?: T | null;
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSortingChange?: OnChangeFn<SortingState>;
  onRowSelectChange?: (selectedRows: T[]) => void;
  minWidth?: string;
  maxWidth?: string;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  onChangeClickedItem?: (item: T) => void;
  bgColor?: string;
}

export default function Table<T>(
  {
    pkColumn = '',
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
    maxWidth = 'auto',
    bgColor = "#c8e5ff",
    pageCount, pageSize, pageIndex
  }: TableProps<T>) {

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting || undefined,
      rowSelection: rowSelection || undefined,
      pagination: {
        pageIndex: pageIndex || 0,
        pageSize: pageSize || 10,
      }
    },
    onSortingChange: onSortingChange || undefined,
    onRowSelectionChange: onRowSelectionChange || undefined,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    manualPagination: true, // 이게 수동설정
    pageCount: pageCount || 1,  // 총 페이지수
    columnResizeMode: 'onChange'
  });


  return (
    <div style={{overflowX: 'auto', minWidth: '100%', flex: 1, height: '100%'}}>
      <table className={styles.table} style={{minWidth, maxWidth}}>
        <thead style={{borderRadius: '6px'}}>
        {table.getHeaderGroups().map(headerGroup => (
          <tr
            key={headerGroup.id}
            className={styles.tr}
          >
            {headerGroup.headers
              .filter(header => header.column.columnDef.meta?.hidden !== true)
              .map(header => {
                return (
                  <th
                    style={{
                      width: header.column.columnDef.meta?.width ?? header.getSize(),
                      maxWidth: header.column.columnDef.maxSize,
                      minWidth: header.column.columnDef.minSize
                    }}
                    key={header.id}
                    className={styles.th}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className={styles.sortIcon}>
                          {/*{{*/}
                          {/*  asc: '↑',*/}
                          {/*  desc: '↓',*/}
                          {/*  false: '⇅',*/}
                          {/*}[header.column.getIsSorted() as string || 'false']}*/}
                          {{
                            // asc: '↑',
                            asc: <Image src={ArrowSortAsc} alt={''}/>,
                            desc: <Image src={ArrowSortDesc} alt={''}/>,
                            false: <Image src={ArrowSort} alt={''}/>,
                          }[header.column.getIsSorted() as string || 'false']}

                      </span>
                      )}
                    </div>
                  </th>
                )
              })}
          </tr>
        ))}
        </thead>
        <tbody className={styles.tbody}>
        {table.getRowModel().rows.map(row => {
          return (
            <tr
              // style={{background: clickedItem && (row.original[pkColumn] === clickedItem[pkColumn]) ? bgColor : 'transparent'}}
              style={{background: bgColor ?? 'transparent'}}

              key={row.id}
              className={styles.tr}
              onClick={(e) => {
                e.stopPropagation();
                onChangeClickedItem?.(row.original);
              }}
            >
              {row.getVisibleCells()
                .filter(cell => cell.column.columnDef.meta?.hidden !== true)
                .map(cell => (
                  <td
                    style={{
                      width: cell.column.getSize(),
                      // width: cell.column.columnDef.meta?.width ?? cell.column.getSize(),
                      maxWidth: cell.column.columnDef.maxSize,
                      minWidth: cell.column.columnDef.minSize,
                    }}
                    key={cell.id}
                    className={styles.td}
                  >
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