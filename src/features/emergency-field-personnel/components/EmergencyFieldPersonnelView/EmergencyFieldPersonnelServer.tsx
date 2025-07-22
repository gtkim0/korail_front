import EmergencyFieldPersonnelView from "./EmergencyFieldPersonnelView";

export default async function EmergencyFieldPersonnelServer() {

  const initialFilter = {

  }

  return (
    <EmergencyFieldPersonnelView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}