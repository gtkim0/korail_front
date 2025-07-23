import {ColumnDef} from "@tanstack/react-table";
import {NotificationPushColumnType} from "@/types/notification-push";

export const notificationLogColumns: ColumnDef<NotificationPushColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'reservationNm',
    header: '알림예약명'
  },
  {
    accessorKey: 'sendTm',
    header: '전송시각'
  },
  {
    accessorKey: 'channelNm',
    header: '채널명'
  },
  {
    accessorKey: 'notificationGrp',
    header: '알림그룹'
  },
  {
    accessorKey: 'notificationText',
    header: '알림문구'
  },
  {
    accessorKey: 'status',
    header: '상태'
  },
]