'use client';
import {forwardRef, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {NotificationPushColumnType} from "@/types/notification-push";
import {
  NotificationPushAddFormProps
} from "@/features/notification-push/components/NotificationPushView/NotificationPushView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {notificationPushSchema} from "@/features/notification-push/schema/notificationPushSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import dynamic from "next/dynamic";

const ReactJson = dynamic(()=> import('react-json-view'),{ssr: false})

export type NotificationPushFormType = Omit<NotificationPushColumnType, 'id' | 'date'> & {
  notificationContent: string;
}

const NotificationPushAddForm =
  forwardRef<FormAddFormRef, NotificationPushAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<NotificationPushFormType>(
      ref,
      editData,
      onCanSubmitChange,
      notificationPushSchema,
      {
        status: '',
        channelName: '',
        channelType: '',
        method: '',
        uri: '',
      }
    )

    return (
      <ModalAddFormLayout>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {
            form.Field({
              name: 'channelName',
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
              name: 'channelType',
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
              name: 'method',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'메소드'}>
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
              name: 'uri',
              children: (field) => {
                return (
                  <InputField
                    field={field}
                    label={'URI'}
                    placeholder={'URI를 입력해주세요.'}
                    required
                    height={'3.6rem'}
                  />
                )
              }
            })
          }
        </div>

        <div
          style={{
            width:'100%',
            height:'300px'
          }}
        >
        <ReactJson
          src={{
            name: '123',
            type: 'bbb'
          }}
          style={{
            fontSize:'15px'
          }}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          collapsed={false}
          onEdit={(e) => console.log("수정됨:", e)}
          onAdd={(e) => console.log("추가됨:", e)}
          onDelete={(e) => console.log("삭제됨:", e)}
        />
        </div>


      </ModalAddFormLayout>
    )
  })

export default NotificationPushAddForm;