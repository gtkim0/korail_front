import OperationInfoView from "@/features/operationInfo/components/OperationInfoView/OperationInfoView";

export default async function OperationInfoServer() {

  const initialFilter = {}

  return (
    <OperationInfoView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}