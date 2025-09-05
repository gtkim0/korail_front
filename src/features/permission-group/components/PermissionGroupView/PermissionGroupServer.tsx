import PermissionGroupView from "@/features/permission-group/components/PermissionGroupView/PermissionGroupView";
import {serverGetAuth} from "@/shared/api/serverAuth";
import logger from "@/lib/logger";

export default async function PermissionGroupServer() {

  const initialFilter = {
    page: 1,
    pagePerSize: 10
  }

  const res = await serverGetAuth<{ list: any }>(`/api/auths/groups/get-list`, initialFilter, {
    returnTo: "/mypage/profile",
  })

  console.log("res123", res);

  if (!res?.result) {
    logger.warn("MyProfileServer: profile 데이터 없음", {res});
    return (
      <div>
        <h2>프로필을 불러오지 못했습니다.</h2>
        <p>잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }


  return (
    <PermissionGroupView
      initialFilter={initialFilter}
      initialData={res.result.list}
    />
  )
}