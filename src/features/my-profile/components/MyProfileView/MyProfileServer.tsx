import MyProfileView from "@/features/my-profile/components/MyProfileView/MyProfileView";
import {clientGet} from "@/shared/api/clientFetcher";
import {serverGet} from "@/shared/api/serverFetcher";
import logger from "@/lib/logger";

export default async function MyProfileServer() {

  const res = await serverGet('/api/auths/me');


  logger.info(res);

  return (
    <MyProfileView/>
  )
}