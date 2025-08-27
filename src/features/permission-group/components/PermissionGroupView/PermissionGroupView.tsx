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
import {useClientApi} from "@/shared/hooks/useClientApi";

export interface PermissionGroupAddFormProps extends BaseModalFormProps<PermissionGroupColumnType> {
}

export default function PermissionGroupView({initialFilter, initialData}: PageServerProps) {

  const api = useClientApi();

  return (
    <ListPage<PermissionGroupColumnType, PermissionGroupAddFormProps, any>
      pkColumn={'authrtId'}
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
        const res = await api.get('/api/auths/groups/get-list', newParams)
        // const res = await clientGet<PaginationResponseType<PermissionGroupColumnType>>('/api/auths/groups/get-list', newParams)
        return res.result
      }}
      ModalBody={PermissionGroupAddForm}
      modalBodyProps={{}}
      onSubmitAdd={async (body) => {
        const res = await clientPost("/api/auths/groups/create", body)
        return res.resultCode === '0000';
      }}
      onSubmitEdit={async (body) => {
        const res = await clientPost("/api/auths/groups/update", body);
        return res.resultCode === '0000';
      }}
      onDelete={async (ids) => {
        const res = await clientPost('/api/auths/groups/delete', {authrtIds: ids});
        return res.resultCode === '0000'
      }}
      initialData={initialData}
    />
  )
}