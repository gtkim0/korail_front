import CongestionStepView from "@/features/congestionStep/components/congestionStepView/page";

export default function CongestionStepServer() {

  const initialFilter = {}

  return (
    <CongestionStepView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}