import ZoneInfoView from "@/features/zone-info/components/ZoneInfoView/ZoneInfoView";

export default async function ZoneInfoServer() {

  const initialFilter = {}

  return (
    <ZoneInfoView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}