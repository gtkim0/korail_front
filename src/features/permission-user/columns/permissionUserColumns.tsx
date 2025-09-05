import {ColumnDef} from "@tanstack/react-table";
import {PermissionUserColumnType} from "@/types/permission-user";

export const permissionUserColumns: ColumnDef<PermissionUserColumnType>[] = [
  {
    accessorKey: 'authrtNm',
    header: '권한그룹명'
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
    accessorKey: 'jbgdCd',
    header: '소속'
  },
  {
    accessorKey: 'deptCd',
    header: '직책',
  },
  {
    accessorKey: 'cpNo',
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
    accessorKey: 'acntLockYn',
    header: '사용여부'
  },
  {
    accessorKey: 'joinDt',
    header: '데이터 기준 일자'
  },
]