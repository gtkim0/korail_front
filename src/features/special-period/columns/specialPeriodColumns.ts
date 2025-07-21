import {ColumnDef} from "@tanstack/react-table";
import {SpecialPeriodColumnType} from "@/types/special-period";

export const specialPeriodColumns: ColumnDef<SpecialPeriodColumnType> = [
  {
    accessorKey: 'routeName',
    header: '노선명'
  },
  {
    accessorKey: 'stationName',
    header: '역사명'
  },
  {
    accessorKey: 'subject',
    header: '제목'
  },
  {
    accessorKey: 'startTm',
    header: '시작일시'
  },
  {
    accessorKey: 'endTm',
    header: '종료일시'
  },
  {
    accessorKey: 'useYn',
    header: '사용여부'
  },
  {
    accessorKey: 'data',
    header: '데이터 기준일자'
  },
]