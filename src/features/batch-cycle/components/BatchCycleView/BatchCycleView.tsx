'use client';
import ListPage from "@/shared/components/listPage/ListPage";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {BatchCycleColumnType} from "@/types/batchCycleColumnType";
import {batchCycleColumns} from "@/features/batch-cycle/columns/batchCycleColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {PageType} from "@/shared/enum/PageType";
import BatchCycleAddForm, {
  BatchCycleFormType
} from "@/features/batch-cycle/components/BatchCycleAddForm/BatchCycleAddForm";

export interface BatchCycleAddFormProps extends BaseModalFormProps<BatchCycleFormType> {
}

export default function BatchCycleView({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage<BatchCycleColumnType, BatchCycleAddFormProps>
      pageType={PageType.BatchCycle}
      filterSchemaKey={PageType.BatchCycle}
      columns={withRowSelection(batchCycleColumns)}
      initialFilter={initialFilter}
      initialData={initialData}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={BatchCycleAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async (formData) => {
        return true;
      }}
      onSubmitAdd={async (formData) => {
        return true;
      }}
      onDelete={async (ids) => {
      }}
    />
  )
}