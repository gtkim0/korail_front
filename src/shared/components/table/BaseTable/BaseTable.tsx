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
    bgColor,
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
    columnResizeMode: 'onChange',
    // columnResizeDirection: 'ltr'
  });

  return (
    <div style={{overflowX: 'auto', minWidth: '100%', flex: 1, height: '100%'}}>
      <table className={styles.table} style={{minWidth, maxWidth}}>
        <colgroup>
          {table
            .getVisibleLeafColumns()
            .map(col => (
              <col
                key={col.id}
                // style={{
                //   width: col.id === 'select' ? '40px' : `${col.getSize()}px`,
                //   minWidth: col.id === 'select' ? '40px' : undefined,
                //   maxWidth: col.id === 'select' ? '40px' : undefined,
                // }}
              />
            ))}
        </colgroup>
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
                      width: header.column.id === 'select' ? 40 : header.getSize(),
                      minWidth: header.column.id === 'select' ? 40 : header.column.columnDef.minSize,
                      maxWidth: header.column.id === 'select' ? 40 : header.column.columnDef.maxSize,
                    }}
                    key={header.id}
                    className={styles.th}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <div style={{display: 'flex', alignItems: 'center', minWidth: 0}}>
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
              style={{
                cursor: 'pointer',
                background:
                  clickedItem ?
                    (row.original[pkColumn] === clickedItem[pkColumn]) ?
                      '#e2f0fe' : bgColor ?? 'transparent'
                    : 'transparent'
              }}
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
                      // width: cell.column.getSize(),
                      // maxWidth: cell.column.columnDef.maxSize,
                      // minWidth: cell.column.columnDef.minSize,
                      width: cell.column.id === 'select' ? 40 : cell.column.getSize(),
                      minWidth: cell.column.id === 'select' ? 40 : cell.column.columnDef.minSize,
                      maxWidth: cell.column.id === 'select' ? 40 : cell.column.columnDef.maxSize,
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