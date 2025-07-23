import {ColumnDef} from "@tanstack/react-table";

export type EvacuationInfoColumnsType = {
  id: string;
  routeNum: string;
  routeName: string;
  stationNum: string;
  stationName: string;
  image_url: string;
  manual: string;
  date: string
}

export const evacuationInfoColumns: ColumnDef<EvacuationInfoColumnsType>[] = [
  {
    accessorKey: 'routeNum',
    header: '노선번호'
  },
  {
    accessorKey: 'routeName',
    header: '노선명'
  },
  {
    accessorKey: 'stationNum',
    header: '역사번호'
  },
  {
    accessorKey: 'stationName',
    header: '역사명'
  },
  {
    accessorKey: 'image_url',
    header: '대피안내도'
  },
  {
    accessorKey: 'manual',
    header: '비상 대응 메뉴얼'
  },
  {
    accessorKey: 'date',
    header: '데이터기준일자',
  },
]

