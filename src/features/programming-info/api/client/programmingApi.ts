import {clientDelete, clientGet, clientPost, clientPut} from "@/shared/api/clientFetcher";

const prefix = '/pro'

export const programmingApi = {
  get: (url: string, params: Record<string, any>) => clientGet(url, params),
  create: (body: any) => clientPost(`${prefix}`, body),
  put: (body: any) => clientPut(`${prefix}`, body),
  delete: (ids: string[]) => clientDelete(`${prefix}/${ids}`)
};