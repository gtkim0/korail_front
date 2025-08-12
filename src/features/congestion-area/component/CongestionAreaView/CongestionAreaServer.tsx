import CongestionAreaView from "@/features/congestion-area/component/CongestionAreaView/CongestionAreaView";
import {generateColumn} from "@/shared/utils/generateColumn";
import {serverGet} from "@/shared/api/serverFetcher";

export default async function CongestionAreaServer() {

  const data = [
    {
      data1: {header: '구역1', data: 30},
      data2: {header: '구역2', data: 50},
      data3: {header: '구역3', data: 10}
    }
  ]

  const columns = generateColumn({data})

  // 여기서 광역/간선 , 노선, 열차/역사 에 대한 api 를 받아와서 option 을 미리 넘기는방향으로 생각

  // const or = await serverGet('/'); // 광역 간석
  // const route = await serverGet('/'); // 노선
  // const trainOrStation = await serverGet('/'); //열차/역사

  // const filterOptions = {
  //   category: or,
  //   route: route,
  //   train: trainOrStation
  // };

  /**
   * 자 여기서 filterOptions 를 DynamicFilterRenderer 까지 넘겨서, optionsMap 에 key 값 매핑해서 옵션값만
   * 넣어주기.  그럼 filterSchema 에서는 받아오는 options 는 [] 로 비워놓거나 , options key값 빼놓기?
   */
  const initialFilter = {}

  return (
    <CongestionAreaView
      columns={columns}
      initialFilter={initialFilter}
      initialData={[]}
    />
  )
}