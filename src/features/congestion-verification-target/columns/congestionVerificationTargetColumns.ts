import {ColumnDef} from "@tanstack/react-table";
import {CongestionVerificationTargetColumnType} from "@/types/congestion-verification-target";

export const congestionVerificationTargetColumns: ColumnDef<CongestionVerificationTargetColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'routeNm',
    header: '노선명'
  },
  {
    accessorKey: 'trainNum',
    header: '열차번호'
  },
  {
    accessorKey: 'startStationNm',
    header: '출발역'
  },
  {
    accessorKey: 'endStationNm',
    header: '도착역'
  },
  {
    accessorKey: 'vehicleNum',
    header: '차량번호'
  },
  {
    accessorKey: 'numOfPassenger',
    header: '탑승인원'
  },
  {
    accessorKey: 'congestion',
    header: '혼잡도'
  },
  {
    accessorKey: 'measureDate',
    header: '측정 일시'
  },
]