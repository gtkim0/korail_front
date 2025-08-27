import {forwardRef} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  PermissionGroupAddFormProps
} from "@/features/permission-group/components/PermissionGroupView/PermissionGroupView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {PermissionGroupColumnType} from "@/types/permission-group";
import {permissionGroupSchema} from "@/features/permission-group/schema/permissionGroupSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterCheckbox from "@/shared/components/searchFilter/Filters/FilterCheckbox/FilterCheckbox";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";

export type PermissionGroupFormType = Omit<PermissionGroupColumnType, 'id' | 'date'>;

const PermissionGroupAddForm =
  forwardRef<FormAddFormRef, PermissionGroupAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<PermissionGroupFormType>(
      ref,
      editData,
      onCanSubmitChange,
      permissionGroupSchema,
      {
        authrtId: editData?.authrtId ?? '',
        authrtNm: editData?.authrtNm ?? '',
        authrtExplnCn: editData?.authrtExplnCn ?? '',
        // create: false,
        // read: false,
        // update: false,
        // delete: false,
        useYn: true
      }
    )

    return (
      <ModalAddFormLayout>
        {
          form.Field({
            name: 'authrtId',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'그룹ID'}
                  placeholder={'그룹ID를 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'authrtNm',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'그룹명'}
                  placeholder={'그룹명을 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {/*{*/}
        {/*  form.Field({*/}
        {/*    name: 'priLevel',*/}
        {/*    children: (field) => {*/}
        {/*      return (*/}
        {/*        <FormFieldWrapper required label={'권한레벨'}>*/}
        {/*          <FilterSelect*/}
        {/*            options={[]}*/}
        {/*            value={''}*/}
        {/*            onChange={() => {*/}
        {/*            }}*/}
        {/*          />*/}
        {/*        </FormFieldWrapper>*/}
        {/*      )*/}
        {/*    }*/}
        {/*  })*/}
        {/*}*/}
        {
          form.Field({
            name: 'authrtExplnCn',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'설명'}
                  placeholder={'설명을 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }

        {/*<FormFieldWrapper label={'CRUD 권한'} required>*/}
        {/*  <div style={{display: 'flex', gap: '1.6rem'}}>*/}
        {/*    {*/}
        {/*      form.Field({*/}
        {/*        name: 'create',*/}
        {/*        children: (field) =>*/}
        {/*          <FilterCheckbox onChange={() => field.handleChange(!field.getValue())} checked={field.getValue()}*/}
        {/*                          label={'쓰기(C)'}/>*/}
        {/*      })*/}
        {/*    }*/}
        {/*    {*/}
        {/*      form.Field({*/}
        {/*        name: 'read',*/}
        {/*        children: (field) =>*/}
        {/*          <FilterCheckbox onChange={() => field.handleChange(!field.getValue())} checked={field.getValue()}*/}
        {/*                          label={'읽기(R)'}/>*/}
        {/*      })*/}
        {/*    }*/}
        {/*    {*/}
        {/*      form.Field({*/}
        {/*        name: 'update',*/}
        {/*        children: (field) =>*/}
        {/*          <FilterCheckbox onChange={() => field.handleChange(!field.getValue())} checked={field.getValue()}*/}
        {/*                          label={'수정(U)'}/>*/}
        {/*      })*/}
        {/*    }*/}
        {/*    {*/}
        {/*      form.Field({*/}
        {/*        name: 'delete',*/}
        {/*        children: (field) =>*/}
        {/*          <FilterCheckbox onChange={() => field.handleChange(!field.getValue())} checked={field.getValue()}*/}
        {/*                          label={'삭제(D)'}/>*/}
        {/*      })*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</FormFieldWrapper>*/}
        {
          form.Field({
            name: 'useYn',
            children: (field) => {
              return (
                <FormFieldWrapper required direction={'horizontal'} label={'사용여부'}>
                  <ToggleSwitch checked={field.getValue()} onChange={(checked) => field.handleChange(checked)}/>
                </FormFieldWrapper>
              )
            }
          })
        }
      </ModalAddFormLayout>
    )
  })

export default PermissionGroupAddForm;