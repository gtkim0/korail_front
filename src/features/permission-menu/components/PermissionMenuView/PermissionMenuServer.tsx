import PermissionMenuView from "@/features/permission-menu/components/PermissionMenuView/PermissionMenuView";

export default async function PermissionMenuServer() {

  const initialFilter = {}

  return (
    <PermissionMenuView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}