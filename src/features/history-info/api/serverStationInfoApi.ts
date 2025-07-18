import {format} from "date-fns";
import {serverGet} from "@/shared/api/serverFetcher";

const prefix = '/board'

export interface StationListQueryParams {
  page: number;
  size: number;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: any; // 확장성 고려
}

export const serverStationApi = {
  list: (params: StationListQueryParams) => {
    const processedParams = {
      ...params,
      category: params.category?.toString(),
      startDate: format(params.range1?.startDate, 'yyyy-MM-dd'),
      endDate: format(params.range1?.endDate, 'yyyy-MM-dd'),
    };
    return serverGet(prefix, processedParams);
  },
};