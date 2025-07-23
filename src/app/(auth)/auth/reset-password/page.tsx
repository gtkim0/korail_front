import AuthContainer from "@/features/auth/components/AuthContainer/AuthContainer";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: { token?: string };
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-reset-token?token=${token}`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!res.ok) return false;

    const data = await res.json();
    return data.valid === true; // 백엔드 응답 구조에 따라 조정
  } catch (e) {
    console.error('Token 검증 실패', e);
    return false;
  }
}

export default async function ResetPassword({ searchParams }: { searchParams: Promise<any> }) {

  const { token } = await searchParams;

  if (!token) {
    return (
      <AuthContainer title="유효하지 않은 접근입니다.">
        <span
          style={{
            fontSize:'3rem'
          }}
        >
          비밀번호 변경 링크가 잘못되었습니다.
        </span>
      </AuthContainer>
    );
  }

  // const isValid = await verifyToken(token);
  //
  // if (!isValid) {
  //   return (
  //     <AuthContainer title="링크가 만료되었습니다.">
  //       <p>해당 비밀번호 재설정 링크는 더 이상 유효하지 않습니다.</p>
  //     </AuthContainer>
  //   );
  // }

  // const { token } = params;
  // @TODO token 다시 서버로 요청, 정상 token 인지 확인후 form 을 보여줄지 만료된 링크 보여줄지 판단.

  return (
    <>
      <AuthContainer title={'비밀번호 변경'}>
        <ResetPasswordForm />
      </AuthContainer>
    </>
  )
}