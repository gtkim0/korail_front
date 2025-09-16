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

  if (!res?.result) {
    logger.error("권한그룹 api prefetch error", {res});
    return (
      <span>
        서버 에러.
      </span>
    );
  }

  return (
    <PermissionGroupView
      initialFilter={initialFilter}
      initialData={res.result}
    />
  )
}