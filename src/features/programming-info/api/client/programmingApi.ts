import {clientDelete, clientGet, clientPost, clientPut} from "@/shared/api/clientFetcher";

const prefix = '/pro'

export const programmingApi = {
  get: (url, params) => clientGet(url,params),
  create: (body: any) => clientPost(`${prefix}`, body),
  put: (body) => clientPut(`${prefix}`,body),
  delete: (id) => clientDelete(`${prefix}/${id}`)
};