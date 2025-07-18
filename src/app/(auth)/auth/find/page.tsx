import FindAccountForm from "@/features/auth/components/FindAccountForm/FindAccountForm";
import AuthContainer from "@/features/auth/components/AuthContainer/AuthContainer";

export default function AccountFind() {
  return (
    <AuthContainer title={'아이디/비밀번호 찾기'}>
      <div
        style={{
          display: 'flex',
          width: '76rem',
          padding: '4.8rem 3.2rem 0 3.2rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.6rem'
        }}
      >
        <FindAccountForm />
      </div>
    </AuthContainer>
  )
}
