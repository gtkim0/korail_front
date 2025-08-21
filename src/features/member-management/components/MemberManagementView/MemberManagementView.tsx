'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {MemberManagementColumnType} from "@/types/member-management";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {memberManagementColumns} from "@/features/member-management/columns/memberManagementColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import MemberManagementAddForm
  from "@/features/member-management/components/MemberManagementAddForm/MemberManagementAddForm";

export interface MemberManagementAddFormProps extends BaseModalFormProps<Omit<MemberManagementColumnType, 'id' | 'date'>> {
}

export default function MemberManagementView({initialFilter, initialData}: PageServerProps) {
  return (
    <ListPage<MemberManagementColumnType, MemberManagementAddFormProps>
      pageType={PageType.MemberManagement}
      filterSchemaKey={PageType.MemberManagement}
      columns={withRowSelection(memberManagementColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      ModalBody={MemberManagementAddForm}
      fetchData={async () => {
        return []
      }}
      onSubmitEdit={async () => {
        return true;
      }}
      onSubmitAdd={async (value) => {
        console.log(value);
        return true;
      }}
      onDelete={async (ids) => {
        return true;
      }}
      initialData={initialData}
    />
  )
}