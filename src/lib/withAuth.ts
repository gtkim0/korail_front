"use server";

import {redirect} from "next/navigation";
import {isUnauthorized} from "@/lib/errors";

/**
 * 서버에서 어떤 비동기 작업이든 실행하고, 401이면 공통 처리(로그아웃→로그인 리다이렉트).
 * @param task 실행할 비동기 함수(예: () => serverGet<T>(url, params))
 * @param opts.returnTo 로그인 후 돌아올 경로 (없으면 쿼리 안 붙임)
 * @param opts.loginPath 로그인 페이지 경로 (기본: /auth/login)
 * @param opts.logout 호출 여부 (기본: true)
 */
export async function withAuth<T>(
  task: () => Promise<T>,
  opts?: { returnTo?: string; loginPath?: string; logout?: boolean }
): Promise<T> {
  try {
    return await task();
  } catch (e) {
    if (isUnauthorized(e)) {
      const logout = opts?.logout ?? true;
      if (logout) {
        await fetch("/api/logout", {method: "POST"});
        // await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/logout`, {
        //   method: 'POST',
        //   credentials: 'include'
        // })
      }
      const login = opts?.loginPath ?? "/auth/login";
      const qs = opts?.returnTo ? `?redirect=${encodeURIComponent(opts.returnTo)}` : "";
      redirect(`${login}${qs}`);
    }
    throw e;
  }
}