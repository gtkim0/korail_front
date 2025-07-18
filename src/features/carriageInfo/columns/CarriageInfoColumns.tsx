import {ColumnDef} from "@tanstack/react-table";
import {Menu} from "@/features/menu/columns/menuColumns";

export type CarriageInfoColumnsType = {

}

export const dummyCarriageInfoData = [
  {

  },
]

export const CarriageInfoColumns: ColumnDef<CarriageInfoColumnsType>[] = [
  {
    accessorKey: 'name',
    header: '배너이름',
  },
];