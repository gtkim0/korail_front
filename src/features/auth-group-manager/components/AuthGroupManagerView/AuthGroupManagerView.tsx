import {BaseModalFormProps, PageServerProps} from "@/types/common";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {AuthGroupManagerColumns} from "@/features/auth-group-manager/columns/AuthGroupManagerColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import {
  AuthGroupManagerFormType
} from "@/features/auth-group-manager/components/AuthGroupManagerAddForm/AuthGroupManagerAddForm";
import {AuthGroupManagerColumnType} from "@/types/auth-group-manager";

export interface AuthGroupManagerAddFormProps extends BaseModalFormProps<AuthGroupManagerFormType> {
}

export default function AuthGroupManagerView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<AuthGroupManagerColumnType, AuthGroupManagerAddFormProps>
      pageType={PageType.AuthGroupManager}
      filterSchemaKey={PageType.AuthGroupManager}
      columns={withRowSelection(AuthGroupManagerColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      fetchData={async () => {
        return []
      }}
      ModalBody={<></>}
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