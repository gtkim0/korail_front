'use client';
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {PageServerProps} from "@/types/common";
import {ColumnDef} from "@tanstack/react-table";
import StatisticsFilter from "@/shared/components/searchFilter/StatisticsFilter/StatisticsFilter";

interface Props extends PageServerProps {
  columns: ColumnDef<{ id: string | number; }, any>[]
}

export default function CongestionAreaView({initialFilter, initialData, columns}: Props) {
  return (
    <ListPage
      pageType={PageType.CongestionArea}
      filterSchemaKey={PageType.CongestionArea}
      columns={columns}
      FilterComponent={StatisticsFilter}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      initialData={initialData}
      fetchData={async () => {
        return []
      }}
    />
  )
}