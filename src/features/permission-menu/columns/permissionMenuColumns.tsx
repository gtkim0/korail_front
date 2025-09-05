import {ColumnDef} from "@tanstack/react-table";
import {PermissionMenuColumnType} from "@/types/permission-menu";
import './permissionMenuColumns.module.scss'

export const permissionMenuColumns: ColumnDef<PermissionMenuColumnType>[] = [
  {
    accessorKey: 'depth1MenuNm',
    header: '대분류'
  },
  {
    accessorKey: 'depth2MenuNm',
    header: '중분류'
  },
  {
    accessorKey: 'depth3MenuNm',
    header: '소분류'
  },
  {
    accessorKey: 'depth3MenuExplnCn',
    header: '메뉴도움말',
  },
  {
    accessorKey: 'depth3PrgrmId',
    header: '프로그램ID'
  },
  {
    accessorKey: 'inptAuthrtYn',
    header: 'C',
    cell: (info) => {
      console.log(info.getValue());
      return (
        <input type={'checkbox'} disabled checked={info.getValue() === 'Y'}/>
      )
    }
  },
  {
    accessorKey: 'inqAuthrtYn',
    header: 'R',
    cell: (info) => {
      return (
        <input type={'checkbox'} disabled checked={info.getValue() === 'Y'}/>
      )
    }
  },
  {
    accessorKey: 'mdfcnAuthrtYn',
    header: 'U',
    cell: (info) => {
      return (
        <input type={'checkbox'} disabled checked={info.getValue() === 'Y'}/>
      )
    }
  },
  {
    accessorKey: 'delAuthrtYn',
    header: 'D',
    cell: (info) => {
      return (
        <input type={'checkbox'} disabled checked={info.getValue() === 'Y'}/>
      )
    }
  },
  {
    accessorKey: 'date',
    header: '데이터 기준일자'
  }
]