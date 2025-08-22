import {cookies} from 'next/headers';
import {redirect} from "next/navigation";
import AuthGuard from "@/shared/components/AuthGuard";
import logger from "@/lib/logger";

export default async function ProtectedLayout({children}: { children: React.ReactNode }) {

  // const cookieStore = await cookies();
  // const token = cookieStore.get('accessToken')
  //
  // if (!token) {
  //   redirect('/auth/login');
  // }

  // return <AuthGuard>{children}</AuthGuard>;
  return <>{children}</>;
}