'use client';
import {PageType} from "@/shared/enum/PageType";
import ListPage from "@/shared/components/listPage/ListPage";
import {OperationInfoColumns} from "@/features/operationInfo/columns/operationInfoColumns";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {OperationInfoColumnType} from "@/types/operationInfo";
import OperationInfoAddForm from "@/features/operationInfo/components/OperationInfoAddForm/OperationInfoAddForm";
import {withRowSelection} from "@/shared/components/table/withRowSelection";

export interface OperationInfoAddFormProps extends BaseModalFormProps<OperationInfoColumnType> {
}

export default function OperationInfoView({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage
      pageType={PageType.OperationInfo}
      filterSchemaKey={PageType.OperationInfo}
      columns={withRowSelection(OperationInfoColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={OperationInfoAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async () => {
        return true;
      }}
      onSubmitAdd={async (value) => {
        return true;
      }}
      onDelete={async (ids) => {
        return true;
      }}
      initialData={initialData}
    />
  )
}

