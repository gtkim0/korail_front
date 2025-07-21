'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {EmergencyManualColumnType} from "@/types/emergency-manual";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import { withRowSelection } from "@/shared/components/table/withRowSelection";
import SpecialPeriodAddForm from "@/features/special-period/components/SpecialPeriodAddForm/SpecialPeriodAddForm";
import { emergencyManualColumns } from "@/features/emergency-manual/columns/emergencyManualColumns";
import EmergencyManualAddForm
  from "@/features/emergency-manual/components/EmergencyManualAddForm/EmergencyManualAddForm";

export interface EmergencyManualAddFormProps extends BaseModalFormProps<EmergencyManualColumnType> {}

export default function EmergencyManualView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<EmergencyManualColumnType, EmergencyManualAddFormProps>
      pageType={PageType.EmergencyManual}
      filterSchemaKey={PageType.EmergencyManual}
      columns={withRowSelection(emergencyManualColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={EmergencyManualAddForm}
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