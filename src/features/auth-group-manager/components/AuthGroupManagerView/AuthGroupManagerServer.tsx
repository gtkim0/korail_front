import AuthGroupManagerView from "@/features/auth-group-manager/components/AuthGroupManagerView/AuthGroupManagerView";

export default async function AuthGroupManagerServer() {

  const initialFilter = {}

  return (
    <AuthGroupManagerView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}