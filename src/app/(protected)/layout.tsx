import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthGuard from "@/shared/components/AuthGuard";
import {menuServerApi} from "@/features/menu/api/server/menuServerApi";
import {BaseMenu} from "@/types/menu";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')

  if (!token) {
    redirect('/login');
  }

  return <AuthGuard>{children}</AuthGuard>;
}