import {PAYMENT_STATUS_OPTIONS} from "@/shared/contants/selectOptions/paymentStatusOptions";

export type ImageExportPaymentSubmitPending = {
  exportRequestDate: string;     // 반출요청 일시
  request: string; // 요청자
  exportReason: string; // 반출사유
  exportCount: number; // 반출건수
  status: typeof PAYMENT_STATUS_OPTIONS[number]['key']; // 상태
}
