import TableFilter from "@/shared/components/TableFilter/TableFilter";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {BannerColumns, dummyBannerData} from "@/features/banner/columns/BannerColumns";
import Pagination from "@/shared/components/table/Pagination/Pagination";
import {dummyMenuData} from "@/features/menu/columns/menuColumns";
import {ColumnDef, OnChangeFn, RowSelectionState, SortingState} from "@tanstack/react-table";

interface Props<T extends object> {
  onSelect: (v: { key: string, label: string})=> void;
  columns: ColumnDef<T, any>[];
  data: T[];
  sorting: SortingState;
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onSortingChange: OnChangeFn<SortingState>;
  // onRowSelectChange?: (selectedRows: T[]) => void;
  setPagination?: any;

  pageIndex: number;
  pageSize: number;
  pageCount: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export default function TableWrapper<T extends object>(props: Props<T>) {

  const {
    onSelect, columns, data, sorting, rowSelection, onRowSelectionChange,onSortingChange,
    setPagination,
    pageIndex,
    pageSize,
    pageCount,
    setPageIndex,
    setPageSize
  } = props;

  return (
    <div style={{ flex: 1}}>
      <TableFilter onSelect={onSelect} />

      <Table
        columns={columns}
        data={data}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        setPagination={setPagination}
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