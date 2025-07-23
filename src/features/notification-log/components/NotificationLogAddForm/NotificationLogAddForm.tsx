'use client';
import {forwardRef, useEffect, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {NotificationLogColumnType} from "@/types/notification-log";
import {
  NotificationLogAddFormProps
} from "@/features/notification-log/components/NotificationLogView/NotificationLogView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import CustomDatePicker from "@/shared/components/DatePicker/CustomDatePicker";
import RcTimePicker from "@/shared/components/timePicker/TimePicker";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import {notificationLogSchema} from "@/features/notification-log/schema/notificationLogSchema";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import InputTextArea from "@/shared/components/Input/InputTextArea";

export type NotificationLogFormType = Omit<NotificationLogColumnType, 'id'> & {
  notificationContent: string;
};

const NotificationLogAddForm =
  forwardRef<FormAddFormRef, NotificationLogAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const [date, setDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState<{ hour: string; minute: string; second: string; }>({ hour: '09', minute: '00', second: '00' });

    const form = useCommonForm<NotificationLogFormType>(
      ref,
      editData,
      onCanSubmitChange,
      notificationLogSchema,
      {
        reservationNm: '',
        sendTm: '',
        channelNm: '',
        notificationGrp: '',
        notificationText: '',
        notificationContent: ''
      }
    )

    useEffect(() => {
      if (!date) return;

      const combinedDateTime = new Date(date);
      combinedDateTime.setHours(Number(time.hour));
      combinedDateTime.setMinutes(Number(time.minute));
      combinedDateTime.setSeconds(0);

      form.setFieldValue('sendTm', combinedDateTime.toISOString());
    }, [date, time]);

    return (
      <ModalAddFormLayout>
        {
          form.Field({
            name: 'reservationNm',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'알림예약명'}
                  placeholder={'알림예약명을 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'sendTm',
            children: (field) => {
              return (
                <FormFieldWrapper label={'전송시각'} required>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
                  <CustomDatePicker date={date} onChange={(d) => setDate(d)}/>
                  <RcTimePicker
                    value={time}
                    onChange={(t) => setTime(t)}
                  />
                </div>
                </FormFieldWrapper>
              )
            }
          })
        }
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {
            form.Field({
              name: 'channelNm',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'채널명'}>
                    <FilterSelect
                      enabledAll={false}
                      options={[]}
                      value={''}
                      onChange={() => {}}
                    />
                  </FormFieldWrapper>
                )
              }
            })
          }
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
                      onChange={() => {}}
                    />
                  </FormFieldWrapper>
                )
              }
            })
          }
        </div>
        {
          form.Field({
            name: 'notificationGrp',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'알림문구'}>
                  <FilterSelect
                    enabledAll={false}
                    options={[]}
                    value={''}
                    onChange={(v) => {
                      field.handleChange(v);
                      // const content = notificationTextMap[value] || '';
                      // @TODO 여기서 content 도 받아야됨.
                      const content = ''
                      form.setFieldValue('notificationContent', content);
                    }}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
        {
          form.Field({
            name: 'notificationContent',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'내용'}>
                  <InputTextArea
                    disabled
                    rows={5}
                    name={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e)=> {
                      field?.handleChange(e.target.value)
                    }}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
      </ModalAddFormLayout>
    )
  });

export default NotificationLogAddForm;