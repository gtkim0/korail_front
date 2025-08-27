import {PAYMENT_STATUS_OPTIONS} from "@/shared/contants/selectOptions/paymentStatusOptions";

export type ImageExportPaymentReceivePending = {
  exportRequestDate: string; // 요청일시
  request: string;     // 요청자
  affiliation: string; // 소속
  rank: string; // 직급
  removalReason: string; // 반출사유
  removalCount: string; // 반출건수
  status: typeof PAYMENT_STATUS_OPTIONS[number]['key']; // 상태
}
