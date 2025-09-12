import {ColumnDef} from "@tanstack/react-table";
import {PermissionGroupColumnType} from "@/types/permission-group";

export const permissionGroupColumns: ColumnDef<PermissionGroupColumnType>[] = [
  {
    accessorKey: 'authrtId',
    header: '그룹ID',
  },
  {
    accessorKey: 'authrtNm',
    header: '그룹명',
  },
  {
    accessorKey: 'authrtExplnCn',
    header: '설명',
  },
]