import PermissionGroupView from "@/features/permission-group/components/PermissionGroupView/PermissionGroupView";

export default async function PermissionGroupServer () {

  const initialFilter = {}

  return (
    <PermissionGroupView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}