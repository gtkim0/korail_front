import {ColumnDef} from "@tanstack/react-table";
import {EmergencyGuideInfoColumnType} from "@/types/emergency-guide-info";

export const emergencyGuideInfoColumns: ColumnDef<EmergencyGuideInfoColumnType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'zone',
    header: '구분',
  },
  {
    accessorKey: 'title',
    header: '제목'
  },
  {
    accessorKey: 'content',
    header: '내용'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자'
  },
]