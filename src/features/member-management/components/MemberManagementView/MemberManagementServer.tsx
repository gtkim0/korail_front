import MemberManagementView from "@/features/member-management/components/MemberManagementView/MemberManagementView";
import {serverGetAuth} from "@/shared/api/serverAuth";
import {NormalizeResponseType} from "@/types/common";
import logger from "@/lib/logger";

export default async function MemberManagementServer() {

  const initialFilter = {}

  const res = await serverGetAuth<NormalizeResponseType<any>>(`/api/users/get-list`, initialFilter, {
    // returnTo:
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
    <MemberManagementView
      initialFilter={initialFilter}
      initialData={res.result.list}
    />
  )
}