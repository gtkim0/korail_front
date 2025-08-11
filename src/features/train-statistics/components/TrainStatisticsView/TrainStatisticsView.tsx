'use client';
import {PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {trainStatisticsColumns} from "@/features/train-statistics/columns/trainStatisticsColumns";
import StatisticsFilter from "@/shared/components/searchFilter/StatisticsFilter/StatisticsFilter";
import CongestionAnalysisInfraSubFilter
  from "@/features/congestion-analysis-infra/components/CongestionAnalysisInfraSubFilter/CongestionAnalysisInfraSubFilter";

export default function TrainStatisticsView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage
      pageType={PageType.TrainStatistics}
      filterSchemaKey={PageType.TrainStatistics}
      columns={trainStatisticsColumns}
      FilterComponent={StatisticsFilter}
      CustomFilterSubRender={CongestionAnalysisInfraSubFilter}
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

// CongestionAnalysisInfra