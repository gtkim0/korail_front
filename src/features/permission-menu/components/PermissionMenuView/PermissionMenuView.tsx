'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import PermissionMenuAddForm from "@/features/permission-menu/components/PermissionMenuAddForm/PermissionMenuAddForm";
import {permissionMenuColumns} from "@/features/permission-menu/columns/permissionMenuColumns";
import {PermissionMenuColumnType} from "@/types/permission-menu";

export interface PermissionMenuAddFormProps extends BaseModalFormProps<PermissionMenuColumnType> {
}

export default function PermissionMenuView({initialFilter, initialData}: PageServerProps) {

  return (
    <ListPage<PermissionMenuColumnType, PermissionMenuAddFormProps>
      pageType={PageType.PermissionMenu}
      filterSchemaKey={PageType.PermissionMenu}
      columns={withRowSelection(permissionMenuColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={PermissionMenuAddForm}
      modalBodyProps={{}}
      onSubmitEdit={async () => {
        return true;
      }}
      onSubmitAdd={async (value) => {
        return true;
      }}
      onDelete={async (ids) => {
        return true;
      }}
      initialData={initialData}
    />
  )
}