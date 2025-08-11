'use client';
import {forwardRef} from "react";
import {FormAddFormRef} from "@/types/common";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {notificationPushSchema} from "@/features/notification-push/schema/notificationPushSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {
  AuthGroupManagerAddFormProps
} from "@/features/auth-group-manager/components/AuthGroupManagerView/AuthGroupManagerView";
import {AuthGroupManagerColumnType} from "@/types/auth-group-manager";

export type AuthGroupManagerFormType = Omit<AuthGroupManagerColumnType, 'id' | 'date'> & {}

const AuthGroupManagerAddForm =
  forwardRef<FormAddFormRef, AuthGroupManagerAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<AuthGroupManagerFormType>(
      ref,
      editData,
      onCanSubmitChange,
      notificationPushSchema,
      {
        grpId: '',
        grpNm: '',
        authorityLv: '',
        description: '',
        create: '',
        read: '',
        update: '',
        delete: '',
        useYn: false
      }
    )

    return (
      <ModalAddFormLayout>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {
            form.Field({
              name: 'grpId',
              children: (field) => {
                return (
                  <InputField
                    field={field}
                    label={'채널명'}
                    placeholder={'채널명을 입력해주세요.'}
                    required
                    height={'3.6rem'}
                  />
                )
              }
            })
          }
          {
            form.Field({
              name: 'grpNm',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'채널타입'}>
                    <FilterSelect
                      enabledAll={false}
                      options={[]}
                      value={''}
                      onChange={() => {
                      }}
                    />
                  </FormFieldWrapper>
                )
              }
            })
          }
        </div>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {
            form.Field({
              name: 'authorityLv',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'권한레벨'}>
                    <FilterSelect
                      enabledAll={false}
                      options={[]}
                      value={''}
                      onChange={() => {
                      }}
                    />
                  </FormFieldWrapper>
                )
              }
            })
          }
          {
            form.Field({
              name: 'description',
              children: (field) => {
                return (
                  <InputField
                    field={field}
                    label={'설명'}
                    placeholder={'URI를 입력해주세요.'}
                    required
                    height={'3.6rem'}
                  />
                )
              }
            })
          }
        </div>
      </ModalAddFormLayout>
    )
  })

export default AuthGroupManagerAddForm;