import {forwardRef} from "react";
import {FormAddFormRef} from "@/types/common";
import {
  MemberManagementAddFormProps
} from "@/features/member-management/components/MemberManagementView/MemberManagementView";
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {MemberManagementColumnType} from "@/types/member-management";
import {memberManagementSchema} from "@/features/member-management/schema/memberManagementSchema";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import MultiSelect from "@/shared/components/searchFilter/Filters/MultiSelect/MultiSelect";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";
import styles from './MemberManagementAddForm.module.scss';

const MemberManagementAddForm =
  forwardRef<FormAddFormRef, MemberManagementAddFormProps>(({editData, onCanSubmitChange}, ref) => {

    const form = useCommonForm<Omit<MemberManagementColumnType, 'id' | 'date'>>(
      ref,
      editData,
      onCanSubmitChange,
      memberManagementSchema,
      {
        userId: '',
        userNm: '',
        authority: '',
        areaOrTrunk: '',
        interestDirection: '',
        interestStation: [],
        useYn: ''
      }
    )

    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span className={styles.title}>회원 정보</span>
          <div className={styles.formWrapper}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: '3.6rem'}}>
              {
                form.Field({
                  name: 'channelName',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'회원아이디'}
                        placeholder={'회원아이디 를 입력해주세요.'}
                        required
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'channelName',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'비밀번호'}
                        placeholder={'비밀번호 를 입력해주세요.'}
                        required
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'channelName',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'이름'}
                        placeholder={'이름을 입력해주세요.'}
                        required
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: '3.6rem'}}>
              {
                form.Field({
                  name: 'interestStation',
                  children: (field) => {
                    return (
                      <FormFieldWrapper label={'소속권한그룹'}>
                        <MultiSelect
                          options={[
                            {
                              key: 'key1',
                              label: '서울광명'
                            },
                            {
                              key: 'key2',
                              label: '서울광명2'
                            },
                            {
                              key: 'key3',
                              label: '서울광명3'
                            },
                            {
                              key: 'key4',
                              label: '서울광명4'
                            },
                          ]}
                          value={field.getValue()}
                          onChange={(value) => {
                            console.log(value)
                            field.handleChange(value)
                          }}
                        />
                      </FormFieldWrapper>
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'channelName',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'소속'}
                        placeholder={'소속을 입력해주세요.'}
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'channelName',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'직급'}
                        placeholder={'직급을 입력해주세요.'}
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: '3.6rem'}}>
              {
                form.Field({
                  name: 'channelName',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'연락처'}
                        placeholder={'연락처를 입력해주세요.'}
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
              {
                form.Field({
                  name: '',
                  children: (field) => {
                    return (
                      <FormFieldWrapper required label={'사용여부'}>
                        <div style={{height: '100%', display: 'flex', alignItems: 'center'}}>
                          <ToggleSwitch
                            checked={true}
                            onChange={() => {
                            }}
                            label={'On'}
                          />
                        </div>
                      </FormFieldWrapper>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
            alignSelf: 'stretch'
          }}
        >
          <span className={styles.title}>관심 알림설정</span>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', columnGap: '3.6rem', width: '100%'}}>
            {
              form.Field({
                name: '',
                children: (field) => {
                  return (
                    <FormFieldWrapper label={'광역/간선구분'}>
                      <FilterRadioGroup
                        name={field.name}
                        selected={'1'}
                        options={[
                          {key: '1', label: '광역'},
                          {key: '2', label: '간선'}
                        ]}
                        onChange={field.handleChange}
                      />
                    </FormFieldWrapper>
                  )
                }
              })
            }
            {
              form.Field({
                name: 'interestStation',
                children: (field) => {
                  return (
                    <FormFieldWrapper label={'관심 방면'}>
                      <MultiSelect
                        options={[
                          {
                            key: 'key1',
                            label: '서울광명'
                          },
                          {
                            key: 'key2',
                            label: '서울광명2'
                          },
                          {
                            key: 'key3',
                            label: '서울광명3'
                          },
                          {
                            key: 'key4',
                            label: '서울광명4'
                          },
                        ]}
                        value={field.getValue()}
                        onChange={(value) => {
                          console.log(value)
                          field.handleChange(value)
                        }}
                      />
                    </FormFieldWrapper>
                  )
                }
              })
            }
            {
              form.Field({
                name: 'interestStation',
                children: (field) => {
                  return (
                    <FormFieldWrapper label={'관심 역사'}>
                      <MultiSelect
                        options={[
                          {
                            key: 'key15',
                            label: '서울광명'
                          },
                          {
                            key: 'key25',
                            label: '서울광명2'
                          },
                          {
                            key: 'key35',
                            label: '서울광명3'
                          },
                          {
                            key: 'key45',
                            label: '서울광명4'
                          },
                        ]}
                        value={field.getValue()}
                        onChange={(value) => {
                          console.log(value)
                          field.handleChange(value)
                        }}
                      />
                    </FormFieldWrapper>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    )
  })

export default MemberManagementAddForm;