'use client'
import styles from './MyProfileView.module.scss';
import {useCommonForm} from "@/shared/hooks/useCommonForm";
import {MemberManagementColumnType} from "@/types/member-management";
import {memberManagementSchema} from "@/features/member-management/schema/memberManagementSchema";
import {useRef} from "react";
import {InputField} from "@/shared/components/Input/InputField";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";
import MultiSelect from "@/shared/components/searchFilter/Filters/MultiSelect/MultiSelect";
import Form from "next/form";
import {clientGet} from "@/shared/api/clientFetcher";
import {z} from "zod";

type Props<T> = {
  editData: T
}


export const permissionGroupSchema = z.object({
  userId: z.string().min(3, '1글자 이상 입력해주세요.'),
  userNm: z.string().min(3, '1글자 이상 입력해주세요.'),
  tptlUserAuthrtrs: z.string().min(3, '1글자 이상 입력해주세요.'),
})

type Auth = {
  authrtId: string;
  tptlAuthrtm: string;
  tptlUserm: string;
  userId: string;
}

export default function MyProfileView<T>({editData}: Props<T>) {

  const formRef = useRef(null)

  const onCanSubmitChange = (a) => {
    console.log(a);
  }

  const form = useCommonForm<any>(
    formRef,
    editData,
    onCanSubmitChange,
    permissionGroupSchema,
    {
      userId: '123', // 회원 아이디
      userNm: '', // 이름
      tptlUserAuthrtrs: [], //소속 권한 그룹
      deptCd: '', // 소속
      jbgdCd: '', // 직급
      cpNo: '', // 연락처
      wideRailYn: 'Y'
    }
  )

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.contentBox}>
          <span className={styles.title}>회원정보</span>
          <div className={styles.content}>
            <div className={styles.gridLayout}>
              {
                form.Field({
                  name: 'userId',
                  children: (field) => {
                    console.log(field.getValue())
                    console.log(field);
                    return (
                      <InputField
                        value={field.getValue()}
                        field={field}
                        label={'회원아이디'}
                        placeholder={'회원아이디'}
                        required
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'userNm',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'이름'}
                        placeholder={'이름'}
                        required
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
            </div>
            <div className={styles.gridLayout}>
              {
                form.Field({
                  name: 'tptlUserAuthrtrs',
                  children: (field) => {
                    console.log(field.getValue());
                    return (
                      <FormFieldWrapper required label={'소속권한그룹'}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '1.2rem',
                            flex: 1,
                            background: '#f1f1f2',
                            border: '1px solid #d5d5d6',
                            borderRadius: '6px',
                            width: '100%',
                            maxHeight: '10rem',
                            overflowY: 'auto'
                          }}
                        >
                          {
                            field.getValue().map((i: Auth, idx: number) => (
                              <span key={idx} style={{fontSize: '1.5rem'}}>{i.authrtId}</span>
                            ))
                          }
                        </div>
                      </FormFieldWrapper>
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'deptCd',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'소속'}
                        placeholder={'소속'}
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'jbgdCd',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'직급'}
                        placeholder={'직급'}
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
              {
                form.Field({
                  name: 'cpNo',
                  children: (field) => {
                    return (
                      <InputField
                        field={field}
                        label={'연락처'}
                        placeholder={'연락처'}
                        height={'3.6rem'}
                      />
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
        <div className={styles.contentBox}>
          <span className={styles.title}>관심 알림설정</span>
          <div className={styles.content}>
            <div className={styles.gridLayout}>
              {
                form.Field({
                  name: 'wideRailYn',
                  children: (field) => {

                    return (
                      <FormFieldWrapper label={'광역/간선구분'}>
                        <FilterRadioGroup
                          name={field.name}
                          selected={field.getValue()}
                          options={[
                            {key: 'Y', label: '광역'},
                            {key: 'N', label: '간선'}
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
                          value={[]}
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
                          value={[]}
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
      </div>
      <div className={styles.editBtn}>
        <button>수정</button>
      </div>
    </div>
  )
}