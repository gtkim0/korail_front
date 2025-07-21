'use client';
import {
  congestionStepColumns,
} from "@/features/congestionStep/columns/CongestionStepColumns";
import {PageType} from "@/shared/enum/PageType";
import ListPage from "@/shared/components/listPage/ListPage";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import CongestionAddForm from "@/features/congestionStep/components/CongestionAddForm/CongestionAddForm";
import {clientDelete, clientPost} from "@/shared/api/clientFetcher";

interface Props {
  initialFilter: any;
  initialData: any;
}

export default function CongestionStepView({initialFilter, initialData}: Props) {

  return (
    <ListPage
      pageType={PageType.CongestionStep}
      filterSchemaKey={PageType.CongestionStep}
      columns={withRowSelection(congestionStepColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={ async ({})=> {
        return []
      }}
      ModalBody={CongestionAddForm}
      modalBodyProps={{}}
      onSubmitEdit={ async (formData) => {
        return true;
      }}
      onSubmitAdd={ async (formData) => {
        const res = await clientPost('/apis/board',formData);
        return true;
      }}
      onDelete={async (ids) => {
        const res = await clientDelete(ids);
        // await fetch()
      }}
      initialData={initialData}
    />
  )
}