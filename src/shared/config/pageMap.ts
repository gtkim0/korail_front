/**
 * 메뉴에서 사용되는 componentName -> 실제 컴포넌트 의미 매핑
 * 이 파일은 import()를 위한 실행 코드가 아니라 참고용 정의
 */

export const pageComponentNameMap = {
  /** 기본정보 **/
  basicInfo: {
    CongestionStep: '혼잡도 단계 설정',
    RouteMap: '노선도',
    OperationInfo: '운행정보',
    ProgrammingInfo: '편성정보',
    CarriageInfo: '차량정보',
    CongestionAnalysisInfra: '혼잡도분석 인프라',
    BatchCycle: '배치주기',
    StationInfo: '역사정보',
    ZoneInfo: '구역정보',
    EvacuationInfo: '대피안내정보',
    SpecialPeriodInfo: '특수기간정보',
    InstrumentationInfo: '계측장치정보',
    SaveConditionalImage: '조건영상저장',
    Menu: '메뉴정보',
    Banner: '배너정보',
    TrainStatistics: '열차 통계',
    StationStatistics: '역사 통계',
    // InfraModelAnalysis: '분석모델',
    // InfraEquipmentAnalysis: '분석장비',
    DataStorageCycle: '데이터보관주기',
    DataBackupPath: '데이터백업경로',
    EmergencyManual: '비상 대응 메뉴얼',
    EmergencyActionManual: '현장 조치 메뉴얼',
    EmergencyFieldPersonnel: '현장 인원',
    EmergencyGuideInfo: '안내방송 정보',
    EmergencyBroadcastControl: '자동수동 발송',
    NotificationRules: '알림 규칙',
    NotificationLog: '알림 로그',
    NotificationPush: '푸시 알림',
    NotificationRecipient: '알림 수신자',
    NotificationText: '알림 문구',
    CongestionVerificationTarget: '검증 대상',
    CongestionVerificationComplete: '검증 완료',

    ApiBasicInfo: 'API 기본 정보',
    ApiLogInfo: 'API 기본정보 -> API 이력 정보',
    ApiRequestHeader: 'API 기본정보 -> 요청헤더 정보',

    ProvidedApiSpec: '제공 API명세 -> 제공 API',
    ProvidedApiSpecIo: '제공 API명세 -> 요청응답',
    ProvidedApiExcelHeaders: '제공 API명세 -> 엑셀헤더',

    RequestApiSpec: '요청 API명세 -> 요청 API',
    RequestApiSpecIo: '요청 API명세 -> 요청응답',
    RequestApiExcelHeaders: '요청 API명세 -> 엑셀헤더',

    ApiDeploymentManager: '배포',
    ApiServiceBasicInfo: 'api서비스 -> 기본정보',
    ApiServiceGroupManager: 'api서비스 -> 서비스그룹',

    ApiUsageHistory: 'API사용이력 -> 사용목록',
    ApiKeyReissueHistory: 'API사용이력 -> 인증키 재발급',
    ApiVersionControl: 'API 형상관리 -> 형상관리',

    ApiAnomalyLog: 'API 이상상황 -> 이상 상황',
    ApiErrorAlarmHistory: 'API 이상상황 -> 알림현황',
    ApiTransactionLog: 'api 트랜잭션 -> 트랜잭션',
    ApiErrorHistory: 'api 오류이력 -> 오류이력',
    PermissionGroup: '권한그룹',
    PermissionUser: '사용자별 권한',
    PermissionMenu: '메뉴별 권한',

    MyProfile: '기본 정보',
    UserListPage: '회원 정보',
    MyMenuAuthorityView: '권한 조회',
    PermissionRequest: '권한 요청',
    VideoViewList: '영상 조회',

    VideoExportRequest: '반출 요청',
    VideoReceiveWait: '결제수신 -> 결제 대기',
    VideoReceiveComplete: '결제수신 -> 결제 완료',

    VideoSubmitWait: '결제상신 -> 결제 대기',
    VideoSubmitComplete: '결제상신 -> 결제 완료'
  }


  // 계속 추가
};