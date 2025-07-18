import {clientDelete, clientGet, clientPost, clientPut} from "@/shared/api/clientFetcher";
import {StationInfoColumnsType} from "@/features/history-info/columns/historyInfoColumns";
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

export type StationPayload = Partial<StationInfoColumnsType>;

export const stationApi = {
  list: (params: any) => {
    const processedParams = {
      ...params,
      category: params.category?.toString(),
      startDate: format(params.range1?.startDate, 'yyyy-MM-dd'),
      endDate: format(params.range1?.endDate, 'yyyy-MM-dd'),
    };
    return clientGet(prefix, processedParams);
  },

  create: (body: StationPayload) =>
    clientPost<StationInfoColumnsType>(`${prefix}`, body),

  put: (body:StationPayload) =>
    clientPut<StationInfoColumnsType>(`${prefix}`,body),

  delete: (ids: string[]) =>
    clientDelete(`${prefix}/${ids.join(',')}`)
};