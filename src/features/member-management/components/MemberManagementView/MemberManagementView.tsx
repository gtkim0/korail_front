'use client';
import {BaseModalFormProps, PageServerProps} from "@/types/common";
import {MemberManagementAddFormType, MemberManagementColumnType} from "@/types/member-management";
import ListPage from "@/shared/components/listPage/ListPage";
import {PageType} from "@/shared/enum/PageType";
import {memberManagementColumns} from "@/features/member-management/columns/memberManagementColumns";
import {withRowSelection} from "@/shared/components/table/withRowSelection";
import MemberManagementAddForm
  from "@/features/member-management/components/MemberManagementAddForm/MemberManagementAddForm";
import {useClientApi} from "@/shared/hooks/useClientApi";

export interface MemberManagementAddFormProps extends BaseModalFormProps<MemberManagementAddFormType> {
}

export default function MemberManagementView({initialFilter, initialData}: PageServerProps) {

  const api = useClientApi();

  return (
    <ListPage<MemberManagementColumnType, MemberManagementAddFormType, any>
      pkColumn={'userId'}
      pageType={PageType.MemberManagement}
      filterSchemaKey={PageType.MemberManagement}
      columns={withRowSelection(memberManagementColumns)}
      initialFilter={initialFilter}
      initialSortKey={'id'}
      ModalBody={MemberManagementAddForm}
      fetchData={async (params) => {
        const res = await api.get('/api/users/get-list', params);
        return res.result;
      }}
      onSubmitEdit={async (value) => {
        const res = await api.post('/api/users/update', value);
        return res.resultCode === '0000';
      }}
      onSubmitAdd={async (value) => {
        const res = await api.post('/api/users/create', value);
        return res.resultCode === '0000';
      }}
      onDelete={async (ids) => {
        const res = await api.post('/api/users/delete', {
          userIds: ids
        })
        return res.resultCode === '0000';
      }}
      initialData={initialData}
    />
  )
}