export type ImageExportPaymentSubmitComplete = {
  paymentCompleteDate: string; // 결제완료 일시
  exportRequestDate: string;     // 반출요청 일시
  request: string; // 요청자
  paymentReason: string; // 결제의견
  exportCount: number; // 반출건수
  paymentYn: string; // 결제여부
}
