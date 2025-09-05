'use client';
import {forwardRef, useEffect, useState} from "react";
import {PermissionUserColumnType} from "@/types/permission-user";
import {FormAddFormRef, PaginationResponseType} from "@/types/common";
import {PermissionUserAddFormProps} from "@/features/permission-user/components/PermissionUserView/PermissionUserView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {permissionUserSchema} from "@/features/permission-user/schema/permissionUserSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import TransferList from "@/shared/components/transferList/TransferList/TransferList";
import {useClientApi} from "@/shared/hooks/useClientApi";
import {serverGetAuth} from "@/shared/api/serverAuth";
import {AuthUser} from "@/types/auth-user";

export type PermissionUserFormType = Omit<PermissionUserColumnType, 'id' | 'date'>;

const PermissionUserAddForm =
  forwardRef<FormAddFormRef, PermissionUserAddFormProps>(({editData, onCanSubmitChange, authGroupId}, ref) => {

    const api = useClientApi();

    const [users, setUsers] = useState<any[]>([]);
    const [authUsers, setAuthUsers] = useState<any[]>([]);
    const [bootstrapped, setBootstrapped] = useState(false);

    const form = useCommonForm<PermissionUserFormType>(
      ref,
      editData,
      onCanSubmitChange,
      permissionUserSchema,
      {selected: []}
    );

    const initialFilter = {page: 1, pagePerSize: 10000, authGroup: authGroupId};

    const fetchAuthUser = async () => {
      const res = await api.get(`/api/auths/users/get-list`, initialFilter);
      if (res.resultCode === '0000') setAuthUsers(res.result.list ?? []);
    };

    const fetchUser = async () => {
      const res = await api.get('/api/users/get-list?pagePerSize=10000');
      if (res.resultCode === '0000') setUsers(res.result.list ?? []);
    };

    useEffect(() => {
      fetchAuthUser();
      fetchUser();
    }, []);

    useEffect(() => {
      if (!bootstrapped && authUsers.length >= 0) {
        form.setFieldValue('selected', authUsers);
        setBootstrapped(true);
      }
    }, [authUsers, bootstrapped, form]);

    return (
      <ModalAddFormLayout
        style={{padding: 0}}
      >
        {
          form.Field({
            name: 'selected',
            children: (field) => {
              return (
                <TransferList
                  idKey={'userId'}
                  columns={[
                    {
                      key: 'userId',
                      header: '회원 아이디'
                    },
                    {
                      key: 'userNm',
                      header: '이름'
                    },
                    {
                      key: 'jbgdCd',
                      header: '소속'
                    },
                    {
                      key: 'deptCd',
                      header: '직급'
                    },
                    {
                      key: 'cpNo',
                      header: '연락처'
                    }
                  ]}
                  rightColumns={[
                    {
                      key: 'userId',
                      header: '회원 아이디'
                    },
                    {
                      key: 'userNm',
                      header: '이름'
                    },
                  ]}
                  initialItems={users}
                  value={field.getValue() ?? []}
                  // onChange={(b) => {
                  //   console.log(b)
                  //   return field.handleChange(b);
                  //   return form.setFieldValue('selected', b);
                  // }}
                  onChange={field.handleChange}
                  // selectedItems={authUsers}
                />
              )
            }
          })
        }
      </ModalAddFormLayout>
    )
  })

export default PermissionUserAddForm;