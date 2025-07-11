'use client';
import {SearchFilter} from "@/shared/components/searchFilter/SearchFilter";
import {useRef, useState} from "react";
import useModal from "@/shared/hooks/useModal";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import {RouteMapAddForm, RouteMapAddFormRef} from "@/features/routeMap/components/RouteMapAddForm/RouteMapAddForm";
import TableFilter from "@/shared/components/TableFilter/TableFilter";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {BannerColumns, BannerColumnsType, dummyBannerData} from "@/features/banner/columns/BannerColumns";
import {dummyRouteMapData, routeMapColumns} from "@/features/routeMap/columns/routeMapColumns";
import {useSorting} from "@/shared/hooks/useSorting";
import {useTableSelection} from "@/shared/hooks/useTableSelection";
import {dummyMenuData} from "@/features/menu/columns/menuColumns";
import Pagination from "@/shared/components/table/Pagination/Pagination";
import {PageType} from "@/shared/enum/PageType";

export default function RouteMapView () {

  const {isOpen, open, close} = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const editAreaRef = useRef<RouteMapAddFormRef>(null)

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
    fetchFn: async ({ sortKey, sortOrder }) => {
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

  const handleSubmit = () => {

  }

  return (
    <>
      <SearchFilter
        onAdd={open}
        ref={inputRef}
        value={{}}
        onChange={(value)=> {}}
        type={PageType.RouteMap}
        onSubmit={handleSubmit}
      />
      <TableFilter/>

      <Table
        columns={withRowSelection(routeMapColumns)}
        data={dummyRouteMapData}
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
        title={MODAL_TITLE.RouteMap}
        maxWidth={'lg'}
        isOpen={isOpen}
        onCloseAction={close}
        footer={<BaseModalFooter editAreaRef={editAreaRef} close={close} />}
      >
        <RouteMapAddForm ref={editAreaRef}/>
      </BaseModal>
    </>
  )
}