'use client';
import styles from './CarriageInfoView.module.scss'
import {useSorting} from "@/shared/hooks/useSorting";
import {BannerColumns, BannerColumnsType, dummyBannerData} from "@/features/banner/columns/BannerColumns";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {
  CarriageInfoColumns,
  CarriageInfoColumnsType,
  dummyCarriageInfoData
} from "@/features/carriageInfo/columns/CarriageInfoColumns";
import {PageType} from "@/shared/enum/PageType";
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import TableWrapper from "@/shared/components/table/TableWrapper/TableWrapper";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import useModal from "@/shared/hooks/useModal";
import {useRef, useState} from "react";
import {BannerAddFormRef} from "@/features/banner/components/BannerAddForm/BannerAddForm";

export default function CarriageInfoView () {

  const {isOpen, open, close} = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const editAreaRef = useRef<BannerAddFormRef>(null)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    sorting,
    onSortingChange,
    loading,
  } = useSorting<CarriageInfoColumnsType>({
    defaultSortKey: 'name',
    fetchFn: async ({sortKey, sortOrder}) => {
      const res = await fetch(`/api/menus?sort=${sortKey}&order=${sortOrder}`);
      return res.json();
    },
  });

  const {
    rowSelection,
    onRowSelectionChange,
    selectedIds,
  } = useTableSelection<CarriageInfoColumnsType>(dummyCarriageInfoData, (ids) => {
    console.log(ids);
  });

  return (
    <>
      <SearchFilter
        onAdd={open}
        ref={inputRef}
        value={{}}
        onChange={(value) => {}}
        type={PageType.CarriageInfo}
        onSubmit={()=> {}}
      />
      <TableWrapper
        onSelect={(v)=> {}}
        columns={withRowSelection(CarriageInfoColumns)}
        data={dummyCarriageInfoData}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        setPagination={setPagination}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={Math.ceil(dummyCarriageInfoData.length / pagination.pageSize)} // 또는 서버에서 받은 totalPages
        setPageIndex={(index) => setPagination(prev => ({...prev, pageIndex: index}))}
        setPageSize={(size) => setPagination(prev => ({...prev, pageSize: size}))}
      />
    </>
  )
}