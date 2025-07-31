'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {permissionUserColumns} from "@/features/permission-user/columns/permissionUserColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {PermissionUserColumnType} from "@/types/permission-user";

export interface PermissionUserAddFormProps extends BaseModalFormProps<PermissionUserColumnType>{}

export default function PermissionUserView ({initialFilter,initialData}: PageServerProps) {

  return (
    <ListPage<PermissionUserColumnType, PermissionUserAddFormProps>
      pageType={PageType.PermissionUser}
      filterSchemaKey={PageType.PermissionUser}
      columns={withRowSelection(permissionUserColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={<></>}
      modalBodyProps={{}}
      onSubmitEdit={async ()=> {
        return true;
      }}
      onSubmitAdd={async (value)=> {
        return true;
      }}
      onDelete={async (ids)=> {
        return true;
      }}
      initialData={initialData}
    />
  )
}