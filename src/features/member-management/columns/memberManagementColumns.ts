import {ColumnDef} from "@tanstack/react-table";
import {MemberManagementColumnType} from "@/types/member-management";

export const memberManagementColumns: ColumnDef<MemberManagementColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'userId',
    header: '회원아이디'
  },
  {
    accessorKey: 'userNm',
    header: '이름'
  },
  {
    accessorKey: 'authority',
    header: '소속권한그룹'
  },
  {
    accessorKey: 'areaOrTrunk',
    header: '구분'
  },
  {
    accessorKey: 'interestDirection',
    header: '관심방면'
  },
  {
    accessorKey: 'interestStation',
    header: '관심역사'
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