import styles from './FindUsernameForm.module.scss';
import {InputField} from "@/shared/components/Input/InputField";
import {useForm} from "@tanstack/react-form";
import {toast} from "react-hot-toast";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {formatPhoneNumber} from "@/utils/formatPhoneNumber";

export default function FindUsernameForm() {

  const [result, setResult] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: '',
      phone: '',
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

  const handleGoToLogin = async () => {
    router.push('/auth/login')
  }

  const handleSubmit = () => {
    setShow(true);
    setResult('user001@korail.com')
  }

  useEffect(() => {

    return () => {
      setResult(null);
    }
  }, [])

  return (
    <>
      {
        result === null ?
          <form className={styles.container}>
            <div className={styles.formFields}>
              {
                show &&
                  <div className={styles.errorBox}>
                      <Image width={16} height={16} alt="logo" src="/system-danger.svg"/>
                      <span className={styles.errorMessage}>
                    조회된 아이디가 없습니다.
                  </span>
                  </div>
              }

              {
                form.Field({
                  name: 'username',
                  children: (field) => (
                    <InputField
                      type={'text'}
                      placeholder={'이름을 입력해 주세요.'}
                      required={true}
                      field={field}
                      label={'이름'}
                    />
                  ),
                })
              }

              {
                form.Field({
                  name: 'phone',
                  children: (field) => {

                    const rawValue = field.state.value;
                    const formatted = formatPhoneNumber(rawValue);

                    return (
                      <InputField
                        type={'text'}
                        placeholder={'전화번호를 입력해 주세요.'}
                        required={true}
                        value={formatted}
                        onChange={(e) => {
                          const onlyDigits = e.target.value.replace(/\D/g, '');
                          field.handleChange(onlyDigits); // 실제 값은 숫자만 저장
                        }}
                        field={field}
                        label={'전화번호'}
                        help={'예 ) - 없이 이어서 숫자 입력 '}
                        helpPosition={'bottom'}
                      />
                    )
                  },
                })
              }
            </div>

            <div className={styles.actions}>

              <button onClick={handleSubmit} type={'button'} className={styles.submitButton}>조회</button>
              <div className={styles.hint}>
                <span>안내</span>
                <ImageWrapper width={20} height={20} src={'/auth-find.svg'}/>
              </div>
            </div>
          </form>
          :
          <div className={styles.resultBox}>
            <div className={styles.resultMessage}>
              <span className={styles.description}>
                회원님의 철도 혼잡도 관리시스템<br/>
                회원아이디 찾기 결과 입니다.
              </span>

              <span className={styles.email}>
                user001@korail.com
              </span>
            </div>

            <button onClick={handleGoToLogin} type="button" className={styles.loginButton}>
              <span>로그인 페이지로 이동</span>
            </button>
          </div>
      }
    </>
  )
}