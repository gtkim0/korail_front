import {ColumnDef} from "@tanstack/react-table";

export type StationInfoColumnsType = {
  // id: string,
  // stationNum: string;
  // stationName: string;
  // routeNumber: string;
  // routeName: string;
  // stationTransfer: string;
  // transferRouteNumber: string;
  // transferRouteName: string;
  // lon: string;
  // lat: string;
  // date: string;
  id: string;
  title: string;
  content: string;
  userId: string;
  status: string;
  image_url: string;
}

export const stationInfoColumns: ColumnDef<StationInfoColumnsType>[] = [
  // {
  //   accessorKey: 'stationNum',
  //   header: '역번호',
  // },
  // {
  //   accessorKey: 'stationName',
  //   header: '역사명',
  // },
  // {
  //   accessorKey: 'routeNumber',
  //   header: '노선번호',
  // },
  // {
  //   accessorKey: 'routeName',
  //   header: '노선명',
  // },
  // {
  //   accessorKey: 'stationTransfer',
  //   header: '환승역구분',
  // },
  // {
  //   accessorKey: 'transferRouteNumber',
  //   header: '환승노선번호',
  // },
  // {
  //   accessorKey: 'transferRouteName',
  //   header: '환승노선명',
  // },
  // {
  //   accessorKey: 'lon',
  //   header: '역경도',
  // },
  // {
  //   accessorKey: 'lat',
  //   header: '역위도',
  // },
  // {
  //   accessorKey: 'date',
  //   header: '데이터기준일자',
  // },

  {
    accessorKey: 'title',
    header: '제목'
  },
  {
    accessorKey: 'content',
    header: '본문'
  },
  {
    accessorKey: 'userId',
    header: '작성자'
  },
  {
    accessorKey: 'status',
    header: '상태'
  },
  {
    accessorKey: 'image_url',
    header: '이미지'
  },
]