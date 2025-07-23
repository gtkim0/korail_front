import {ColumnDef} from "@tanstack/react-table";
import {NotificationTextColumnType} from "@/types/notification-text";

export const notificationTextColumns: ColumnDef<NotificationTextColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'division',
    header: '구분'
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
    header: '데이터 기준일자'
  },
]