import CongestionAmountUseView
  from "@/features/congestion-amount-use/components/CongestionAmountUseView/CongestionAmountUseView";

export default async function CongestionAmountUseServer() {

  const initialFilter = {}

  return (
    <CongestionAmountUseView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}