import {forwardRef, useEffect, useImperativeHandle} from "react";
import {useForm, useStore} from "@tanstack/react-form";
import {z} from "zod";
import {InputField} from "@/shared/components/Input/InputField";
import Image from "next/image";

export type ProgrammingAddFormRef = {
  submit: () => void;
}

interface Props {
  editData?: any;
  onCanSubmitChange?: () => void;
}

const ResetSchema = z.object({
  division: z
    .string(),
  routeNum: z.string(),
  proNum: z.string(),
  routeName: z.string(),
  trainCnt: z.number(),
})

const ProgrammingInfoAddForm =
  forwardRef<ProgrammingAddFormRef, Props>(({editData, onCanSubmitChange}, ref) => {

    const form = useForm({
      defaultValues: {
        division: '',
        routeNum: '',
        proNum: '',
        routeName: '',
        trainCnt: ''
      },
      onSubmit: async ({value}) => {
        console.log('🟢 제출된 데이터:', value);
      },
      validators: {
        onSubmit: ResetSchema,
        onChange: ResetSchema
      }
    });

    const canSubmit = useStore(form.store, (s) => s.canSubmit ?? false);

    useImperativeHandle(ref, () => ({
      submit: async () => {
        return await form.handleSubmit();
      },
    }));

    useEffect(() => {
      if (editData) {
        form.reset(editData);
      }
    }, [editData])

    useEffect(() => {
      onCanSubmitChange?.(canSubmit);
    }, [canSubmit]);

    return (
      <form style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '3.6rem'}}>
        <div style={{display: 'flex', padding: '1.6rem', flexDirection: 'column', gap: '1rem'}}>
          <span style={{fontSize: '1.4rem', color: '#2A2A2B', fontWeight: 600}}>편성 기본 정보</span>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: '3.6rem', rowGap: '3.6rem'}}>
            {
              form.Field({
                name: 'name',
                children: (field) => (
                  <InputField
                    type={'name'}
                    placeholder={'구분'}
                    required={true}
                    field={field}
                    label={'구분'}
                  />
                ),
              })
            }
            {
              form.Field({
                name: 'name',
                children: (field) => (
                  <InputField

                    type={'name'}
                    placeholder={'노선번호.'}
                    required={true}
                    field={field}
                    label={'노선번호'}
                  />
                ),
              })
            }
            {
              form.Field({
                name: 'name',
                children: (field) => (
                  <InputField
                    type={'name'}
                    placeholder={'편성번호'}
                    required={true}
                    field={field}
                    label={'편성번호'}
                  />
                ),
              })
            }
            {
              form.Field({
                name: 'name',
                children: (field) => (
                  <InputField
                    type={'name'}
                    placeholder={'편성번호'}
                    required={true}
                    field={field}
                    label={'편성번호'}
                  />
                ),
              })
            }
            {
              form.Field({
                name: 'name',
                children: (field) => (
                  <InputField
                    type={'name'}
                    placeholder={'편성번호'}
                    required={true}
                    field={field}
                    label={'편성번호'}
                  />
                ),
              })
            }
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            paddingTop: '3.2rem',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <span style={{fontSize: '1.4rem', color: '#2A2A2B', fontWeight: 600, padding: '0 1.6rem'}}>
            차량 구성 (차량 등록)
          </span>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '0 1.6rem .6rem 1.6rem',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: '1rem'
              }}
            >
              <div style={{display: 'flex', gap: '.2rem'}}>
                <span style={{color: '#363637', fontSize: '1.3rem'}}>차량 구성</span>
                <span style={{color: '#F73750', fontSize: '1.3rem'}}>*</span>
              </div>
            </div>

            <div style={{display: 'flex', borderTop: '1px solid #EBEBEB'}}>
              <div
                style={{
                  display: 'flex',
                  width: '32rem',
                  flexDirection: 'column',
                  borderTop: '1px solid #EBEBEB',
                  borderRight: '1px solid #EBEBEB',
                  background: '#F1F1F2'
                }}
              >
                <div style={{display: 'flex', padding: '1.6rem 1.6rem 1.2rem 1.6rem', alignItems: 'center'}}>
                  <div
                    style={{
                      display: 'flex',
                      height: '3.6rem',
                      padding: '0 1.2rem',
                      width: '100%',
                      background: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #D5D5D6',
                      alignItems: 'center'
                    }}
                  >
                    <input
                      placeholder={'차량번호, 차량종류 검색'}
                      style={{
                        flex: 1,
                      }}
                    />
                    <Image src={'/search.svg'} alt={'logo'} width={24} height={24}/>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '0 1.6rem 1.6rem 1.6rem',
                    flex: 1
                  }}
                >

                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  })

export default ProgrammingInfoAddForm;