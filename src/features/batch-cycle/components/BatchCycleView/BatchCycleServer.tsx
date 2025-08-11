import BatchCycleView from "@/features/batch-cycle/components/BatchCycleView/BatchCycleView";

export default async function BatchCycleServer() {

  const initialFilter = {}

  return (
    <BatchCycleView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}