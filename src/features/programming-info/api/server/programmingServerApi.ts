import {serverGet} from "@/shared/api/serverFetcher";

const prefix = '/pro'

export const programmingServerApi = {
  get: (url: string, params: Record<string, any>) => serverGet(url, params),
};