'use client';
import {PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {congestionEquipStatusColumns} from "@/features/congestion-equip-status/columns/congestionEquipStatus";
import StatisticsFilter from "@/shared/components/searchFilter/StatisticsFilter/StatisticsFilter";
import CongestionEquipStatusSubFilter
  from "@/features/congestion-equip-status/components/CongestionEquipStatusSubFilter/CongestionEquipStatusSubFilter";

export default function CongestionEquipStatusView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage
      pageType={PageType.CongestionEquipStatus}
      filterSchemaKey={PageType.CongestionEquipStatus}
      columns={congestionEquipStatusColumns}
      FilterComponent={StatisticsFilter}
      CustomFilterSubRender={CongestionEquipStatusSubFilter}
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