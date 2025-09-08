import PermissionUserView from "@/features/permission-user/components/PermissionUserView/PermissionUserView";
import {serverGetAuth} from "@/shared/api/serverAuth";
import logger from "@/lib/logger";
import {PaginationResponseType} from "@/types/common";
import {AuthUser} from "@/types/auth-user";

interface AuthGroupList {
  authrtExplnCn: string;
  authrtId: string;
  authrtId1: string;
  authrtNm: string;
}

export default async function PermissionUserServer() {

  const authGroupList = await serverGetAuth<PaginationResponseType<AuthGroupList>>('/api/auths/groups/get-list');
  const initAuthGroup = authGroupList.result.list

  console.log(initAuthGroup)

  const initialFilter = {
    page: 1,
    pagePerSize: 10,
    authrtId: initAuthGroup[0]?.authrtId ?? ''
  };

  const res = await serverGetAuth<PaginationResponseType<AuthUser>>(`/api/auths/users/get-list`, initialFilter, {
    returnTo: '/'
  })

  if (!res?.result) {
    logger.error('')
    return (
      <>
        PermissionUserServer pre fetch error
      </>
    )
  }

  return (
    <PermissionUserView
      initialFilter={initialFilter}
      initialData={res.result}
    />
  )
}