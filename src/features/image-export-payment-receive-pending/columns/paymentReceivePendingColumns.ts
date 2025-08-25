import {ColumnDef} from "@tanstack/react-table";
import {ImageExportPaymentReceivePending} from "@/types/image-export-payment-receive-pending";

export const receivePendingColumns: ColumnDef<ImageExportPaymentReceivePending>[] = [
  {
    accessorKey: 'exportRequestDate',
    header: '반출 요청 일시'
  },
  {
    accessorKey: 'request',
    header: '요청자'
  },
  {
    accessorKey: 'affiliation',
    header: '소속'
  },
  {
    accessorKey: 'rank',
    header: '직급'
  },
  {
    accessorKey: 'removalReason',
    header: '반출사유'
  },
  {
    accessorKey: 'removalCount',
    header: '반출건수'
  },
  {
    accessorKey: 'status',
    header: '상태'
  },
]
