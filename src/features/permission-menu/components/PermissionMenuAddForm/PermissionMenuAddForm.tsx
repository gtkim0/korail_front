'use client';
import {forwardRef} from "react";
import {PermissionUserColumnType} from "@/types/permission-user";
import {FormAddFormRef} from "@/types/common";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {PermissionMenuAddFormProps} from "@/features/permission-menu/components/PermissionMenuView/PermissionMenuView";
import {permissionMenuSchema} from "@/features/permission-menu/schema/permissionMenuSchema";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import {InputField} from "@/shared/components/Input/InputField";
import FilterCheckbox from "@/shared/components/searchFilter/Filters/FilterCheckbox/FilterCheckbox";

const PermissionMenuAddForm =
  forwardRef<FormAddFormRef, PermissionMenuAddFormProps>((props, ref) => {

    const {editData, onCanSubmitChange, authGroupId} = props;

    // 권한 아이디
    const form = useCommonForm<any>(
      ref,
      editData,
      onCanSubmitChange,
      permissionMenuSchema,
      {
        authGroupId: authGroupId,
        depth3MenuId: '',
        inptAuthrtYn: 'N',
        inqAuthrtYn: 'N',
        mdfcnAuthrtYn: 'N',
        delAuthrtYn: 'N'
      }
    )

    return (
      <ModalAddFormLayout>
        {
          form.Field({
            name: 'authGroupId',
            children: (field) => {

              return (
                <InputField
                  disabled
                  field={field}
                  label={'대상그룹'}
                  placeholder={''}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'depth3MenuId',
            children: (field) => {

              const menu = `${editData?.depth1MenuNm} > ${editData?.depth2MenuNm} > ${editData?.depth3MenuNm}`

              return (
                <InputField
                  disabled
                  field={field}
                  value={menu}
                  label={'메뉴'}
                  placeholder={''}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        <FormFieldWrapper label={'권한'} required>
          <div style={{display: 'flex', gap: '1.6rem'}}>
            {
              form.Field({
                name: 'inptAuthrtYn',
                children: (field) => {
                  return (
                    <FilterCheckbox onChange={(e) => {
                      const bool = e.target.checked ? 'Y' : 'N'
                      return field.handleChange(bool)
                    }} checked={field.getValue() === 'Y'}
                                    label={'쓰기(C)'}
                    />
                  )
                }
              })
            }
            {
              form.Field({
                name: 'inqAuthrtYn',
                children: (field) =>
                  <FilterCheckbox onChange={(e) => {
                    const bool = e.target.checked ? 'Y' : 'N'
                    return field.handleChange(bool)
                  }}
                                  checked={field.getValue() === 'Y'}
                                  label={'읽기(R)'}/>
              })
            }
            {
              form.Field({
                name: 'mdfcnAuthrtYn',
                children: (field) => {

                  return (
                    <FilterCheckbox
                      onChange={(e) => {
                        const bool = e.target.checked ? 'Y' : 'N'
                        return field.handleChange(bool)
                      }}
                      checked={field.getValue() === 'Y'}
                      label={'수정(U)'}/>
                  )
                }
              })
            }
            {
              form.Field({
                name: 'delAuthrtYn',
                children: (field) =>
                  <FilterCheckbox onChange={(e) => {
                    const bool = e.target.checked ? 'Y' : 'N'
                    return field.handleChange(bool)
                  }}
                                  checked={field.getValue() === 'Y'}
                                  label={'삭제(D)'}/>
              })
            }
          </div>
        </FormFieldWrapper>
      </ModalAddFormLayout>
    )
  })

export default PermissionMenuAddForm;