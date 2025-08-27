import {ColumnDef} from "@tanstack/react-table";
import {ImageExportPaymentReceivePending} from "@/types/image-export-payment-receive-pending";

export const receiveCompleteColumns: ColumnDef<ImageExportPaymentReceivePending>[] = [
  {
    accessorKey: 'paymentCompleteDate',
    header: '결제완료'
  },
  {
    accessorKey: 'exportRequestDate',
    header: '구분'
  },
  {
    accessorKey: 'request',
    header: '설치위치'
  },
  {
    accessorKey: 'affiliation',
    header: '세부내용'
  },
  {
    accessorKey: 'paymentOpinion',
    header: '측정인원'
  },
  {
    accessorKey: 'exportCount',
    header: '기준면적'
  },
  {
    accessorKey: 'paymentYn',
    header: '혼잡도'
  },
]
