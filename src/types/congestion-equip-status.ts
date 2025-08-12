export type CongestionEquipStatusColumnType = {
  id: string;
  lineNum: string; // 호선
  deviceId: string;  // 장치 ID
  installArea: string; // 설치장소
  cctvConnectStatus: string; // CCTV 연결 상태
  serverComStatus: string; // 서버통신 상태
  analysisModuleStatus: string; // 분석모듈 상태
  date: string; // 데이터기준일자
}