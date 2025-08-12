import CongestionEquipStatusView
  from "@/features/congestion-equip-status/components/CongestionEquipStatusView/CongestionEquipStatusView";

export default async function CongestionEquipStatusServer() {

  const initialFilter = {}

  return (
    <CongestionEquipStatusView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}