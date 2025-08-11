import {ColumnDef} from "@tanstack/react-table";
import {Menu} from "@/features/menu/columns/menuColumns";

export type ProgrammingInfoColumnsType = {
  id: string;
  routeType: string;
  routeNum: string;
  orgNum: string;
  routeName: string;
  trainCnt: string;
  date: string;
}

export const ProgrammingInfoColumns: ColumnDef<ProgrammingInfoColumnsType>[] = [
  {
    accessorKey: 'routeType',
    header: '구분',
  },
  {
    accessorKey: 'routeNum',
    header: '노선번호',
  },
  {
    accessorKey: 'routeName',
    header: '노선명',
  },
  {
    accessorKey: 'orgNum',
    header: '편성번호',
  },
  {
    accessorKey: 'trainCnt',
    header: '차량수',
  },
  {
    accessorKey: 'trainNum',
    header: '차량번호 ',
  },
  {
    accessorKey: 'date',
    header: '데이터기준일자',
  },
];

export type ProgrammingInfoAddFormType = {
  routeType: string;
  routeNum: string;
  orgNum: string;
  routeName: string;
  trainCnt: string;
}