'use client';
import ListPage from "@/shared/components/listPage/ListPage";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import { SpecialPeriodColumnType } from "@/types/special-period";
import {PageType} from "@/shared/enum/PageType";
import {specialPeriodColumns} from "@/features/special-period/columns/specialPeriodColumns";
import SpecialPeriodAddForm from "@/features/special-period/components/SpecialPeriodAddForm/SpecialPeriodAddForm";

export interface SpecialPeriodAddFormProps extends BaseModalFormProps<SpecialPeriodColumnType> {}

export default function SpecialPeriodView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<SpecialPeriodColumnType, SpecialPeriodAddFormProps>
      pageType={PageType.SpecialPeriod}
      filterSchemaKey={PageType.SpecialPeriod}
      columns={withRowSelection(specialPeriodColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={SpecialPeriodAddForm}
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