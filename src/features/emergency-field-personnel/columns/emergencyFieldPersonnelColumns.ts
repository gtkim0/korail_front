import {ColumnDef} from "@tanstack/react-table";
import {EmergencyActionManualColumnType} from "@/types/emergency-action-manual";
import {EmergencyFieldPersonnelColumnType} from "@/types/emergency-field-personnel";

export const emergencyFieldPersonnelColumns: ColumnDef<EmergencyFieldPersonnelColumnType> = [
  {
    accessorKey: 'workingDate',
    header: '근무일자'
  },
  {
    accessorKey: 'dayAndNight',
    header: '주야'
  },
  {
    accessorKey: 'shiftTm',
    header: '교대시간'
  },
  {
    accessorKey: 'routeNm',
    header: '노선명'
  },
  {
    accessorKey: 'stationNm',
    header: '역사명'
  },
  {
    accessorKey: 'worker',
    header: '근무자'
  },
  {
    accessorKey: 'position',
    header: '직책'
  },
  {
    accessorKey: 'emergencyPhone',
    header: '비상연락망'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자'
  },
]