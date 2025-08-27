import {ImageExportManagementRequestType} from "@/types/image-export-management-request";
import {ColumnDef} from "@tanstack/react-table";

export const managementRequestColumns: ColumnDef<ImageExportManagementRequestType>[] = [
  {
    accessorKey: 'measureDate',
    header: '근무일자'
  },
  {
    accessorKey: 'type',
    header: '구분'
  },
  {
    accessorKey: 'installArea',
    header: '설치위치'
  },
  {
    accessorKey: 'detailContent',
    header: '세부내용'
  },
  {
    accessorKey: 'measureCount',
    header: '측정인원'
  },
  {
    accessorKey: 'standardArea',
    header: '기준면적'
  },
  {
    accessorKey: 'congest',
    header: '혼잡도'
  },
]

export const paymentColumns: ColumnDef<any>[] = [
  {
    accessorKey: 'order',
    header: '결제순번',
    meta: {
      width: '10%'
    }
  },
  {
    accessorKey: '1',
    header: '결제자',
    meta: {
      width: '10%'
    }
  },
  {
    accessorKey: '2',
    header: '부서',
    meta: {
      width: '10%'
    }
  },
  {
    accessorKey: '3',
    header: '직급',
    meta: {
      width: '10%'
    }
  },
  {
    accessorKey: '4',
    header: '결제자 변경',
    meta: {
      width: '10%'
    }
  },
]