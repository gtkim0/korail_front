import { clientGet, clientPost } from "@/shared/api/clientFetcher";

const prefix = '/menu'

export const routeMapApi = {
  get: () => clientGet(`${prefix}`),
  create: (body: any) => clientPost(`${prefix}`, body),
};