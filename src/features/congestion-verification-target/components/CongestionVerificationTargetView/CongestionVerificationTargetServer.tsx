import CongestionVerificationTargetView
  from "@/features/congestion-verification-target/components/CongestionVerificationTargetView/CongestionVerificationTargetView";

export default async function CongestionVerificationTargetServer() {

  //@TODO hydrate 로할까. 그냥 initialData 로 넘길까는 고민

  return (
    <CongestionVerificationTargetView
      initialFilter={{}}
      initialData={[]}
    />
  )
}

