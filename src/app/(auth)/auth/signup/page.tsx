'use client';
import {useForm} from "@tanstack/react-form";
import FormFieldWrapper from "@/shared/components/formFieldWrapper/FormFieldWrapper";
import DropDown from "@/shared/components/dropDown/DropDown";
import SearchModalTrigger from "@/shared/components/searchModalTrigger/searchModalTrigger";
import {useRouter} from "next/navigation";
import styles from './signup.module.scss'
import AuthContainer from "@/features/auth/components/AuthContainer/AuthContainer";
import {z} from 'zod';
import {InputField} from "@/shared/components/Input/InputField";
import {formatPhoneNumber} from "@/utils/formatPhoneNumber";
import ConfirmModal from "@/shared/components/modal/ConfirmModal/ConfirmModal";
import useModal from "@/shared/hooks/useModal";
import {MODAL_MESSAGES} from "@/shared/contants/modalMessage";
import {ActionButtons} from "@/shared/components/actionButtons/ActionButtons";
import FormSubmitButton from "@/shared/components/form/FormSubmitButton/FormSubmitButton";

const SignUpSchema = z.object({
  email: z.string().min(3, '이메일을 입력해주세요.'),
  password: z
    .string()
    .min(10, '비밀번호는 최소 10자리여야 합니다.')
    .regex(/^(?=.*[a-zA-Z])(?=.*[0-9!@#$%^&*])/, '영문 + 숫자/특수문자 조합 필수'),
  confirmPassword: z.string(),
  name: z.string().min(1, '이름을 입력해주세요'),
  org: z.string().min(1, '소속을 입력해주세요'),
  position: z.string().min(1, '직급을 입력해주세요'),
  phone: z.string().min(10, '휴대폰 번호를 입력해주세요'),
  verificationCode: z.string().min(1, '인증번호를 입력해주세요'),
}).refine(data => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

export default function SignUp() {

  const {isOpen: mailIsOpen, open: mailOpen, close: mailClose} = useModal();
  const {isOpen: signUpIsOpen, open: signUpOpen, close: signUpClose} = useModal();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      org: '',
      position: '',
      phone: '',
      verificationCode: '',
    },
    validators: {
      onSubmit: SignUpSchema,
      onChange: SignUpSchema
    },
    onSubmit: async ({value}) => {
      console.log("✅ 제출 값:", value);
      // TODO: API 요청 등 처리

      signUpOpen()
    },
  });

  const handleSubmitCode = () => {
    mailOpen();
  }

  const handleSuccessSignup = () => {
    signUpClose();
    router.push('/auth/login');
  }

  return (

    <AuthContainer title="회원가입">
      <form
        className={styles.formSection}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className={styles.formGroup}>
          {/* 이메일 */}
          {form.Field({
            name: 'email',
            children: (field) => (
              <FormFieldWrapper label="아이디(이메일)" required>
                <div className={styles.inputRow}>
                  <input
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    className={styles.input}
                    placeholder="이메일 주소를 입력해 주세요."
                  />
                  <span className={styles.atSymbol}>@</span>
                  <div className={styles.dropdownWrapper}>
                    <DropDown
                      options={[{key: '1', label: 'korail.com'}]}
                      onSelect={() => {
                      }}
                    />
                  </div>
                  <button onClick={handleSubmitCode} className={styles.sendButton} type="button">인증번호 전송</button>
                </div>
                {field.state.meta.isTouched && field.state.meta.errors?.[0] && (
                  <p className={styles.error}>{field.state.meta.errors?.[0]?.message}</p>
                )}
              </FormFieldWrapper>
            )
          })}

          {form.Field({
            name: 'verificationCode',
            children: (field) => (
              <div className={styles.formItem}>
                <div className={styles.inputRow}>
                  <InputField
                    field={field}
                    label=""
                    placeholder="인증번호 입력"
                  />
                  <button className={styles.sendButton} type="button">
                    인증번호 확인
                  </button>
                </div>
                {/*{field.state.meta.isTouched && field.state.meta.errors?.[0] && (*/}
                {/*  <p className={styles.error}>{field.state.meta.errors?.[0]?.message}</p>*/}
                {/*)}*/}
                {/*<span className={styles.emailHint}>*/}
                {/*  이메일 확인 후 받은 인증번호를 입력해 주세요.*/}
                {/*</span>*/}
              </div>
            )
          })}

          {/* 비밀번호 + 확인 */}
          <div className={styles.row}>
            {form.Field({
              name: 'password',
              children: (field) => (
                <div className={styles.flex1}>
                  <InputField
                    field={field}
                    label="비밀번호"
                    required
                    type="password"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="비밀번호를 입력해 주세요."
                    help="영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상"
                    helpPosition="bottom"
                  />
                </div>
              )
            })}

            {form.Field({
              name: 'confirmPassword',
              children: (field) => (
                <div className={styles.flex1}>
                  <InputField
                    field={field}
                    label="비밀번호 확인"
                    required
                    type="password"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="비밀번호를 한번 더 입력해 주세요."
                  />
                </div>
              )
            })}
          </div>

          <div className={styles.row}>
            {form.Field({
              name: 'name',
              children: (field) => (
                <div className={styles.flex1}>
                  <InputField
                    field={field}
                    label="이름"
                    required
                    type="text"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="이름을 입력해 주세요."
                  />
                </div>
              )
            })}
            {form.Field({
              name: 'org',
              children: (field) => (
                <div className={styles.flex1}>
                  <InputField
                    field={field}
                    label="소속"
                    required
                    type="text"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="소속을 입력해 주세요."
                    help={'예 ) 역운영처, 광역운영처, 차량계획처, 수송운영처 ...'}
                    helpPosition="bottom"
                  />
                </div>
              )
            })}
          </div>

          {/* 직급 + 휴대폰 */}
          <div className={styles.row}>
            {form.Field({
              name: 'position',
              children: (field) => (
                <div className={styles.flex1}>
                  <InputField
                    field={field}
                    label="직급"
                    required
                    type="text"
                    value={field.state.value}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="직급을 입력해 주세요."
                    help={'예 ) 사원, 대리, 과장, 차장, 부장 ...'}
                    helpPosition="bottom"
                  />
                </div>
              )
            })}
            {form.Field({
              name: 'phone',
              children: (field) => {
                const rawValue = field.state.value;
                const formatted = formatPhoneNumber(rawValue);

                return (
                  <div className={styles.flex1}>
                    <InputField
                      field={field}
                      label="휴대폰"
                      required
                      type="text"
                      value={formatted}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, '');
                        field.handleChange(onlyDigits); // 실제 값은 숫자만 저장
                      }}
                      placeholder="휴대폰 번호를 입력해 주세요."
                      help="예 ) - 없이 이어서 숫자 입력"
                      helpPosition="bottom"
                    />
                  </div>
                );
              },
            })}
          </div>

          {/* 관심노선/역사 */}
          <FormFieldWrapper label="관심노선">
            <SearchModalTrigger
              columns={[]}
              value=""
              onSelect={() => {}}
              endPoint="/"
              isOpen={false}
              onOpen={()=> {}}
              onClose={()=> {}}
            />
          </FormFieldWrapper>
          <FormFieldWrapper label="관심역사">
            <SearchModalTrigger
              columns={[]}
              value=""
              onSelect={() => {}}
              endPoint="/"
              isOpen={false}
              onOpen={()=> {}}
              onClose={()=> {}}
            />
          </FormFieldWrapper>
        </div>

        {/* 하단 버튼 */}
        <div className={styles.footerButtons}>
          <div style={{flex: 1}}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => router.push('/auth/login')}
            >
              취소
            </button>
          </div>
          <div style={{flex: 1}}>
            <FormSubmitButton form={form}>
              확인
            </FormSubmitButton>
          </div>
        </div>
      </form>

      <ConfirmModal
        isOpen={mailIsOpen}
        onCloseAction={mailClose}
        title={MODAL_MESSAGES.showVerificationSentModal.title}
        actionButtons={
          <ActionButtons
            buttons={[
              {
                label: '확인',
                onClick: close,
                variant: 'primary',
                disabled: false,
              },
            ]}
          />
        }
      >
        {MODAL_MESSAGES.showVerificationSentModal.message}
      </ConfirmModal>

      <ConfirmModal
        isOpen={signUpIsOpen}
        onCloseAction={signUpClose}
        title={MODAL_MESSAGES.successSignup.title}
        actionButtons={
          <ActionButtons
            buttons={[
              {
                label: '확인',
                onClick: handleSuccessSignup,
                variant: 'primary',
                disabled: false,
              },
            ]}
          />
        }
      >
        {MODAL_MESSAGES.successSignup.message}
      </ConfirmModal>
    </AuthContainer>
  )
}

// <ConfirmModal
//   title={MODAL_MESSAGES.sendEmail.title}
//   isOpen={isOpen}
//   onCloseAction={close}
//   actionButtons={
//     <ActionButtons
//       buttons={[
//         {
//           label: '확인',
//           onClick: close,
//           variant: 'primary',
//           disabled: false,
//         },
//       ]}
//     />
//   }
// >
//   {MODAL_MESSAGES.sendEmail.message}
// </ConfirmModal>