import {ColumnDef} from "@tanstack/react-table";
import {PermissionGroupColumnType} from "@/types/permission-group";

export const permissionGroupColumns: ColumnDef<PermissionGroupColumnType>[] = [
  {
    accessorKey: 'id',
    header: '번호',
    meta: {
      hidden: true,
    }
  },
  {
    accessorKey: 'groupId',
    header: '그룹ID'
  },
  {
    accessorKey: 'groupNm',
    header: '그룹명'
  },
  {
    accessorKey: 'priLevel',
    header: '권한레벨'
  },
  {
    accessorKey: 'description',
    header: '설명'
  },
  {
    accessorKey: 'create',
    header: 'C',
    cell: info => {

      const isCheck = info.getValue() as boolean;
      return (
        <input type={'checkbox'} checked={isCheck} />
      )
    }
  },
  {
    accessorKey: 'read',
    header: 'R',
    cell: info => {

      const isCheck = info.getValue() as boolean;
      return (
        <input type={'checkbox'} checked={isCheck} />
      )
    }
  },
  {
    accessorKey: 'update',
    header: 'U',
    cell: info => {

      const isCheck = info.getValue() as boolean;
      return (
        <input type={'checkbox'} checked={isCheck} />
      )
    }
  },
  {
    accessorKey: 'delete',
    header: 'D',
    cell: info => {

      const isCheck = info.getValue() as boolean;
      return (
        <input type={'checkbox'} checked={isCheck} />
      )
    }
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