import {ColumnDef} from "@tanstack/react-table";
import {AuthorityGroup, MemberManagementColumnType} from "@/types/member-management";

export const memberManagementColumns: ColumnDef<MemberManagementColumnType>[] = [
  {
    accessorKey: 'userId',
    header: '회원아이디'
  },
  {
    accessorKey: 'userNm',
    header: '이름'
  },
  {
    accessorKey: 'tptlUserAuthrtrs',
    header: '소속권한그룹',
    cell: (info) => {
      const value = info.getValue() as AuthorityGroup[];
      return <>{value.map(i => i.authrtId).join(', ')}</>;
    }
  },
  {
    accessorKey: 'wideRailYn',
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
    accessorKey: 'acntLockYn',
    header: '사용유무'
  },
  {
    accessorKey: 'joinDt',
    header: '데이터 기준일자'
  },
]