import {ColumnDef} from "@tanstack/react-table";
import {InstrumentationColumnType} from "@/types/instrumentation";

export const instrumentationColumns: ColumnDef<InstrumentationColumnType>[] = [
  {
    accessorKey: 'managementNum',
    header: '관리번호'
  },
  {
    accessorKey: 'ip',
    header: 'IP'
  },
  {
    accessorKey: 'programmingNum',
    header: '편성번호'
  },
  {
    accessorKey: 'trainNum',
    header: '차량번호'
  },
  {
    accessorKey: 'retentionPeriod',
    header: '데이터보관기간(일)'
  },
  {
    accessorKey: 'operStatus',
    header: '운영상태'
  },
  {
    accessorKey: 'data',
    header: '데이터 기준일자'
  },
]