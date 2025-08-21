'use client'
import {useEffect, useRef, useState} from 'react';
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import MenuEditArea from "@/features/menu/MenuEditArea/MenuEditArea";
import {BaseMenu} from "@/types/menu";
import {useGlobalStore} from "@/shared/store/globalStore";
import useModal from "@/shared/hooks/useModal";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {dummyMenuData, Menu, menuColumns} from "@/features/menu/columns/menuColumns";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import Pagination from "@/shared/components/table/Pagination/Pagination";
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import TableFilter from "@/shared/components/TableFilter/TableFilter";
import type {MenuEditAreaRef} from "@/features/menu/MenuEditArea/MenuEditArea";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import {isAccessorColumn} from "@/shared/utils/isAccessorColumn";
import {PageType} from "@/shared/enum/PageType";
import {dummyMenu} from "@/data/dummyMenu";

type FilterOption = {
  key: string;
  label: string;
};

export default function MenuView() {

  const setMenu = useGlobalStore(state => state.setMenu);
  const {isOpen, open, close} = useModal();

  const editAreaRef = useRef<MenuEditAreaRef>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data,
    sorting,
    onSortingChange,
    loading,
  } = useSorting<Menu>({
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
  } = useTableSelection<Menu>(dummyMenuData, (ids) => {
    console.log(ids);
  });

  const initialMenus = dummyMenu;

  useEffect(() => {
    setMenu(initialMenus)
  }, []);

  return (
    <>
      <SearchFilter
        onChange={(value) => {
        }}
        onAdd={open}
        ref={inputRef}
        type={PageType.Menu}
        value={{}}
      />

      <TableFilter
        onSelect={() => {
        }}
      />

      <Table
        columns={withRowSelection(menuColumns)}
        data={dummyMenuData}
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
      <BaseModal
        title={MODAL_TITLE[PageType.Menu]}
        maxWidth={'lg'}
        isOpen={isOpen}
        onCloseAction={close}
        footer={<BaseModalFooter editAreaRef={editAreaRef} close={close}/>}
      >
        <MenuEditArea ref={editAreaRef}/>
      </BaseModal>
    </>
  )
}