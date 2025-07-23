'use client';
import {forwardRef} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  NotificationTextAddFormProps
} from "@/features/notification-text/components/NotificationTextView/NotificationTextView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {NotificationTextColumnType} from "@/types/notification-text";
import {notificationTextSchema} from "@/features/notification-text/schema/notificationTextSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";
import InputTextArea from "@/shared/components/Input/InputTextArea";
import {InputField} from "@/shared/components/Input/InputField";

export type NotificationRuleFormType = Omit<NotificationTextColumnType, 'id' | 'date'>;

const NotificationTextAddForm =
  forwardRef<FormAddFormRef, NotificationTextAddFormProps>(({editData,onCanSubmitChange}, ref) => {

    const form = useCommonForm<NotificationRuleFormType>(
      ref,
      editData,
      onCanSubmitChange,
      notificationTextSchema,
      {
        division:'',
        title:'',
        content:''
      }
    )

  return (
    <ModalAddFormLayout>
      {
        form.Field({
          name: 'division',
          children: (field) => {
            return (
              <FormFieldWrapper required label={'구분'}>
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
          }
        })
      }
      {
        form.Field({
          name: 'title',
          children: (field) => {
            return (
              <InputField
                field={field}
                label={'제목'}
                placeholder={'제목을 입력해주세요.'}
                required
                height={'3.6rem'}
              />
            )
          }
        })
      }
      {
        form.Field({
          name: 'content',
          children: (field) => {
            return (
              <FormFieldWrapper required label={'내용'}>
                <InputTextArea
                  name={field.name}
                  value={field.state.value ?? ''}
                  onChange={(e)=> {
                    field?.handleChange(e.target.value)
                  }}
                  placeholder={'내용을 입력해주세요.'}
                  rows={6}
                />
              </FormFieldWrapper>
            )
          }
        })
      }
    </ModalAddFormLayout>
  )
})

export default NotificationTextAddForm;