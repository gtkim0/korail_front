'use client';
import {forwardRef} from "react";
import {PermissionUserColumnType} from "@/types/permission-user";
import {FormAddFormRef} from "@/types/common";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {PermissionMenuAddFormProps} from "@/features/permission-menu/components/PermissionMenuView/PermissionMenuView";
import {permissionMenuSchema} from "@/features/permission-menu/schema/permissionMenuSchema";
import TransferList from "@/shared/components/transferList/TransferList/TransferList";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";

export type PermissionMenuFormType = Omit<PermissionUserColumnType, 'id' | 'date'>;

const PermissionMenuAddForm =
  forwardRef<FormAddFormRef, PermissionMenuAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<any>(
      ref,
      editData,
      onCanSubmitChange,
      permissionMenuSchema,
      {
        groupId: '',
      }
    )

    return (
      <ModalAddFormLayout style={{padding: 0}}>
        <div style={{padding: '1.6rem'}}>
          {
            form.Field({
              name: 'groupId',
              children: (field) => (
                <FormFieldWrapper required label={'권한그룹선택'}>
                  <FilterSelect
                    enabledAll={false}
                    options={SELECT_OPTIONS.ZONE_OPTIONS}
                    value={field.getValue()}
                    onChange={(key) => {
                      field?.handleChange(key)
                    }}
                  />
                </FormFieldWrapper>
              )
            })
          }
        </div>
        <div
          style={{
            width: '74rem'
          }}
        >
          <TransferList
            initialItems={[]}
            selectedItems={[]}
            columns={[
              {key: 'num', header: '번호'},
              {key: 'type', header: '타입'}
            ]}
          />
        </div>
      </ModalAddFormLayout>
    )
  })

export default PermissionMenuAddForm;