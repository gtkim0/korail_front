import TrainStatisticsView from "@/features/train-statistics/components/TrainStatisticsView/TrainStatisticsView";

export default async function TrainStatisticsServer() {

  const initialFilter = {
    date: new Date()
  }

  return (
    <TrainStatisticsView
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}