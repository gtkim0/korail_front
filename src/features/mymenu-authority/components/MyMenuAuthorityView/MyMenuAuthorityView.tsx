'use client';
import {PageServerProps, PaginationResponseType, ResponseType} from "@/types/common";
import React, {useRef, useState} from "react";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {authorityColumns} from "@/features/mymenu-authority/columns/authorityColumns";
import MyMenuAuthorityAddForm
  from "@/features/mymenu-authority/components/MyMenuAuthorityAddForm/MyMenuAuthorityAddForm";

const buildActions = (ctx: any, {openAdd, openEdit, openPermission}: any) => {

  return [
    // {
    //   key: 'edit',
    //   label: '수정',
    //   variant: 'primary',
    //   onClick: () => openAdd,
    //   order: 1
    // },
    // {
    //   key: 'delete',
    //   label: '삭제',
    //   variant: 'danger',
    //   onClick: () => {
    //
    //   }
    // },
    {
      key: 'enable',
      label: '권한요청',
      variant: 'primary',
      onClick: () => openAdd
    }
  ]
}

export default function MyMenuAuthorityView({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage
      pkColumn={'date'}
      pageType={PageType.MyMenuAuthorityView}
      filterSchemaKey={PageType.MyMenuAuthorityView}
      columns={authorityColumns}
      fetchData={async () => {
        return []
      }}
      initialFilter={initialFilter}
      initialSortKey={''}
      ModalBody={MyMenuAuthorityAddForm}
      modalBodyProps={{}}
      buildActions={buildActions}
    />
  )
}