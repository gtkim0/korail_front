'use client';
import styles from "./page.module.css";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('token'); // 예시: 토큰으로 로그인 체크
}

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, []);

  return (
    <div className={styles.page}>

    </div>
  );
}
