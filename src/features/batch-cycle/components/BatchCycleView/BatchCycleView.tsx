'use client';
import {useSorting} from "@/shared/hooks/useSorting";
import {BannerColumnsType} from "@/features/banner/columns/BannerColumns";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import {PageType} from "@/shared/enum/PageType";
import TableWrapper from "@/shared/components/table/TableWrapper/TableWrapper";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import useModal from "@/shared/hooks/useModal";
import {useRef, useState} from "react";
import {BannerAddFormRef} from "@/features/banner/components/BannerAddForm/BannerAddForm";
import {batchCycleColumns, dummyBatchCycleData} from "@/features/batch-cycle/columns/batchCycleColumns";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import BatchCycleAddModal from "@/features/batch-cycle/components/BatchCycleAddModal/BatchCycleAddModal";

export default function BatchCycleView () {

  const {isOpen, open, close} = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const editAreaRef = useRef<BannerAddFormRef>(null)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [filter, setFilter] = useState({
    category: ['1','2','3','4'],
    q: '1',
    range1: {
      startDate: new Date(),
      endDate: new Date(),
    },
    range2: {
      startDate: new Date(),
      endDate: new Date(),
    },
  })

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
  } = useTableSelection<BannerColumnsType>(dummyBatchCycleData, (ids) => {
    console.log(ids);
  });

  return (
    <>
      <SearchFilter
        onAdd={open}
        ref={inputRef}
        value={filter}
        onChange={(value) => {}}
        type={PageType.BatchCycle}
      />

      <TableWrapper
        onSelect={(v)=> {}}
        columns={withRowSelection(batchCycleColumns)}
        data={dummyBatchCycleData}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        setPagination={setPagination}
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={Math.ceil(dummyBatchCycleData.length / pagination.pageSize)} // 또는 서버에서 받은 totalPages
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
        <BatchCycleAddModal ref={editAreaRef} />
      </BaseModal>
    </>
  )
}