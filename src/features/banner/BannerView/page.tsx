'use client'
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import useModal from "@/shared/hooks/useModal";
import {useRef, useState} from "react";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {
  CongestionStep,
  congestionStepColumns,
  dummyCongestionData
} from "@/features/congestionStep/columns/CongestionStepColumns";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";

export default function BannerView() {

  const {isOpen, open, close} = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const [ isOn, setIsOn ] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    sorting,
    onSortingChange,
    loading,
  } = useSorting<CongestionStep>({
    defaultSortKey: 'name',
    fetchFn: async ({ sortKey, sortOrder }) => {
      const res = await fetch(`/api/menus?sort=${sortKey}&order=${sortOrder}`);
      return res.json();
    },
  });

  const {
    rowSelection,
    onRowSelectionChange,
    selectedIds,
  } = useTableSelection<CongestionStep>(dummyCongestionData, (ids) => {
    console.log(ids);
  });

  return (
    <div>
      <SearchFilter
        onAdd={open}
        ref={inputRef}
        value={{}}
        onChange={(value)=> {}}
        type={'banner'}
      />

      {/*<Table*/}
      {/*  columns={withRowSelection(congestionStepColumns)}*/}
      {/*  data={dummyCongestionData}*/}
      {/*  sorting={sorting}*/}
      {/*  onSortingChange={onSortingChange}*/}
      {/*  rowSelection={rowSelection}*/}
      {/*  onRowSelectionChange={onRowSelectionChange}*/}
      {/*  setPagination={setPagination}*/}
      {/*/>*/}

    </div>
  )
}