'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {EmergencyActionManualColumnType} from "@/types/emergency-action-manual";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {emergencyActionManualColumns} from "@/features/emergency-action-manual/columns/emergencyActionManualColumns";
import EmergencyActionManualAddForm
  from "@/features/emergency-action-manual/components/EmergencyActionManualAddForm/EmergencyActionManualAddForm";
import {withRowSelection} from "@/shared/components/table/withRowSelection";

export interface EmergencyActionManualAddFormProps extends BaseModalFormProps<EmergencyActionManualColumnType> {}

export default function EmergencyActionManualView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<EmergencyActionManualColumnType,EmergencyActionManualAddFormProps>
      pageType={PageType.EmergencyActionManual}
      filterSchemaKey={PageType.EmergencyActionManual}
      columns={withRowSelection(emergencyActionManualColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={EmergencyActionManualAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async ()=> {
        return true;
      }}
      onSubmitAdd={async (value)=> {
        console.log(value);
        return true;
      }}
      onDelete={async (ids)=> {
        return true;
      }}
      initialData={initialData}
    />
  )
}