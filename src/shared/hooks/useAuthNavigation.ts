'use client';
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {toast} from "react-hot-toast";

let loggingOut = false;

export function useAuthNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const next = encodeURIComponent(
    pathname + (search?.toString() ? `${search}` : "")
  )

  const goLogin = () => {
    if (pathname.startsWith('/auth/login')) {
      router.replace('/auth/login')
    } else {
      router.replace(`/auth/login?next=${next}`)
    }
  }

  const onUnauthorized = async () => {
    if (loggingOut) return;
    loggingOut = true;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch {

    } finally {
      toast.error('로그인 세션시간이 만료되었습니다.')
      goLogin();
      loggingOut = false;
    }
  }

  return {onUnauthorized, goLogin}
}