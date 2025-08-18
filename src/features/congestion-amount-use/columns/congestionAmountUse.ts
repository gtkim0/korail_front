import {ColumnDef} from "@tanstack/react-table";
import {CongestionAmountUseColumnType} from "@/types/congestion-amount-use";

export const congestionAmountUseColumns: ColumnDef<CongestionAmountUseColumnType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'lineNum',
    header: '호선'
  },
  {
    accessorKey: 'deviceId',
    header: '장치 ID'
  },
  {
    accessorKey: 'installArea',
    header: '설치장소'
  },
  {
    accessorKey: 'cpu',
    header: '평균 CPU 사용률(%)'
  },
  {
    accessorKey: 'memory',
    header: '평균 메모리 사용률(MB)'
  },
  {
    accessorKey: 'data',
    header: '평균 DATA 전송률(Mbps)'
  },
  {
    accessorKey: 'time',
    header: '가동시간 (시간)'
  },
]