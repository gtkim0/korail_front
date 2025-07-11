import {serverGet} from "@/shared/api/serverFetcher";

export const menuServerApi = {
  get: (token: any) => serverGet(`/api/menus?token={token}`, { revalidate: 60 }),
};