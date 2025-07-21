'use client';
import ListPage from "@/shared/components/listPage/ListPage";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {ZoneInfoColumnType} from "@/types/zoneInfo";
import {PageType} from "@/shared/enum/PageType";
import { zoneInfoColumns } from "@/features/zone-info/columns/zoneInfoColumns";
import ZoneInfoAddForm from "@/features/zone-info/components/ZoneInfoAddForm/ZoneInfoAddForm";

export interface ZoneInfoAddFormProps extends BaseModalFormProps<ZoneInfoColumnType> {}

export default function ZoneInfoView({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage<ZoneInfoColumnType, ZoneInfoAddFormProps>
      pageType={PageType.ZoneInfo}
      filterSchemaKey={PageType.ZoneInfo}
      columns={withRowSelection(zoneInfoColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={ZoneInfoAddForm}
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