'use client';
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {congestionAmountUseColumns} from "@/features/congestion-amount-use/columns/congestionAmountUse";
import {PageServerProps} from "@/types/common";
import StatisticsFilter from "@/shared/components/searchFilter/StatisticsFilter/StatisticsFilter";

export default function CongestionAmountUseView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage
      pageType={PageType.CongestionAmountUse}
      filterSchemaKey={PageType.CongestionAmountUse}
      columns={congestionAmountUseColumns}
      FilterComponent={StatisticsFilter}
      initialFilter={initialFilter}
      initialData={initialData}
      fetchData={async () => {
        return []
      }}
      onSubmitAdd={async (formData) => {
        return true;
      }}
    />
  )
}