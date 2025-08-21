import {ColumnDef} from "@tanstack/react-table";
import {PermissionGroupColumnType} from "@/types/permission-group";

export const permissionGroupColumns: ColumnDef<PermissionGroupColumnType>[] = [
  // {
  //   accessorKey: 'id',
  //   header: '번호',
  //   meta: {
  //     hidden: true,
  //   }
  // },
  {
    accessorKey: 'authrtId',
    header: '그룹ID',
  },
  {
    accessorKey: 'authrtNm',
    header: '그룹명'
  },
  {
    accessorKey: 'authrtExplnCn',
    header: '설명',
    meta: {
      width: '40%'
    }
  },
  // {
  //   accessorKey: 'useYn',
  //   header: '사용여부'
  // },
  // {
  //   accessorKey: 'date',
  //   header: '데이터 기준 일자'
  // },
]