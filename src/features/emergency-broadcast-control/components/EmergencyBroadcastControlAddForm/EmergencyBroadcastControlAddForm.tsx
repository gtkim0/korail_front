'use client';
import {forwardRef, useState} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  EmergencyBroadcastControlAddFormProps
} from "@/features/emergency-broadcast-control/components/EmergencyBroadcastControlView/EmergencyBroadcastControlView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {z} from "zod";
import {
  emergencyBroadcastControlSchema
} from "@/features/emergency-broadcast-control/schema/emergencyBroadcastControlSchema";
import ModalAddFormLayout from "@/shared/components/modalAddFormLayout/ModalAddFormLayout";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterSelect from "@/shared/components/searchFilter/Filters/FilterSelect/FilterSelect";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {SELECT_OPTIONS} from "@/shared/contants/selectOptions";
import InputTextArea from "@/shared/components/Input/InputTextArea";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";


const EmergencyBroadcastControlAddForm =
  forwardRef<FormAddFormRef, EmergencyBroadcastControlAddFormProps>(
    (
      {
        editData,
        onCanSubmitChange,
        commonData
      }, ref
    ) => {

    const [searchModalState, setSearchModalState] = useState<string | null>(null)

    const form = useCommonForm<z.infer<typeof emergencyBroadcastControlSchema>>(
      ref,
      editData,
      onCanSubmitChange,
      emergencyBroadcastControlSchema,
      {
        broadcastRuleNm: '',
        congestion: '',
        targetRoute: '',
        targetStation: '',
        targetZone: '',
        numOfBroadCast: '',
        announcement: '',
        autoBroadcast: ''
      }
    )

    return (
      <ModalAddFormLayout>
        {
          form.Field({
            name: 'broadcastRuleNm',
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
            name: 'broadcastRuleNm',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'혼잡도'}>
                  <FilterSelect
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
            name: 'targetRoute',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'대상노선'}>
                  <SearchModalTrigger
                    value={''}
                    onSelect={() => {
                    }}
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
              name: 'targetStation',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'대상역사'}>
                    <SearchModalTrigger
                      value={field.state.value}
                      onSelect={(t) => {
                        console.log(t);
                      }}
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
              name: 'targetZone',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'대상구역'}>
                    <FilterSelect
                      options={SELECT_OPTIONS.ZONE_OPTIONS}
                      value={''}
                      onChange={()=> {}}
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
              name: 'numOfBroadCast',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'방송횟수'}>
                    <FilterSelect
                      options={[
                        {key:'1',label:'1'},
                        {key:'2',label:'2'},
                        {key:'3',label:'3'},
                        {key:'4',label:'4'},
                        {key:'5',label:'5'},
                      ]}
                      value={''}
                      onChange={()=> {}}
                    />
                  </FormFieldWrapper>
                )
              }
            })
          }
          {
            form.Field({
              name: 'targetZone',
              children: (field) => {
                return (
                  <FormFieldWrapper required label={'안내방송'}>
                    <FilterSelect
                      options={[
                        {key:'1',label:'1'},
                      ]}
                      value={''}
                      onChange={()=> {}}
                    />
                  </FormFieldWrapper>
                )
              }
            })
          }
        </div>
        {
          form.Field({
            name: 'autoBroadcast',
            children: (field) => {
              return (
                <FormFieldWrapper direction={'horizontal'} required label={'자동발송'}>
                  <ToggleSwitch
                    checked={false}
                    onChange={()=> {}}
                  />
                </FormFieldWrapper>
              )
            }
          })
        }
        {
          form.Field({
            name: 'announcement',
            children: (field) => {
              return (
                <FormFieldWrapper required label={'내용'}>
                  <InputTextArea
                    rows={6}
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
  })

export default EmergencyBroadcastControlAddForm;