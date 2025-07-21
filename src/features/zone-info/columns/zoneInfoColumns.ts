import {ColumnDef} from "@tanstack/react-table";
import {ZoneInfoColumnType} from "@/types/zoneInfo";

export const zoneInfoColumns: ColumnDef<ZoneInfoColumnType> = [
  {
    accessorKey: 'routeName',
    header: '노선명'
  },
  {
    accessorKey: 'stationName',
    header: '역사명'
  },
  {
    accessorKey: 'zoneType',
    header: '구역종류'
  },
  {
    accessorKey: 'zoneName',
    header: '구역명'
  },
  {
    accessorKey: 'broadCastingName',
    header: '방송구역'
  },
  {
    accessorKey: 'cctvId',
    header: 'CCTVID'
  },
  {
    accessorKey: 'data',
    header: '데이터 기준일자'
  },
]