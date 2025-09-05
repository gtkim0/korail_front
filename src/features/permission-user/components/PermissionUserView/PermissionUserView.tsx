'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {permissionUserColumns} from "@/features/permission-user/columns/permissionUserColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {PermissionUserColumnType} from "@/types/permission-user";
import PermissionUserAddForm from "@/features/permission-user/components/PermissionUserAddForm/PermissionUserAddForm";
import {useClientApi} from "@/shared/hooks/useClientApi";

export interface PermissionUserAddFormProps extends BaseModalFormProps<PermissionUserColumnType> {
  authGroupId: string;
}

export default function PermissionUserView({initialFilter, initialData}: PageServerProps) {

  const api = useClientApi();

  return (
    <ListPage<PermissionUserColumnType, PermissionUserAddFormProps, any>
      modalMaxWidth={'xxl'}
      modalMinWidth={'100rem'}
      pkColumn={'userId'}
      pageType={PageType.PermissionUser}
      filterSchemaKey={PageType.PermissionUser}
      columns={withRowSelection(permissionUserColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async (params) => {
        const newParams = {
          page: params.page,
          pagePerSize: params.pagePerSize,
          authrtId: params.filter.authGroup
        }

        const res = await api.get('/api/auths/users/get-list', newParams);
        return res.result;
      }}
      ModalBody={PermissionUserAddForm}
      modalBodyProps={(props) => {
        return {
          authGroupId: props.appliedFilter.authGroup
        }
      }}
      onSubmitEdit={async (value) => {
        console.log(value);
        return true;
      }}
      initialData={initialData}
    />
  )
}