import PermissionGroupView from "@/features/permission-group/components/PermissionGroupView/PermissionGroupView";
import {serverGet} from "@/shared/api/serverFetcher";
import {PaginationResponseType, ResponseType} from "@/types/common";
import {PermissionGroupColumnType} from "@/types/permission-group";

export default async function PermissionGroupServer() {

  const initialFilter = {
    page: 1,
    pagePerSize: 10
  }

  const res = await serverGet<PaginationResponseType<PermissionGroupColumnType>>('/api/auths/groups/get-list', initialFilter)
  const data = res.result.list

  return (
    <PermissionGroupView
      initialFilter={initialFilter}
      initialData={data}
    />
  )
}