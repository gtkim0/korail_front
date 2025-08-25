import PermissionGroupView from "@/features/permission-group/components/PermissionGroupView/PermissionGroupView";
import {serverGet} from "@/shared/api/serverFetcher";
import {PaginationResponseType, ResponseType} from "@/types/common";
import {PermissionGroupColumnType} from "@/types/permission-group";
import {serverFetcher} from "@/lib/serverFetcher";
import {isUnauthorized} from "@/lib/errors";
import {redirect} from "next/navigation";

export default async function PermissionGroupServer() {

  const initialFilter = {
    page: 1,
    pagePerSize: 10
  }

  // const res = await serverGet<PaginationResponseType<PermissionGroupColumnType>>('/api/auths/groups/get-list', initialFilter)

  try {
    const res = await serverFetcher(`/api/auths/groups/get-list`, initialFilter)
    const data = res.result.list

    return (
      <PermissionGroupView
        initialFilter={initialFilter}
        initialData={data}
      />
    )
  } catch (e) {
    if (isUnauthorized(e)) {
      await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/logout`, {
        method: 'post'
      })
      redirect(`/auth/login`)
    }
    throw e;
  }
}