'use client';
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import {useRef, useState} from "react";
import {PageType} from "@/shared/enum/PageType";
import TableFilter from "@/shared/components/TableFilter/TableFilter";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import { Menu} from "@/features/menu/columns/menuColumns";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {dummyOperationData, OperationInfoColumns} from "@/features/operationInfo/columns/operationInfoColumns";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {OperationInfo} from "@/types/operationInfo";

export default function OperationInfoView () {

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data,
    sorting,
    onSortingChange,
    loading,
  } = useSorting<OperationInfo>({
    defaultSortKey: 'name',
    fetchFn: async ({ sortKey, sortOrder }) => {
      const res = await fetch(`/api/menus?sort=${sortKey}&order=${sortOrder}`);
      return res.json();
    },
  });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    rowSelection,
    onRowSelectionChange,
    selectedIds,
  } = useTableSelection<OperationInfo>(dummyOperationData, (ids) => {
    console.log(ids);
  });

  return (
    <>
      <SearchFilter
        onChange={(value)=> {}}
        onAdd={open}
        ref={inputRef}
        type={PageType.OperationInfo}
        value={{}}
      />

      <TableFilter />

      <Table
        columns={withRowSelection(OperationInfoColumns)}
        data={dummyOperationData}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        setPagination={setPagination}
      />
    </>
  )
}