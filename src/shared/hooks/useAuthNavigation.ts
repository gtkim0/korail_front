'use client';
import {useRouter, usePathname, useSearchParams} from "next/navigation";

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
      goLogin();
      loggingOut = false;
    }
  }

  return {onUnauthorized, goLogin}
}