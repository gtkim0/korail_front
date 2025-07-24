'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {
  congestionVerificationCompleteColumns
} from "@/features/congestion-verification-complete/columns/congestionVerificationCompleteColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {CongestionVerificationCompleteColumnType} from "@/types/congestion-verification-complete";

export interface CongestionVerificationCompleteAddFormProps extends BaseModalFormProps<any> {}

export default function CongestionVerificationCompleteView ({initialFilter,initialData}: PageServerProps) {
  return (
    <ListPage<CongestionVerificationCompleteColumnType, CongestionVerificationCompleteAddFormProps>
      pageType={PageType.CongestionVerificationComplete}
      filterSchemaKey={PageType.CongestionVerificationComplete}
      columns={withRowSelection(congestionVerificationCompleteColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={<></>}
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