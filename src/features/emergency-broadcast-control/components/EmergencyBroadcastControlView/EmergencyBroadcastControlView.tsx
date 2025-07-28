'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {EmergencyBroadcastControlColumnType} from "@/types/emergency-broadcast-control";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {
  emergencyBroadcastControlColumns
} from "@/features/emergency-broadcast-control/columns/emergencyBroadcastControlColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import EmergencyBroadcastControlAddForm
  from "@/features/emergency-broadcast-control/components/EmergencyBroadcastControlAddForm/EmergencyBroadcastControlAddForm";

export interface EmergencyBroadcastControlAddFormProps extends BaseModalFormProps<EmergencyBroadcastControlColumnType> {
  commonData: any;
}

export default function EmergencyBroadcastControlView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<EmergencyBroadcastControlColumnType,EmergencyBroadcastControlAddFormProps>
      pageType={PageType.EmergencyBroadcastControl}
      filterSchemaKey={PageType.EmergencyBroadcastControl}
      columns={withRowSelection(emergencyBroadcastControlColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={EmergencyBroadcastControlAddForm}
      modalBodyProps={{
        commonData: [
          {
            key:'sss',
            label:'sss'
          }
        ]
      }}
      onSubmitEdit={async ()=> {
        return true;
      }}
      onSubmitAdd={async (value)=> {
        return true;
      }}
      onDelete={async (ids)=> {
        return true;
      }}
      initialData={initialData}
    />
  )
}