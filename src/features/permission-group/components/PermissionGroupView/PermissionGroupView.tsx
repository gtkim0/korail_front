'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {permissionGroupColumns} from "@/features/permission-group/columns/permissionGroupColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {PermissionGroupColumnType} from "@/types/permission-group";
import {PageType} from "@/shared/enum/PageType";
import PermissionGroupAddForm
  from "@/features/permission-group/components/PermissionGroupAddForm/PermissionGroupAddForm";

export interface PermissionGroupAddFormProps extends BaseModalFormProps<PermissionGroupColumnType>{}

export default function PermissionGroupView ({initialFilter,initialData}: PageServerProps) {
  return (
    <ListPage<PermissionGroupColumnType,PermissionGroupAddFormProps>
      pageType={PageType.PermissionGroup}
      filterSchemaKey={PageType.EmergencyGuideInfo}
      columns={withRowSelection(permissionGroupColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async ()=> {
        return []
      }}
      ModalBody={PermissionGroupAddForm}
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