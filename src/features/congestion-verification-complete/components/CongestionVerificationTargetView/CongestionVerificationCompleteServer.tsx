import CongestionVerificationCompleteView
  from "@/features/congestion-verification-complete/components/CongestionVerificationTargetView/CongestionVerificationCompleteView";

export default async function CongestionVerificationCompleteServer () {

  const initialFilter = {}

  return (
    <CongestionVerificationCompleteView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}