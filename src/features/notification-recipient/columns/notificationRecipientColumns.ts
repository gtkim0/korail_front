import {ColumnDef} from "@tanstack/react-table";
import {NotificationRecipientColumnType} from "@/types/notification-recipient";

export const notificationRecipientColumns: ColumnDef<NotificationRecipientColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'notificationGrp',
    header: '알림그룹'
  },
  {
    accessorKey: 'targetStation',
    header: '대상역사'
  },
  {
    accessorKey: 'recipientList',
    header: '수신자목록'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자'
  },
]