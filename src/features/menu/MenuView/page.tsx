'use client'
import {useEffect, useState} from 'react';
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import MenuEditArea from "@/features/menu/MenuEditArea/MenuEditArea";
import {BaseMenu} from "@/types/menu";
import {useGlobalStore} from "@/shared/store/globalStore";
import useModal from "@/shared/hooks/useModal";
import {ColumnDef, SortingState} from "@tanstack/react-table";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {dummyMenuData, Menu, menuColumns} from "@/features/menu/columns/menuColumns";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";

export default function MenuView ({initialMenus}: { initialMenus: BaseMenu[]}) {

  const setMenu = useGlobalStore(state=> state.setMenu);
  const { isOpen, open, close } = useModal();

  useEffect(() => {
    setMenu(initialMenus)
  }, []);

  const {
    data,
    sorting,
    onSortingChange,
    loading,
  } = useSorting<Menu>({
    defaultSortKey: 'name',
    fetchFn: async ({ sortKey, sortOrder }) => {
      const res = await fetch(`/api/menus?sort=${sortKey}&order=${sortOrder}`);
      return res.json();
    },
  });

  const {
    rowSelection,
    onRowSelectionChange,
    selectedIds, // ✅ 여기서 선택된 ID를 바로 추출 가능
  } = useTableSelection<Menu>(dummyMenuData, (ids) => {
    console.log(ids);
  });

  // console.log(selectedIds);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '3rem'
      }}
    >
      {/*{loading ? */}
      {/*  <div>로딩 중...</div>*/}
      {/*  :*/}
      {/*  <Table*/}
      {/*    sorting={sorting}*/}
      {/*    onSortingChange={onSortingChange}*/}
      {/*    columns={withRowSelection(menuColumns)}*/}
      {/*    data={dummyMenuData}*/}
      {/*    onRowSelectChange={(selectedRows)=> {*/}

      {/*    }}*/}
      {/*  />*/}
      {/*}*/}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div>검색결과</div>
        <div style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',fontSize:'1.4rem'}}>
          <button>삭제</button>
          <div style={{display:'flex', gap:'1rem'}}>
            <button style={{width:'5rem'}}>수정</button>
            <button style={{width:'5rem'}}>등록</button>
          </div>
        </div>
      </div>

      <Table
        columns={withRowSelection(menuColumns)}
        data={dummyMenuData}
        sorting={sorting}
        onSortingChange={onSortingChange}
        rowSelection={rowSelection}
        onRowSelectionChange={onRowSelectionChange}
      />
      <BaseModal
        title={MODAL_TITLE.editMenu}
        maxWidth={'lg'}
        // isOpen={isOpen}
        isOpen={false}
        onCloseAction={close}
      >
        <MenuEditArea />
      </BaseModal>
    </div>
  )
}