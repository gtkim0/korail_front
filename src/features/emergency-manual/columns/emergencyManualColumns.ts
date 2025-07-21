import {ColumnDef} from "@tanstack/react-table";
import {EmergencyManualColumnType} from "@/types/emergency-manual";

export const emergencyManualColumns: ColumnDef<EmergencyManualColumnType> = [
  {
    accessorKey: 'manualId',
    header: '메뉴얼ID'
  },
  {
    accessorKey: 'stationName',
    header: '상황구분'
  },
  {
    accessorKey: 'zoneType',
    header: '메뉴얼 제목'
  },
  {
    accessorKey: 'zoneName',
    header: '작성자'
  },
  {
    accessorKey: 'broadCastingName',
    header: '관련 연락처'
  },
  {
    accessorKey: 'cctvId',
    header: '사용여부'
  },
  {
    accessorKey: 'data',
    header: '데이터 기준일자'
  },
  {
    accessorKey: 'file',
    header: '파일'
  },
]