'use client';
import {PageServerProps} from "@/types/common";
import {ColumnDef} from "@tanstack/react-table";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";

interface Props extends PageServerProps {
  columns: ColumnDef<{ id: string | number; }, any>[]
}

export default function CongestionStationView({initialFilter, initialData, columns}: Props) {
  return (
    <ListPage
      pageType={PageType.CongestionStation}
      filterSchemaKey={PageType.CongestionStation}
      columns={columns}
      initialFilter={initialFilter}
      initialData={initialData}
      initialSortKey={'id'}
      // onDownload={() => {
      //
      // }}
      fetchData={async () => {
        return []
      }}
    />
  )
}