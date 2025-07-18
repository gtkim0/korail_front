import {serverGet} from "@/shared/api/serverFetcher";

export const menuServerApi = {
  get: (token: any) => fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/menus?token={token}`).then(res=> res.json()),
};