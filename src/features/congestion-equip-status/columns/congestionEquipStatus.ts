import {ColumnDef} from "@tanstack/react-table";
import {CongestionEquipStatusColumnType} from "@/types/congestion-equip-status";

export const congestionEquipStatusColumns: ColumnDef<CongestionEquipStatusColumnType>[] = [
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
    accessorKey: 'cctvConnectStatus',
    header: 'CCTV 연결 상태'
  },
  {
    accessorKey: 'serverComStatus',
    header: '서버통신 상태'
  },
  {
    accessorKey: 'analysisModuleStatus',
    header: '분석모듈 상태'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자'
  },
]