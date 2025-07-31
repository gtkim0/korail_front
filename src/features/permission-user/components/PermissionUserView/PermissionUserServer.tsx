import PermissionUserView from "@/features/permission-user/components/PermissionUserView/PermissionUserView";

export default async function PermissionUserServer () {

  const initialFilter = {}

  return (
    <PermissionUserView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}