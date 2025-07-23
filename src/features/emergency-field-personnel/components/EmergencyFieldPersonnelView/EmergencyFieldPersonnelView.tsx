'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {
  emergencyFieldPersonnelColumns
} from "@/features/emergency-field-personnel/columns/emergencyFieldPersonnelColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {EmergencyFieldPersonnelColumnType} from "@/types/emergency-field-personnel";
import EmergencyFieldPersonnelAddForm
  from "@/features/emergency-field-personnel/components/EmergencyFieldPersonnelAddForm/EmergencyFieldPersonnelAddForm";

export interface EmergencyFieldPersonnelAddFormProps extends BaseModalFormProps<EmergencyFieldPersonnelColumnType> {}

export default function EmergencyFieldPersonnelView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<EmergencyFieldPersonnelColumnType, EmergencyFieldPersonnelAddFormProps>
      pageType={PageType.EmergencyFieldPersonnel}
      filterSchemaKey={PageType.EmergencyFieldPersonnel}
      columns={withRowSelection(emergencyFieldPersonnelColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={EmergencyFieldPersonnelAddForm}
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