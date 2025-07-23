import {ColumnDef} from "@tanstack/react-table";
import {EmergencyBroadcastControlColumnType} from "@/types/emergency-broadcast-control";
import Image from "next/image";

export const emergencyBroadcastControlColumns: ColumnDef<EmergencyBroadcastControlColumnType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'broadcastRuleNm',
    header: '방송규칙명'
  },
  {
    accessorKey: 'congestion',
    header: '혼잡도'
  },
  {
    accessorKey: 'targetRoute',
    header: '대상노선'
  },
  {
    accessorKey: 'targetStation',
    header: '대상역사'
  },
  {
    accessorKey: 'targetZone',
    header: '대상구역'
  },
  {
    accessorKey: 'numOfBroadCast',
    header: '방송횟수'
  },
  {
    accessorKey: 'announcement',
    header: '안내방송'
  },
  {
    accessorKey: 'autoBroadcast',
    header: '자동발송'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자'
  },
  {
    accessorKey: '',
    header: '데이터 기준 일자',
    cell: info => {
      return (
        <button>내보내기</button>
      )
    }
  },
]