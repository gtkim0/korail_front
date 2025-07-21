'use client';
import ListPage from "@/shared/components/listPage/ListPage";
import {saveConditionColumns} from "@/features/save-condition/columns/saveConditionColumns";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {PageType} from "@/shared/enum/PageType";
import {SaveConditionImageColumnType} from "@/types/save-condition-image";
import SaveConditionImageAddForm
  from "@/features/save-condition/components/SaveConditionImageAddForm/SaveConditionImageAddForm";
import {withRowSelection} from "@/shared/components/table/withRowSelection";

export interface SaveConditionImageAddFormProps extends BaseModalFormProps<SaveConditionImageColumnType> {}

export default function SaveConditionImageView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<SaveConditionImageColumnType, SaveConditionImageAddFormProps>
      pageType={PageType.SaveConditionImage}
      filterSchemaKey={PageType.SaveConditionImage}
      columns={withRowSelection(saveConditionColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={SaveConditionImageAddForm}
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