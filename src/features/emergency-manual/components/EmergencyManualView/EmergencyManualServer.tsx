import EmergencyManualView from "@/features/emergency-manual/components/EmergencyManualView/EmergencyManualView";


export default async function EmergencyManualServer() {

  const initialFilter = {}

  return (
    <EmergencyManualView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}