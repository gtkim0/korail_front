'use client';
import { useAuth } from "@/shared/hooks/useAuth";
import {ReactNode, useEffect} from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard ({ children } : {children: ReactNode}) {

  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/auth/login');
    }
  }, [loading, isLoggedIn]);

  if (loading) return null;

  return <>{ children }</>
}