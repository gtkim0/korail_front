'use client';
import {forwardRef, useEffect, useMemo, useState} from "react";
import {PermissionUserColumnType} from "@/types/permission-user";
import {FormAddFormRef} from "@/types/common";
import {PermissionUserAddFormProps} from "@/features/permission-user/components/PermissionUserView/PermissionUserView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {permissionUserSchema} from "@/features/permission-user/schema/permissionUserSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import TransferList from "@/shared/components/transferList/TransferList/TransferList";
import {useClientApi} from "@/shared/hooks/useClientApi";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {permissionUserAddFormColumn} from "@/features/permission-user/columns/permissionUserAddFormColumn";
import {Updater} from "@tanstack/react-table";

type UserRow = {
  userId: string;
  userNm: string;
  jbgdCd?: string;
  deptCd?: string;
  cpNo?: string;
};
type AuthGroupRow = { authrtId: string; authrtNm: string };

export type PermissionUserFormType = Omit<PermissionUserColumnType, 'id' | 'date'> & {
  selected: UserRow[];
  authGrpId?: string;
};

const PermissionUserAddForm = forwardRef<FormAddFormRef, PermissionUserAddFormProps>(
  ({editData, onCanSubmitChange, isOpen, authGroupId}, ref) => {
    const api = useClientApi();

    const [users, setUsers] = useState<UserRow[]>([]);
    const [authUsers, setAuthUsers] = useState<UserRow[]>([]);
    const [authGroups, setAuthGroups] = useState<AuthGroupRow[]>([]);
    const [loading, setLoading] = useState({users: false, authUsers: false, groups: false});

    const form = useCommonForm<PermissionUserFormType>(
      ref,
      editData,
      onCanSubmitChange,
      permissionUserSchema,
      {selected: [], authGrpId: authGroupId} // 초기값
    );

    // 권한 그룹 옵션
    const authGroupOptions = useMemo(
      () =>
        authGroups.map(g => ({
          key: g.authrtId,
          label: g.authrtNm,
        })),
      [authGroups]
    );

    const fetchUsers = async () => {
      try {
        setLoading(s => ({...s, users: true}));
        const res = await api.get('/api/users/get-list?pagePerSize=10000');
        if (res.resultCode === '0000') setUsers(res.result.list ?? []);
      } finally {
        setLoading(s => ({...s, users: false}));
      }
    };

    const fetchAuthGroups = async () => {
      try {
        setLoading(s => ({...s, groups: true}));
        const res = await api.get('/api/auths/groups/get-list');
        if (res.resultCode === '0000') setAuthGroups(res.result.list ?? []);
      } finally {
        setLoading(s => ({...s, groups: false}));
      }
    };

    const fetchAuthUsersByGroup = async (grpId?: string) => {
      if (!grpId) {
        setAuthUsers([]);
        form.setFieldValue('selected', []);
        return;
      }
      try {
        setLoading(s => ({...s, authUsers: true}));

        const res = await api.get('/api/auths/users/get-list', {page: 1, pagePerSize: 10000, authrtId: grpId});
        const list: UserRow[] = res.resultCode === '0000' ? (res.result.list ?? []) : [];
        setAuthUsers(list);
        // 이 타이밍에만 의도적으로 폼값 업데이트 (초기/그룹 변경 시)
        form.setFieldValue('selected', list as Updater<string[] & UserRow[]>);
      } finally {
        setLoading(s => ({...s, authUsers: false}));
      }
    };

    useEffect(() => {
      fetchUsers();
      fetchAuthGroups();
    }, []);

    useEffect(() => {
      if (authGroupId) {
        fetchAuthUsersByGroup(authGroupId);
      }
    }, [authGroupId]);

    console.log(users);

    return (
      <ModalAddFormLayout style={{padding: 0}}>
        <div style={{padding: '1.2rem 1.6rem'}}>
          {form.Field({
            name: 'authGrpId',
            children: (field) => (
              <FormFieldWrapper label={'권한그룹선택'} required>
                <FilterSelect
                  enabledAll={false}
                  options={authGroupOptions}
                  value={field.getValue() as string}
                  onChange={(value) => {
                    field.handleChange(value);
                    fetchAuthUsersByGroup(value);
                  }}
                />
              </FormFieldWrapper>
            ),
          })}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{display: 'flex', flexDirection: 'column', padding: '0 1.6rem', gap: '1rem'}}>
            <span style={{fontSize: '1.4rem', fontWeight: 600}}>사용자 구성(사용자 등록)</span>
            <span style={{fontSize: '1.3rem'}}>사용자 구성
            </span>
          </div>
          {form.Field({
            name: 'selected',
            children: (field) => (
              <TransferList<UserRow>
                idKey="userId"
                columns={permissionUserAddFormColumn.left}
                rightColumns={permissionUserAddFormColumn.right}
                allItems={users}
                value={field.getValue() ?? []}
                onChange={field.handleChange}
              />
            )
          })}
        </div>
      </ModalAddFormLayout>
    );
  }
);

export default PermissionUserAddForm;