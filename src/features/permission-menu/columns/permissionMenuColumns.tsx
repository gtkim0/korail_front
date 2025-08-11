import {ColumnDef} from "@tanstack/react-table";
import {PermissionUserColumnType} from "@/types/permission-user";

export const permissionMenuColumns: ColumnDef<PermissionUserColumnType>[] = [
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
    accessorKey: 'major',
    header: '대분류'
  },
  {
    accessorKey: 'middle',
    header: '중분류'
  },
  {
    accessorKey: 'sub',
    header: '소분류'
  },
  {
    accessorKey: 'description',
    header: '메뉴도움말',
  },
  {
    accessorKey: 'componentNm',
    header: '컴포넌트명',
  },
  {
    accessorKey: 'date',
    header: '데이터 기준 일자'
  },
]