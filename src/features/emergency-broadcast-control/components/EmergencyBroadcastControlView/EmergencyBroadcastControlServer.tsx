import EmergencyBroadcastControlView
  from "@/features/emergency-broadcast-control/components/EmergencyBroadcastControlView/EmergencyBroadcastControlView";

export default async function EmergencyBroadcastControlServer() {

  const initialFilter = {}

  return (
    <EmergencyBroadcastControlView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}