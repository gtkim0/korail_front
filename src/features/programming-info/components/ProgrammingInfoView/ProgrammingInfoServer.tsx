import ProgrammingInfoView from "@/features/programming-info/components/ProgrammingInfoView/ProgrammingInfoView";
import {serverGet} from "@/shared/api/serverFetcher";
import {programmingApi} from "@/features/programming-info/api/client/programmingApi";
import {programmingServerApi} from "@/features/programming-info/api/server/programmingServerApi";

export default async function ProgrammingInfoServer() {

  const initialFilter = {
    category: ['1', '2', '3', '4'],
    type: '',
    range1: {
      startDate: new Date(),
      endDate: new Date()
    }
  }

  // const routeInfo = await serverGet('/menus?sort=id&order=asc&page=0&size=10&category=1%2C2%2C3%2C4')

  const routeInfo1 = await programmingServerApi.get('/menus?sort=id&order=asc&page=0&size=10&category=1%2C2%2C3%2C4', {})

  const routeInfo = [
    {
      key: '1',
      label: '1호선'
    },
    {
      key: '2',
      label: '2호선'
    },
    {
      key: '3',
      label: '3호선'
    },
  ]

  return (
    <ProgrammingInfoView
      initialFilter={initialFilter}
      initialData={[]}
      routeInfo={routeInfo}
    />
  )
}