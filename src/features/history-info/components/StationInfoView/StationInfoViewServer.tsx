import StationInfoView from "@/features/history-info/components/StationInfoView/StationInfoView";
import {format} from "date-fns";
import logger from "@/lib/logger";
import {serverStationApi} from "@/features/history-info/api/serverStationInfoApi";

export default async function StationInfoViewServer() {

  const initialFilter = {
    category: ['1', '2', '3', '4'],
    type: '',
    range1: {
      startDate: new Date(),
      endDate: new Date()
    }
  };

  const sortKey = 'id';
  const sortOrder = 'asc';

  const newFilter = {
    ...initialFilter,
    category: initialFilter.category.toString(),
    startDate: format(initialFilter.range1.startDate, 'yyyy-MM-dd'),
    endDate: format(initialFilter.range1.endDate, 'yyyy-MM-dd'),
  };

  const res = await serverStationApi.list({
    page: 0,
    size: 10,
    sort: sortKey,
    order: sortOrder,
    ...newFilter
  });

  return (
    <StationInfoView
      initialFilter={initialFilter}
      initialData={Array.isArray(res) ? res : []}
      initialSortKey={sortKey}
    />
  )
}