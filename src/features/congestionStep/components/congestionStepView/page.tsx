'use client';
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import useModal from "@/shared/hooks/useModal";
import {useRef, useState} from "react";
import {dummyMenuData, menuColumns} from "@/features/menu/columns/menuColumns";
import {isAccessorColumn} from "@/shared/utils/isAccessorColumn";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {
  CongestionStep,
  congestionStepColumns,
  dummyCongestionData
} from "@/features/congestionStep/columns/CongestionStepColumns";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import TableFilter from "@/shared/components/TableFilter/TableFilter";
import Pagination from "@/shared/components/table/Pagination/Pagination";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import MenuEditArea, {type MenuEditAreaRef} from "@/features/menu/MenuEditArea/MenuEditArea";
import CongestionAddAndEditModal
  from "@/features/congestionStep/components/CongestionAddAndEditModal/CongestionAddAndEditModal";

export default function CongestionStepView() {

  const {isOpen, open, close} = useModal();

  const inputRef = useRef<HTMLInputElement>(null);
  const editAreaRef = useRef<MenuEditAreaRef>(null)

  const [filter, setFilter] = useState({
    step: ['1', '2', '3'],
    alarm: 'ON',
    guide: 'ON'
  })

  const handleChange = (value: any) => {
    setFilter(value)
  }

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
    fetchFn: async ({sortKey, sortOrder}) => {
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
    <div style={{width:'100%', overflowX:'auto', flex: 1, display:'flex', flexDirection:'column',gap:'3.6rem'}}>
      <SearchFilter
        onChange={handleChange}
        onAdd={open}
        ref={inputRef}
        type={'congestionStep'}
        value={filter}
      />
      <TableFilter/>

      <div style={{display:'flex', flex: 1, flexDirection:'column', justifyContent: 'space-between'}}>
      <Table
        columns={withRowSelection(congestionStepColumns)}
        data={dummyCongestionData}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
        setPagination={setPagination}
      />
      <Pagination
        pageIndex={pagination.pageIndex}
        pageSize={pagination.pageSize}
        pageCount={Math.ceil(dummyMenuData.length / pagination.pageSize)} // 또는 서버에서 받은 totalPages
        setPageIndex={(index) => setPagination(prev => ({...prev, pageIndex: index}))}
        setPageSize={(size) => setPagination(prev => ({...prev, pageSize: size}))}
      />
      </div>
      <BaseModal
        title={MODAL_TITLE.CongestionAddAndEdit}
        maxWidth={'lg'}
        isOpen={isOpen}
        onCloseAction={close}
        footer={<BaseModalFooter editAreaRef={editAreaRef} close={close}/>}
      >
        <CongestionAddAndEditModal selectedItem={{}}/>
      </BaseModal>
    </div>
  )
}