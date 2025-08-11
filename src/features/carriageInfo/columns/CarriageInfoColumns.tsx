import {ColumnDef} from "@tanstack/react-table";
import {CarriageInfoColumnsType} from "@/types/carriage-info";

export const CarriageInfoColumns: ColumnDef<CarriageInfoColumnsType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'trainNum',
    header: '차량번호',
  },
  {
    accessorKey: 'trainType',
    header: '차량종류',
  },
  {
    accessorKey: 'passengerNum',
    header: '승차인원',
  },
  {
    accessorKey: 'floorArea',
    header: '바닥면적',
  },
  {
    accessorKey: 'cctv1',
    header: 'CCTV1 ',
  },
  {
    accessorKey: 'cctv2',
    header: 'CCTV2',
  },
  {
    accessorKey: 'introductionDate',
    header: '도입일자',
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자',
  },
];