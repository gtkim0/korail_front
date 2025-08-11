import {ColumnDef} from "@tanstack/react-table";
import {TrainStatisticsColumnType} from "@/types/train-statistics";

export const trainStatisticsColumns: ColumnDef<TrainStatisticsColumnType>[] = [
  {
    accessorKey: 'dayOfWeek',
    header: '노선명',
    enableSorting: false
  },
  {
    accessorKey: 'line',
    header: '역사명',
    enableSorting: false
  },
  {
    accessorKey: 'trainNum',
    header: '제목',
    enableSorting: false
  },
  {
    accessorKey: 'startStation',
    header: '시작일시',
    enableSorting: false
  },
  {
    accessorKey: 'endStation',
    header: '종료일시',
    enableSorting: false
  },
  {
    accessorKey: '05:30',
    header: '05:30',
    enableSorting: false
  },
  {
    accessorKey: '06:00',
    header: '06:00',
    enableSorting: false
  },
  {
    accessorKey: '06:30',
    header: '06:30',
    enableSorting: false
  },
  {
    accessorKey: '07:00',
    header: '07:00',
    enableSorting: false
  },
  {
    accessorKey: '07:30',
    header: '07:30',
    enableSorting: false
  },
  {
    accessorKey: '08:00',
    header: '08:00',
    enableSorting: false
  },
  {
    accessorKey: '08:30',
    header: '08:30',
    enableSorting: false
  },
  {
    accessorKey: '09:00',
    header: '09:00',
    enableSorting: false
  },
  {
    accessorKey: '09:30',
    header: '09:30',
    enableSorting: false
  },
  {
    accessorKey: '10:00',
    header: '10:00',
    enableSorting: false
  },
  {
    accessorKey: '10:30',
    header: '10:30',
    enableSorting: false
  },
  {
    accessorKey: '11:00',
    header: '11:00',
    enableSorting: false
  },
  {
    accessorKey: '11:30',
    header: '11:30',
    enableSorting: false
  },
  {
    accessorKey: '12:00',
    header: '12:00',
    enableSorting: false
  },
  {
    accessorKey: '12:30',
    header: '12:30',
    enableSorting: false
  },
  {
    accessorKey: '13:00',
    header: '13:00',
    enableSorting: false
  },
  {
    accessorKey: '13:30',
    header: '13:30',
    enableSorting: false
  },
  {
    accessorKey: '14:00',
    header: '14:00',
    enableSorting: false
  },
  {
    accessorKey: '14:30',
    header: '14:30',
    enableSorting: false
  },
  {
    accessorKey: '15:00',
    header: '15:00',
    enableSorting: false
  },
  {
    accessorKey: '15:30',
    header: '15:30',
    enableSorting: false
  },
  {
    accessorKey: '16:00',
    header: '16:00',
    enableSorting: false
  },
]