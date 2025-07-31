export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {

  // const cookieStore = await cookies();
  //
  // const token = cookieStore.get('access_token')
  //
  // if (!token) {
  //   redirect('/auth/login');
  // }

  // return <AuthGuard>{children}</AuthGuard>;
  return <>{children}</>;
}