 'use client';
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function ResetPassword () {
  //ex) https://webDomain/reser-password?token=123123123123123123
  // const [ isValid, setIsValid ] = useState<boolean | null>(null);
  // const token = useSearchParams().get('token');
  //
  // useEffect(()=> {
  //
  //   if(!token) {
  //     setIsValid(false);
  //     return ;
  //   }
  //
  //   fetch(`spring?token=${token}`)
  //     .then((res)=> {
  //       setIsValid(res.ok)
  //     })
  //     .catch(()=> setIsValid(false));
  // },[token])
  //
  // if(isValid === null) return <>검증 대기중.. </>
  // if(!isValid) return <p>만료된 링크</p>

  const token = 'test'

  return (
    <>
      <h1>비밀번호 재설정 페이지</h1>
      <PasswordResetForm token={token}/>
    </>
  )
}

const PasswordResetForm = ({token}: { token: string | null }) => {

  // 여기까지 token 넘기게.

  const router = useRouter();

  const handleSubmit = () => {

    router.push('/dashboard')
  }

  return (
    <>
      <button onClick={handleSubmit}>비밀번호 재설정 완료</button>
    </>
  )
}