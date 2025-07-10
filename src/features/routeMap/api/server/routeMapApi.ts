import {serverGet} from "@/shared/api/serverFetcher";

export const routeMapApi = {
  get: () => serverGet('/test'),
};