'use client';
import {BaseModalFormProps, PageServerProps, PaginationResponseType} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {permissionGroupColumns} from "@/features/permission-group/columns/permissionGroupColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {PermissionGroupColumnType} from "@/types/permission-group";
import {PageType} from "@/shared/enum/PageType";
import PermissionGroupAddForm
  from "@/features/permission-group/components/PermissionGroupAddForm/PermissionGroupAddForm";
import {clientGet, clientPost} from "@/shared/api/clientFetcher";

export interface PermissionGroupAddFormProps extends BaseModalFormProps<PermissionGroupColumnType> {
}

export default function PermissionGroupView({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage<PermissionGroupColumnType, PermissionGroupAddFormProps, any>
      pageType={PageType.PermissionGroup}
      filterSchemaKey={PageType.PermissionGroup}
      columns={withRowSelection(permissionGroupColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async (params) => {
        const {page, pagePerSize} = params;
        const newParams = {
          page,
          pagePerSize
        }
        const res = await clientGet<PaginationResponseType<PermissionGroupColumnType>>('/api/auths/groups/get-list', newParams)
        return res.result
      }}
      ModalBody={PermissionGroupAddForm}
      modalBodyProps={{}}
      onSubmitAdd={async (value) => {
        const res = await clientPost("/api/auths/groups/create", value)
        return res.resultCode === '0000';
      }}
      onSubmitEdit={async (value) => {
        const res = clientPost("/api/auths/groups/update", value);
        return true;
      }}
      onDelete={async (ids) => {
        return true;
      }}
      initialData={initialData}
    />
  )
}