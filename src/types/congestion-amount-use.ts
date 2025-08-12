export type CongestionAmountUseColumnType = {
  id: string;
  lineNum: string; // 호선
  deviceId: string;  // 장치 ID
  installArea: string; // 설치장소
  cctvConnectStatus: string; // 평균 cpu사용률(%)
  serverComStatus: string; // 평균 메모리 사용률(MB)
  analysisModuleStatus: string; // 평균data 전송률 (Mbps)
  date: string; // 가동시간 (시간)
}