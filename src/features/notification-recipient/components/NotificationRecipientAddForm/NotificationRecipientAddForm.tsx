'use client';
import {forwardRef, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  NotificationRecipientAddFormProps
} from "@/features/notification-recipient/components/NotificationRecipientView/NotificationRecipientView";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {NotificationRecipientColumnType} from "@/types/notification-recipient";
import {notificationRecipientSchema} from "@/features/notification-recipient/schema/notificationRecipientSchema";

export type NotificationRecipientFormType = Omit<NotificationRecipientColumnType, 'id' | 'date'> & {
  notificationContent: string;
}

const NotificationRecipientAddForm =
  forwardRef<FormAddFormRef,NotificationRecipientAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const [searchModalState, setSearchModalState] = useState<string | null>(null)

    const form = useCommonForm<NotificationRecipientFormType>(
      ref,
      editData,
      onCanSubmitChange,
      notificationRecipientSchema,
      {
        notificationGrp: '',
        targetStation: '',
        recipientList: ''
      }
    )

    return (
    <ModalAddFormLayout>
      {
        form.Field({
          name: 'notificationGrp',
          children: (field) => {
            return (
              <FormFieldWrapper required label={'알림그룹'}>
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
          name: 'targetStation',
          children: (field) => {
            return (
              <FormFieldWrapper required label={'대상역사'}>
                <SearchModalTrigger
                  value={''}
                  onSelect={() => {}}
                  endPoint={'/'}
                  columns={[]}
                  isOpen={field.name === searchModalState}
                  onOpen={() => setSearchModalState(field.name)}
                  onClose={() => setSearchModalState(null)}
                />
              </FormFieldWrapper>
            )
          }
        })
      }
      {
        form.Field({
          name: 'recipientList',
          children: (field) => {
            return (
              <FormFieldWrapper required label={'수신자목록'}>
                <SearchModalTrigger
                  value={''}
                  onSelect={() => {}}
                  endPoint={'/'}
                  columns={[]}
                  isOpen={field.name === searchModalState}
                  onOpen={() => setSearchModalState(field.name)}
                  onClose={() => setSearchModalState(null)}
                />
              </FormFieldWrapper>
            )
          }
        })
      }
    </ModalAddFormLayout>
  )
})

export default NotificationRecipientAddForm;