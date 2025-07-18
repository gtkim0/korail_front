'use client'
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import useModal from "@/shared/hooks/useModal";
import {useRef, useState} from "react";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {BannerColumns, BannerColumnsType, dummyBannerData} from "@/features/banner/columns/BannerColumns";
import TableFilter from "@/shared/components/TableFilter/TableFilter";
import Pagination from "@/shared/components/table/Pagination/Pagination";
import {dummyMenuData} from "@/features/menu/columns/menuColumns";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import {BannerAddAndEditModal} from "@/features/banner/components/BannerAddAndEditModal/BannerAddAndEditModal";
import {BannerAddFormRef} from "@/features/banner/components/BannerAddForm/BannerAddForm";
import {PageType} from "@/shared/enum/PageType";
import TableWrapper from "@/shared/components/table/TableWrapper/TableWrapper";

export default function BannerView() {

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
  } = useSorting<BannerColumnsType>({
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
  } = useTableSelection<BannerColumnsType>(dummyBannerData, (ids) => {
    console.log(ids);
  });

  return (
    <>
      <SearchFilter
        onAdd={open}
        ref={inputRef}
        value={{}}
        onChange={(value) => {}}
        type={PageType.Banner}
      />

      <TableWrapper
        onSelect={(v)=> {}}
        columns={withRowSelection(BannerColumns)}
        data={dummyBannerData}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        setPagination={setPagination}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={Math.ceil(dummyBannerData.length / pagination.pageSize)} // 또는 서버에서 받은 totalPages
        setPageIndex={(index) => setPagination(prev => ({...prev, pageIndex: index}))}
        setPageSize={(size) => setPagination(prev => ({...prev, pageSize: size}))}
      />

      <BaseModal
        title={MODAL_TITLE[PageType]}
        maxWidth={'lg'}
        isOpen={isOpen}
        onCloseAction={close}
        footer={<BaseModalFooter editAreaRef={editAreaRef} close={close}/>}
      >
        <BannerAddAndEditModal editAreaRef={editAreaRef}/>
      </BaseModal>
    </>
  )
}