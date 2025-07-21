import {ColumnDef} from "@tanstack/react-table";
import {SaveConditionImageColumnType} from "@/types/save-condition-image";

export const saveConditionColumns: ColumnDef<SaveConditionImageColumnType> = [
  {
    accessorKey: 'use',
    header: '용도'
  },
  {
    accessorKey: 'startDate',
    header: '시작일'
  },
  {
    accessorKey: 'endDate',
    header: '종료일'
  },
  {
    accessorKey: 'startTm',
    header: '시작시간'
  },
  {
    accessorKey: 'endTm',
    header: '종료시간'
  },
  {
    accessorKey: 'congestionStep',
    header: '혼잡도 단계'
  },
  {
    accessorKey: 'useYn',
    header: '사용유무'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자'
  },
]