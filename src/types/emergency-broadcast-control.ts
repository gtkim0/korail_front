export type EmergencyBroadcastControlColumnType = {
  id: string;
  broadcastRuleNm: string;          // 방송규칙명
  congestion: string;  //혼잡도
  targetRoute: string;   // 대상노선
  targetStation: string; // 대상역사
  targetZone: string;    // 대상구역
  numOfBroadCast: string;  // 방송횟수
  announcement: string;   // 안내방송
  autoBroadcast: string;  // 자동발송
  date: string;
}