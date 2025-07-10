import { clientGet, clientPost } from "@/shared/api/clientFetcher";

export const routeMapApi = {
  get: () => clientGet('/test'),
  create: (body: any) => clientPost('/test', body),
};