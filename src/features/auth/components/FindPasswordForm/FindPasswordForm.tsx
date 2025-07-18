import styles from "@/features/auth/components/FindUsernameForm/FindUsernameForm.module.scss";
import {InputField} from "@/shared/components/Input/InputField";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useForm} from "@tanstack/react-form";
import {toast} from "react-hot-toast";
import ConfirmModal from "@/shared/components/modal/ConfirmModal/ConfirmModal";
import useModal from "@/shared/hooks/useModal";
import { MODAL_MESSAGES } from "@/shared/contants/modalMessage";
import {ActionButtons} from "@/shared/components/actionButtons/ActionButtons";

export default function FindPasswordForm() {

  const {isOpen , open, close} = useModal();

  const form = useForm({
    defaultValues: {
      username: '',
      name: '',
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

  const handleSubmit = () => {
    open();
  }

  return (
    <>
      <form className={styles.container}>
        <div className={styles.formFields}>
          {
            form.Field({
              name: 'username',
              children: (field) => (
                <InputField
                  type={'text'}
                  placeholder={'회원아이디를 입력해 주세요.'}
                  required={true}
                  field={field}
                  label={'회원아이디'}
                />
              ),
            })
          }
          {
            form.Field({
              name: 'name',
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
        </div>

        <div className={styles.actions}>
          <button onClick={handleSubmit} type={'button'} className={styles.submitButton}>조회</button>
          <div className={styles.hint}>
            <span>안내</span>
            <ImageWrapper width={20} height={20} src={'/auth-find.svg'}/>
          </div>
        </div>
      </form>
      <ConfirmModal
        title={MODAL_MESSAGES.sendEmail.title}
        isOpen={isOpen}
        onCloseAction={close}
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
        {MODAL_MESSAGES.sendEmail.message}
      </ConfirmModal>
    </>
  )
}