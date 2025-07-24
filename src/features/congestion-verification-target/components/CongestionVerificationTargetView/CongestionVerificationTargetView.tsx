'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {
  congestionVerificationTargetColumns
} from "@/features/congestion-verification-target/columns/congestionVerificationTargetColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import CongestionVerificationTargetAddForm
  from "@/features/congestion-verification-target/components/CongestionVerificationTargetForm/CongestionVerificationTargetForm";

export interface CongestionVerificationTargetAddFormProps extends BaseModalFormProps<any> {}

export default function CongestionVerificationTargetView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage
      modalMaxWidth={'xl'}
      pageType={PageType.CongestionVerificationTarget}
      filterSchemaKey={PageType.CongestionVerificationTarget}
      columns={withRowSelection(congestionVerificationTargetColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={CongestionVerificationTargetAddForm}
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
  );
}