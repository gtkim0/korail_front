'use client';
import {useState} from "react";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {instrumentationColumns} from "@/features/instrumentation/columns/InstrumentationColumns";
import {InstrumentationColumnType} from "@/types/instrumentation";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import InstrumentationAddForm
  from "@/features/instrumentation/components/InstrumentationAddForm/InstrumentationAddForm";

export interface InstrumentationAddFormProps extends BaseModalFormProps<InstrumentationColumnType> {}

export default function InstrumentationView ({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage<InstrumentationColumnType, InstrumentationAddFormProps>
      pageType={PageType.Instrumentation}
      filterSchemaKey={PageType.Instrumentation}
      columns={withRowSelection(instrumentationColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async() => {
        return []
      }}
      ModalBody={InstrumentationAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async ()=> {
        return true;
      }}
      onSubmitAdd={async ()=> {
        return true;
      }}
      onDelete={async (ids)=> {
        return true;
      }}
      initialData={initialData}
    />
  )
}