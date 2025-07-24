import {ColumnDef} from "@tanstack/react-table";
import {CongestionVerificationCompleteColumnType} from "@/types/congestion-verification-complete";

export const congestionVerificationCompleteColumns: ColumnDef<CongestionVerificationCompleteColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'division',
    header: '구분'
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
  {
    accessorKey: 'numOfPeople',
    header: '결과인원'
  },
  {
    accessorKey: 'accuracy',
    header: '정확도'
  },
  {
    accessorKey: 'verificationDate',
    header: '검증일시'
  },
]