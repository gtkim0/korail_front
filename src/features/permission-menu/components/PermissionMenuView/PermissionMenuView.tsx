'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import PermissionMenuAddForm from "@/features/permission-menu/components/PermissionMenuAddForm/PermissionMenuAddForm";
import {permissionMenuColumns} from "@/features/permission-menu/columns/permissionMenuColumns";
import {PermissionMenuColumnType, PermissionMenuResponseType} from "@/types/permission-menu";
import {useClientApi} from "@/shared/hooks/useClientApi";

export interface PermissionMenuAddFormProps extends BaseModalFormProps<PermissionMenuColumnType> {
  authGroupId: string
}

export default function PermissionMenuView({initialFilter, initialData}: PageServerProps) {

  const api = useClientApi();

  return (
    <ListPage<PermissionMenuColumnType, PermissionMenuAddFormProps, any>
      pkColumn={'depth3PrgrmId'}
      pageType={PageType.PermissionMenu}
      filterSchemaKey={PageType.PermissionMenu}
      columns={withRowSelection(permissionMenuColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      initialData={initialData}
      fetchData={async (params) => {
        const newParams = {
          page: params.page,
          pagePerSize: params.pagePerSize,
          authrtId: params.filter.authGroup
        }

        const res = await api.get<PermissionMenuResponseType>('/api/auths/menus/get-list', newParams);
        return res.result;
      }}
      ModalBody={PermissionMenuAddForm}
      modalBodyProps={(props) => {
        return {
          authGroupId: props.appliedFilter.authGroup
        }
      }}
      onSubmitEdit={async (v) => {
        const body = {
          authrtId: v.authGroupId,
          menuId: v.depth3MenuId,
          delAuthrtYn: v.delAuthrtYn,
          inptAuthrtYn: v.inptAuthrtYn,
          inqAuthrtYn: v.inqAuthrtYn,
          mdfcnAuthrtYn: v.mdfcnAuthrtYn,
          dwnldAuthrtYn: 'Y'
        }

        const res = await api.post('/api/auths/menus/update', body);
        return res.resultCode === '0000'
      }}
    />
  )
}