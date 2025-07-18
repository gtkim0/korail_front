'use client';
import styles from "@/app/(auth)/auth/reset-password/reset-password.module.scss";
import {InputField} from "@/shared/components/Input/InputField";
import FormSubmitButton from "@/shared/components/form/FormSubmitButton/FormSubmitButton";
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useForm} from "@tanstack/react-form";
import {toast} from "react-hot-toast";
import {z} from 'zod';

const ResetSchema = z.object({
  password: z
    .string()
    .min(10, '비밀번호는 최소 10자리여야 합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])/, '영문 + 숫자/특수문자 조합 필수'),
  confirmPassword: z.string(),
}).refine(data=> data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
})

export default function ResetPasswordForm () {

  const token = useSearchParams().get('token');
  const [ isValid, setIsValid ] = useState<boolean | null>(null);

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: ResetSchema,
      onChange: ResetSchema
    },
    onSubmit: async ({value}) => {
      try {
        const res = await fetch('/api/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value), // form -> value로 변경
        });

        if (!res.ok) {
          const error = await res.text();
          toast.error(`로그인 실패: ${error}`);
          return;
        }
      } catch (err) {
        toast.error('서버 오류: 로그인 요청 실패');
        console.error(err);
      }
    },
  })

  useEffect(()=> {

    if(!token) {
      setIsValid(false);
      return ;
    }

    fetch(`spring?token=${token}`)
      .then((res)=> {
        setIsValid(res.ok)
      })
      .catch(()=> setIsValid(false));
  },[token])

  return (
    <form
      className={styles.formSection}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className={styles.formGroup}>
        <div style={{width: '32rem', gap: '3.2rem', display: 'flex', flexDirection: 'column'}}>
          <div className={styles.formItem}>
            {
              form.Field({
                name: 'password',
                children: (field) => (
                  <InputField
                    type={'password'}
                    placeholder={'새 비밀번호를 입력해 주세요.'}
                    required={true}
                    field={field}
                    label={'새 비밀번호'}
                    help="영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상"
                    helpPosition="bottom"
                  />
                ),
              })
            }
            {
              form.Field({
                name: 'confirmPassword',
                children: (field) => (
                  <InputField
                    type={'password'}
                    placeholder={'새 비밀번호를 입력해 주세요.'}
                    required={true}
                    field={field}
                    label={'새 비밀번호 확인'}
                  />
                ),
              })
            }
          </div>

          <FormSubmitButton form={form}>
            비밀번호 변경
          </FormSubmitButton>
        </div>
      </div>
    </form>
  )
}