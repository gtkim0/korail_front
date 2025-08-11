import CarriageInfoView from "@/features/carriageInfo/components/CarriageInfoView/CarriageInfoView";

export default async function CarriageInfoServer() {

  const initialFilter = {}

  return (
    <CarriageInfoView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}