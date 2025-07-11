import {ColumnDef} from "@tanstack/react-table";
import {OperationInfo} from "@/types/operationInfo";

export const dummyOperationData = [
  {
    "1": '간선',
    '2': 'KI',
    "3": '경인선',
    "4": 'l1101',
    "5": '인천역',
    "6": '부개역',
    "7": '일반',
    "8": '평일',
    "9": '구로',
    "10": '05:00:00 ',
    "11": '05:00:00',
    "12": '2025-04-14',
  }
]

export const OperationInfoColumns: ColumnDef<OperationInfo>[] = [
  {
    accessorKey: "1",
    header: '구분',
  },
  {
    accessorKey: "2",
    header: '열차번호',
  },
  {
    accessorKey: "3",
    header: '노선명',
  },
  {
    accessorKey: "4",
    header: '노선번호',
  },
  {
    accessorKey: "5",
    header: '기점',
  },
  {
    accessorKey: "6",
    header: '종점',
  },
  {
    accessorKey: "7",
    header: '운행유형',
  },
  {
    accessorKey: "8",
    header: '요일구분',
  },
  {
    accessorKey: "9",
    header: '운행구간정거장',
  },
  {
    accessorKey: "10",
    header: '정거장도착시각',
  },
  {
    accessorKey: "11",
    header: '정거장출발시각',
  },
  {
    accessorKey: "12",
    header: '데이터기준일자',
  },
];
