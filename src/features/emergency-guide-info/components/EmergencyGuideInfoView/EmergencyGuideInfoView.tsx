'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {EmergencyGuideInfoColumnType} from "@/types/emergency-guide-info";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {emergencyGuideInfoColumns} from "@/features/emergency-guide-info/columns/emergencyGuideInfoColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import EmergencyGuideInfoAddForm
  from "@/features/emergency-guide-info/components/EmergencyGuideInfoAddForm/EmergencyGuideInfoAddForm";

export interface EmergencyGuideInfoAddFormProps extends BaseModalFormProps<EmergencyGuideInfoColumnType> {
}

export default function EmergencyGuideInfoView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<EmergencyGuideInfoColumnType, EmergencyGuideInfoAddFormProps>
      pageType={PageType.EmergencyGuideInfo}
      filterSchemaKey={PageType.EmergencyGuideInfo}
      columns={withRowSelection(emergencyGuideInfoColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={EmergencyGuideInfoAddForm}
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