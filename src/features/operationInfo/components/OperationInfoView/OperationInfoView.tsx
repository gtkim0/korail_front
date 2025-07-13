'use client';
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import {useRef, useState} from "react";
import {PageType} from "@/shared/enum/PageType";
import TableFilter from "@/shared/components/TableFilter/TableFilter";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {dummyMenuData, Menu} from "@/features/menu/columns/menuColumns";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {dummyOperationData, OperationInfoColumns} from "@/features/operationInfo/columns/operationInfoColumns";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {OperationInfo} from "@/types/operationInfo";
import {BannerColumns, dummyBannerData} from "@/features/banner/columns/BannerColumns";
import TableWrapper from "@/shared/components/table/TableWrapper/TableWrapper";
import useModal from "@/shared/hooks/useModal";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import {BannerAddAndEditModal} from "@/features/banner/components/BannerAddAndEditModal/BannerAddAndEditModal";
import {BannerAddFormRef} from "@/features/banner/components/BannerAddForm/BannerAddForm";
import OperationInfoAddForm from "@/features/operationInfo/components/OperationInfoAddForm/OperationInfoAddForm";

export default function OperationInfoView () {

  const inputRef = useRef<HTMLInputElement>(null);
  const {isOpen, open, close} = useModal();
  const editAreaRef = useRef<BannerAddFormRef>(null)

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

      <TableWrapper
        onSelect={(v)=> {}}
        columns={withRowSelection(OperationInfoColumns)}
        data={dummyOperationData}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        setPagination={setPagination}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={Math.ceil(dummyMenuData.length / pagination.pageSize)} // 또는 서버에서 받은 totalPages
        setPageIndex={(index) => setPagination(prev => ({...prev, pageIndex: index}))}
        setPageSize={(size) => setPagination(prev => ({...prev, pageSize: size}))}
      />

      <BaseModal
        title={MODAL_TITLE.OperationInfo}
        maxWidth={'lg'}
        isOpen={isOpen}
        onCloseAction={close}
        footer={<BaseModalFooter editAreaRef={editAreaRef} close={close}/>}
      >
        <OperationInfoAddForm />
      </BaseModal>
    </>
  )
}