'use client';
import {useForm} from "@tanstack/react-form";
import {InputField} from "@/shared/components/Input/InputField";
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import ColorPicker from "@/shared/components/colorPicker/ColorPicker";
import {forwardRef} from "react";
import {z} from "zod";
import {zRequiredNumber} from "@/shared/utils/zodHelpers";

export type ModalFormRef = {
  submit: () => Promise<any>;
};

const ResetSchema = z.object({
  stepName: z.string().min(3, '단계명은 2자리 이상 입력해주세요.'),
  max: zRequiredNumber({
    min: 1,
    max: 999,
    requiredMessage: '최대값은 필수입니다.',
    minMessage: '1 이상 입력해주세요.',
    maxMessage: '999 이하만 가능합니다.',
  }),
  color: z.string().min(3, '').nullable(),
  alarm: z.string().min(3, ''),
  guide: z.string().min(3, ''),
  message: z.string().min(3, '')
})

const CongestionAddForm = forwardRef<ModalFormRef, any>(({editData, onCanSubmitChange}, ref) => {

  const form = useForm({
    defaultValues: {
      stepName: '',
      max: '',
      color: '#000000',
      alarm: '',
      guide: '',
      message: '',
    },
    onSubmit: async ({value}) => {
      return value;
    },
    validators: {
      onSubmit: ResetSchema as any,
      onChange: ResetSchema as any,
    },
  });

  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '3.6rem',
        padding: '1.6rem'
      }}
    >
      {form.Field({
        name: 'stepName',
        children: (field) => (
          <InputField placeholder={'단계명을 입력해주세요.'} required={true} field={field} label={'단계명'}/>
        ),
      })}
      {form.Field({
        name: 'max',
        children: (field) => (
          <InputField type={'number'} placeholder={'숫자로 입력해주세요.'} required={true} field={field} label={'임계치'}/>
        ),
      })}
      {form.Field({
        name: 'color',
        children: (field) => {
          return (
            <FormFieldWrapper
              label={'색상'}
            >
              <ColorPicker
                color={field.getValue()}
                onChangeAction={(newColor) => {
                  field.setValue(newColor);
                }}
              />
            </FormFieldWrapper>
          )
        },
      })}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          padding:'0 1rem'
        }}
      >
        {form.Field({
          name: 'alarm',
          children: (field) => {
            console.log(field.getValue())
            return (
              <FormFieldWrapper
                label={'알림발생'}
                required={true}
              >
                <ToggleSwitch label={'off'} checked={true} onChange={() => {}}/>
              </FormFieldWrapper>
            )
          },
        })}
        {form.Field({
          name: 'guide',
          children: (field) => (
            // <InputField placeholder={'FF0000'} required={true} field={field} label={'색상'} />
            <FormFieldWrapper
              label={'안내방송'}
              required={true}
            >
              <ToggleSwitch label={'off'} checked={true} onChange={() => {
              }}/>
            </FormFieldWrapper>
          ),
        })}
        {form.Field({
          name: 'message',
          children: (field) => (
            // <InputField placeholder={'FF0000'} required={true} field={field} label={'색상'} />
            <FormFieldWrapper
              label={'문자전송'}
              required={true}
            >
              <ToggleSwitch label={'off'} checked={true} onChange={() => {
              }}/>
            </FormFieldWrapper>
          ),
        })}
      </div>
    </form>
  )
})

export default CongestionAddForm;