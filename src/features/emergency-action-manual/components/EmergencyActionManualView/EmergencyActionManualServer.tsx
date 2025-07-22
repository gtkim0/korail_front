import EmergencyActionManualView from "./EmergencyActionManualView";

export default async function EmergencyActionManualServer() {

  const initialFilter = {
    category: ['1','2','3','4']
  }

  return (
    <EmergencyActionManualView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}