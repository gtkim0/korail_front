'use client';
import {PageType} from "@/shared/enum/PageType";
import ListPage from "@/shared/components/listPage/ListPage";
import {stationInfoColumns, StationInfoColumnsType} from "@/features/history-info/columns/historyInfoColumns";
import StationInfoAddForm from "@/features/history-info/components/StationInfoAddForm/StationInfoAddForm";
import {clientDelete, clientGet, clientPost} from "@/shared/api/clientFetcher";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {stationApi} from "@/features/history-info/api/stationsInfoApi";
import {BaseModalFormProps, PageServerProps} from "@/types/common";

export interface StationInfoAddFormProps extends BaseModalFormProps<StationInfoColumnsType> {
  // optional: readonly?: boolean;
}

export default function StationInfoView({initialFilter, initialData, initialSortKey}: PageServerProps) {

  return (
    <ListPage<StationInfoColumnsType, StationInfoAddFormProps>
      pageType={PageType.StationInfo}
      filterSchemaKey={PageType.StationInfo}
      columns={withRowSelection(stationInfoColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ({sortKey, sortOrder, filter, page, size}) => {
        const params = {
          sort: sortKey,
          order: sortOrder,
          page,
          size,
          ...filter,
        };
        const res = await stationApi.list(params);
        return Array.isArray(res) ? res : [];
      }}
      ModalBody={StationInfoAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async (formData: Partial<StationInfoColumnsType>) => {
        const res = await stationApi.put(formData);
        // if(res) return true;
        return true;
      }}
      onSubmitAdd={async (formData) => {
        const res = await clientPost('/apis/board', formData);
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