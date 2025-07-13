import {ColumnDef} from "@tanstack/react-table";
import {Menu} from "@/features/menu/columns/menuColumns";

export const commonSearchColumns: {[key: string]: ColumnDef<any>[]} = {

  /* 노선검색 */
  route: [
    {
      accessorKey: 'number',
      header: '노선번호',
    },
    {
      accessorKey: 'name',
      header: '노선명',
    },
  ],
  
  /* 역사검색 */
  station: [
    {
      accessorKey: 'lineName ',
      header: '노선명',
    },
    {
      accessorKey: 'name',
      header: '역사번호',
    },
    {
      accessorKey: 'name',
      header: '역사명',
    },
  ]

  // 역사, 노선 2개밖에 없나?
}