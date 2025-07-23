import {ColumnDef} from "@tanstack/react-table";
import {EmergencyManualColumnType} from "@/types/emergency-manual";

export const emergencyManualColumns: ColumnDef<EmergencyManualColumnType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'manualId',
    header: '메뉴얼ID',
  },
  {
    accessorKey: 'situationClassification',
    header: '상황구분'
  },
  {
    accessorKey: 'manualTitle',
    header: '메뉴얼 제목'
  },
  {
    accessorKey: 'writer',
    header: '작성자'
  },
  {
    accessorKey: 'phone',
    header: '관련 연락처'
  },
  {
    accessorKey: 'useYn',
    header: '사용여부'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자'
  },
  {
    accessorKey: 'file',
    header: '파일'
  },
]