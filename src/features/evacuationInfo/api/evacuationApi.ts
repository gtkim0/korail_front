import {clientDelete, clientGet, clientPost, clientPut} from "@/shared/api/clientFetcher";
import {format} from "date-fns";
import {EvacuationInfoColumnsType} from "@/features/evacuationInfo/columns/evacuationInfoColumn";

const prefix = '/evacuation'

export interface EvacuationListQueryParams {
  page: number;
  size: number;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: any;
}

export type EvacuationPayload = Partial<EvacuationInfoColumnsType>;

export const evacuationApi = {
  list: (params: EvacuationListQueryParams | any) => {
    const processedParams = {
      ...params,
      category: params.category?.toString(),
      startDate: format(params.range1?.startDate, 'yyyy-MM-dd'),
      endDate: format(params.range1?.endDate, 'yyyy-MM-dd'),
    };
    return clientGet(prefix, processedParams);
  },

  create: (body: EvacuationPayload) =>
    clientPost<EvacuationInfoColumnsType>(`${prefix}`, body),

  put: (body:EvacuationPayload) =>
    clientPut<EvacuationInfoColumnsType>(`${prefix}`,body),

  delete: (ids: string[]) =>
    clientDelete(`${prefix}/${ids.join(',')}`)
};