import {forwardRef, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  NotificationRuleAddFormProps
} from "@/features/notification-rules/components/NotificationRuleView/NotificationRuleView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {z} from "zod";
import {notificationRuleSchema} from "@/features/notification-rules/schema/notificationRuleSchema";
import {NotificationRuleColumnType} from "@/types/notification-rule";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {NOTIFICATION_SNS_OPTIONS} from "@/shared/contants/selectOptions/notificationSnsOptions";
import InputTextArea from "@/shared/components/Input/InputTextArea";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";

export type NotificationRuleFormType = Omit<NotificationRuleColumnType, 'id' | 'date'> & {
  notificationContent: string;
}

const NotificationRuleAddForm =
  forwardRef<FormAddFormRef, NotificationRuleAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const [searchModalState, setSearchModalState] = useState<string | null>(null)

    const form = useCommonForm<NotificationRuleFormType>(
      ref,
      editData,
      onCanSubmitChange,
      notificationRuleSchema,
      {
        ruleNm: '',
        congestion: '',
        targetStationNm: '',
        duration: '',
        channelNm: '',
        notificationGrp: '',
        notificationText: '',
        notificationContent: '',
        useYn: ''
      }
    )

    return (
      <ModalAddFormLayout>
        {
          form.Field({
            name: 'ruleNm',
            children: (field) => {
              return (
                <InputField
                  field={field}
                  label={'방송규칙명'}
                  placeholder={'방송규칙명을 입력해주세요.'}
                  required
                  height={'3.6rem'}
                />
              )
            }
          })
        }
        {
          form.Field({
            name: 'congestion',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'혼잡도'}>
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
            name: 'targetStationNm',
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
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', columnGap: '3.6rem'}}>
          {
            form.Field({
              name: 'duration',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'지속시간(분)'}>
                    <FilterSelect
                      enabledAll={false}
                      options={
                        Array.from({ length: 10 }, (_, i) => ({
                          key: String(i + 1),
                          label: `${i + 1}분`
                        }))
                      }
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
              name: 'channelNm',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'채널명'}>
                    <FilterSelect
                      enabledAll={false}
                      options={NOTIFICATION_SNS_OPTIONS}
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
              name: 'notificationText',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'알림문구'}>
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
        {
          form.Field({
            name: 'useYn',
            children: (field) => {
              return (
                <FormFieldWrapper direction={'horizontal'} required label={'사용유무'}>
                  <ToggleSwitch checked={true} onChange={()=> {}} />
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
                  name={field.name}
                  placeholder={'내용을 입력해주세요.'}
                />
                </FormFieldWrapper>
              )
            }
          })
        }
      </ModalAddFormLayout>
    )
  })

export default NotificationRuleAddForm;