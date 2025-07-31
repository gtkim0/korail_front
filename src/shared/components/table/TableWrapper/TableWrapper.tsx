import TableFilter from "@/shared/components/TableFilter/TableFilter";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import Pagination from "@/shared/components/table/Pagination/Pagination";
import {dummyMenuData} from "@/features/menu/columns/menuColumns";
import {ColumnDef, OnChangeFn, RowSelectionState, SortingState} from "@tanstack/react-table";

interface Props<T extends object> {
  onSelect: (v: { key: string, label: string})=> void;
  onEdit?: ()=> void;
  onDelete?: ()=> void;
  columns: ColumnDef<T, any>[];
  data: T[];
  clickedItem: T | undefined;
  sorting: SortingState;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  // onRowSelectChange?: (selectedRows: T[]) => void;
  setPagination?: any;
  onChangeClickedItem: (item: T) => void;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  enabledEdit?: boolean;
  enabledDelete?: boolean;
}

export default function TableWrapper<T extends { id: string | number }>(props: Props<T>) {

  const {
    onSelect,
    onEdit, onDelete,
    columns, data,
    clickedItem,
    sorting, rowSelection, onRowSelectionChange,onSortingChange,
    setPagination,
    pageIndex,
    pageSize,
    pageCount,
    onChangeClickedItem,
    setPageIndex,
    setPageSize,
    enabledEdit = true,
    enabledDelete = true
  } = props;

  return (
    <div style={{ flex: 1, display:'flex',flexDirection:'column'}}>
      <TableFilter
        onSelect={onSelect}
        onEdit={onEdit}
        onDelete={onDelete}
        enabledEdit={enabledEdit}
        enabledDelete={enabledDelete}
      />

      <Table<T>
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

      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={Math.ceil(dummyMenuData.length / pageSize)} // 또는 서버에서 받은 totalPages
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
    </div>
  )
}