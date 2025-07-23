import {ColumnDef} from "@tanstack/react-table";
import {NotificationPushColumnType} from "@/types/notification-push";

export const notificationPushColumns: ColumnDef<NotificationPushColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'status',
    header: '상태'
  },
  {
    accessorKey: 'channelName',
    header: '채널명'
  },
  {
    accessorKey: 'channelType',
    header: '채널타입'
  },
  {
    accessorKey: 'method',
    header: '메소드'
  },
  {
    accessorKey: 'uri',
    header: 'URI'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자'
  },
]