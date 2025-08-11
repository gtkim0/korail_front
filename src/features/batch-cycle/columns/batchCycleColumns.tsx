import {ColumnDef} from "@tanstack/react-table";
import {CongestionStep} from "@/features/congestionStep/columns/CongestionStepColumns";

type BatchCycleColumns = {
  code: string;
  tableName: string;
  des: string;
  type: string;
  cycleVal: string;
  cycleUnit: string;
  time: string;
  timeUnit: string;
  day: string;
  recount: string;
  minute: string;
  lastUpDt: string;
}

export const dummyBatchCycleData = [
  {
    code: 1,
    tableName: 'menu',
    des: '운행정보',
    type: '일정간격',
    cycleVal: '10',
    cycleUnit: 'week',
    time: '04:00:00',
    timeUnit: 'weekly',
    day: 'Mon, Wed',
    recount: '3',
    minute: '3',
    lastUpDt: '2025-04-12 11:00:00'

  }
]

export const batchCycleColumns: ColumnDef<BatchCycleColumns>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'tableName',
    header: '테이블명',
  },
  {
    accessorKey: 'des',
    header: '설명',
  },
  {
    accessorKey: 'type',
    header: '방식',
  },
  {
    accessorKey: 'lastUpDt',
    header: '최근 업데이트 시각',
  },
  {
    accessorKey: 'nextUpDt',
    header: '다음예정시각',
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자',
  }
];