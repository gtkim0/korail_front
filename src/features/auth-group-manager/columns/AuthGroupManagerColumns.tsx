import {ColumnDef} from "@tanstack/react-table";
import {AuthGroupManagerColumnType} from "@/types/auth-group-manager";

export const AuthGroupManagerColumns: ColumnDef<AuthGroupManagerColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'grpId',
    header: '그룹ID',
  },
  {
    accessorKey: 'grpNm',
    header: '그룹명',
  },
  {
    accessorKey: 'authorityLv',
    header: '권한레벨',
  },
  {
    accessorKey: 'description',
    header: '설명',
  },
  {
    accessorKey: 'create',
    header: 'C',
  },
  {
    accessorKey: 'read',
    header: 'R',
  },
  {
    accessorKey: 'update',
    header: 'U',
  },
  {
    accessorKey: 'delete',
    header: 'D',
  },
  {
    accessorKey: 'useYn',
    header: '사용여부',
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자',
  },
];