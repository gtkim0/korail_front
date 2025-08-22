import MemberManagementView from "@/features/member-management/components/MemberManagementView/MemberManagementView";

export default async function MemberManagementServer() {

  const initialFilter = {}

  return (
    <MemberManagementView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}