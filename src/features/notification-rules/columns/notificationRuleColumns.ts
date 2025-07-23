import {ColumnDef} from "@tanstack/react-table";
import {NotificationPushColumnType} from "@/types/notification-push";
import {NotificationRuleColumnType} from "@/types/notification-rule";

export const notificationRuleColumns: ColumnDef<NotificationRuleColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'ruleNm',
    header: '알림규칙명'
  },
  {
    accessorKey: 'congestion',
    header: '혼잡도'
  },
  {
    accessorKey: 'targetStationNm',
    header: '대상역사'
  },
  {
    accessorKey: 'duration',
    header: '지속시간(분)'
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
    accessorKey: 'useYn',
    header: '사용유무'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자'
  },
]