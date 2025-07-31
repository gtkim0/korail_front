import {ColumnDef} from "@tanstack/react-table";
import {PermissionUserColumnType} from "@/types/permission-user";

export const permissionUserColumns: ColumnDef<PermissionUserColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'priGrpNm',
    header: '권한그룹명'
  },
  {
    accessorKey: 'userId',
    header: '회원아이디'
  },
  {
    accessorKey: 'name',
    header: '이름'
  },
  {
    accessorKey: 'affiliation',
    header: '소속'
  },
  {
    accessorKey: 'position',
    header: '직책',
  },
  {
    accessorKey: 'contact',
    header: '연락처',
  },
  {
    accessorKey: 'interestRoute',
    header: '관심노선',
  },
  {
    accessorKey: 'interestStation',
    header: '관심역사',
  },
  {
    accessorKey: 'useYn',
    header: '사용여부'
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자'
  },
]