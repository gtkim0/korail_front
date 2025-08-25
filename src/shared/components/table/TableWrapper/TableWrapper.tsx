import TableFilter from "@/shared/components/TableFilter/TableFilter";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import Pagination from "@/shared/components/table/Pagination/Pagination";
import {dummyMenuData} from "@/features/menu/columns/menuColumns";
import {ColumnDef, OnChangeFn, RowSelectionState, SortingState} from "@tanstack/react-table";
import CustomPagination from "@/shared/components/table/CustomPagination";
import {ReactNode} from "react";

interface Props<T> {
  pkColumn: keyof T;
  onSelect: (v: { key: string, label: string }) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  columns: ColumnDef<T, any>[];
  data: T[];
  clickedItem: T | null;
  sorting: SortingState;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  // onRowSelectChange?: (selectedRows: T[]) => void;
  onChangeClickedItem: (item: T) => void;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  enabledEdit?: boolean;
  enabledDelete?: boolean;
  toolbarRight?: () => ReactNode | undefined;
  renderToolbarRight?: () => ReactNode | undefined;
}

export default function TableWrapper<T>(props: Props<T>) {

  const {
    pkColumn,
    onSelect,
    onEdit,
    onDelete,
    onDownload,
    columns, data,
    clickedItem,
    sorting,
    rowSelection,
    onRowSelectionChange,
    onSortingChange,
    pageIndex,
    pageSize,
    pageCount,
    onChangeClickedItem,
    setPageIndex,
    setPageSize,
    enabledEdit = true,
    enabledDelete = true,
    toolbarRight
  } = props;

  return (
    <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <TableFilter
        onSelect={onSelect}
        onEdit={onEdit}
        onDelete={onDelete}
        onDownload={onDownload}
        enabledEdit={enabledEdit}
        enabledDelete={enabledDelete}
        rightSlot={toolbarRight}
      />

      <Table<T>
        pkColumn={pkColumn}
        columns={columns}
        data={data}
        clickedItem={clickedItem}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        onChangeClickedItem={onChangeClickedItem}
        pageCount={Math.ceil(dummyMenuData.length / pageSize)}
        pageIndex={pageIndex}
        pageSize={pageSize}
      />

      <CustomPagination
        currentPage={pageIndex}
        totalPages={pageCount}
        onChange={(p) => {
          setPageIndex(p)
        }}
      />
      {/*<Pagination*/}
      {/*  pageIndex={pageIndex}*/}
      {/*  pageSize={pageSize}*/}
      {/*  pageCount={Math.ceil(dummyMenuData.length / pageSize)}*/}
      {/*  setPageIndex={setPageIndex}*/}
      {/*  setPageSize={setPageSize}*/}
      {/*/>*/}
    </div>
  )
}