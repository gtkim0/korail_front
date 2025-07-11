'use client';
import {useRouter} from 'next/navigation';
import {ChangeEvent, useCallback, useEffect, useState} from 'react';
import { toast } from 'react-hot-toast'

export default function LoginPage() {

  const router = useRouter();

  const [ form ,setForm ] = useState({
    username: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include', // 쿠키를 클라이언트에 저장
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.text();
        toast.error(`로그인 실패: ${error}`);
        return;
      }

      router.replace('/');
    } catch (err) {
      toast.error('서버 오류: 로그인 요청 실패');
      console.error(err);
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev=> ({
      ...prev,
      [name]: value
    }))
  },[setForm])

  return (
    <div style={{height:'100vh',width:'100%',padding:'40rem',justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',gap:'2rem'}}>
      <h1>Login</h1>

      <div style={{display:'flex', gap:'1rem', fontSize:'1.5rem',alignItems:'center'}}>
        <label>아이디</label>
        <input style={{height:'4rem',border:'1px solid #ddd'}} name={'username'}  onChange={handleChange}/>
      </div>
      <div style={{display:'flex', gap:'1rem', fontSize:'1.5rem',alignItems:'center'}}>
        <label>패스워드</label>
        <input style={{height:'4rem',border:'1px solid #ddd'}} name={'password'}  onChange={handleChange}/>
      </div>

      <button style={{padding:'1rem 2rem', border:'1px solid #fff'}} onClick={handleLogin}>로그인</button>
    </div>
  );
}