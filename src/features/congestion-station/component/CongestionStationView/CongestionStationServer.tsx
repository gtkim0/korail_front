import CongestionStationView from "@/features/congestion-station/component/CongestionStationView/CongestionStationView";
import {generateColumn} from "@/shared/utils/generateColumn";

export default async function CongestionStationServer() {

  const initialFilter = {
    periodType: 'D'
  }

  const data = [
    {
      data1: {header: '구역1', data: 30},
      data2: {header: '구역2', data: 50},
      data3: {header: '구역3', data: 10}
    }
  ]

  const columns = generateColumn({data})

  return (
    <CongestionStationView
      columns={columns}
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}