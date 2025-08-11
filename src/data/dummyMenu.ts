export const menuList = [
    {id: '0', pid: null, url: '/', component: 'Main', order: 1, depth: 0, name: 'Menu', description: '메인메뉴 에 대한설명'},
    {
        id: '1',
        pid: '0',
        url: '/dashboard',
        component: 'Dashboard',
        order: 1,
        depth: 1,
        name: '대시보드',
        description: '대시보드 에 대한설명'
    },
    {id: '2', pid: '0', url: '/info', component: '', order: 2, depth: 1, name: '기본정보', description: '기본정보 에 대한설명'},
    {id: '3', pid: '0', url: '/a', component: '', order: 3, depth: 1, name: '혼잡도 통계', description: '혼잡도 통계 에 대한설명'},
    {id: '4', pid: '0', url: '/s', component: '', order: 4, depth: 1, name: '비상 대응', description: '비상 대응 에 대한설명'},
    {id: '5', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '혼잡도 검증', description: '혼잡도 검증 에 대한설명'},
    {id: '6', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: 'API 관리', description: '혼잡도 검증 에 대한설명'},
    {id: '7', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '권한 관리', description: '혼잡도 검증 에 대한설명'},
    {id: '8', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '영상조회반출', description: '혼잡도 검증 에 대한설명'},

    // 기본정보 하위
    {id: '9', pid: '2', url: '', component: '', order: 1, depth: 2, name: '혼잡도 단계', description: ''},
    {
        id: '28',
        pid: '9',
        url: '/basic/congestion/level',
        component: 'CongestionStep',
        order: 1,
        depth: 3,
        name: '혼잡도 단계',
        description: ''
    },

    {id: '10', pid: '2', url: '', component: '', order: 2, depth: 2, name: '노선도', description: ''},
    {
        id: '29',
        pid: '10',
        url: '/basic/congestion/routemap',
        component: 'RouteMap',
        order: 1,
        depth: 3,
        name: '노선도',
        description: ''
    },

    {id: '11', pid: '2', url: '', component: '', order: 3, depth: 2, name: '열차정보', description: ''},
    {
        id: '30',
        pid: '11',
        url: '/basic/train/operation',
        component: 'OperationInfo',
        order: 1,
        depth: 3,
        name: '운행정보',
        description: ''
    },
    {
        id: '31',
        pid: '11',
        url: '/basic/train/programming',
        component: 'ProgrammingInfo',
        order: 2,
        depth: 3,
        name: '편성정보',
        description: ''
    },
    {
        id: '32',
        pid: '11',
        url: '/basic/train/carriage',
        component: 'CarriageInfo',
        order: 3,
        depth: 3,
        name: '객차정보',
        description: ''
    },
    {
        id: '33',
        pid: '11',
        url: '/basic/train/dispatch',
        component: 'BatchCycle',
        order: 4,
        depth: 3,
        name: '배차주기',
        description: ''
    },

    {id: '12', pid: '2', url: '', component: '', order: 4, depth: 2, name: '역사정보', description: ''},
    {
        id: '34',
        pid: '12',
        url: '/basic/subway/info',
        component: 'StationInfo',
        order: 1,
        depth: 3,
        name: '역사정보',
        description: ''
    },
    {
        id: '35',
        pid: '12',
        url: '/basic/subway/area',
        component: 'ZoneInfo',
        order: 2,
        depth: 3,
        name: '구역정보',
        description: ''
    },
    {
        id: '36',
        pid: '12',
        url: '/basic/subway/evacuation-info',
        component: 'EvacuationInfo',
        order: 3,
        depth: 3,
        name: '대피안내정보',
        description: ''
    },

    {id: '13', pid: '2', url: '', component: '', order: 5, depth: 2, name: '특수 기간 정보', description: ''},
    {
        id: '37',
        pid: '13',
        url: '/basic/special/info',
        component: 'SpecialPeriodInfo',
        order: 1,
        depth: 3,
        name: '특수 기간 정보',
        description: ''
    },

    {id: '14', pid: '2', url: '', component: '', order: 6, depth: 2, name: '계측장치정보', description: ''},
    {
        id: '38',
        pid: '14',
        url: '/basic/measurement/manage',
        component: 'InstrumentationInfo',
        order: 1,
        depth: 3,
        name: '계측장치정보',
        description: ''
    },
    {
        id: '39',
        pid: '14',
        url: '/basic/measurement/video',
        component: 'SaveConditionalImage',
        order: 2,
        depth: 3,
        name: '조건영상저장',
        description: ''
    },

    {id: '15', pid: '2', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: ''},
    {
        id: '40',
        pid: '15',
        url: '/basic/menu/manage',
        component: 'Menu',
        order: 1,
        depth: 3,
        name: '메뉴정보',
        description: ''
    },
    {
        id: '41',
        pid: '15',
        url: '/basic/menu/banner',
        component: 'Banner',
        order: 2,
        depth: 3,
        name: '배너정보',
        description: ''
    },


    // 혼잡도 통계 하위
    {id: '333', pid: '3', url: '', component: '', order: 1, depth: 2, name: '열차 통계', description: ''},
    {
        id: '334',
        pid: '333',
        url: '/congestion-statistics/train/statistics',
        component: 'TrainStatistics',
        order: 1,
        depth: 3,
        name: '열차 통계',
        description: ''
    },
    {id: '335', pid: '3', url: '', component: '', order: 2, depth: 2, name: '역사 통계', description: ''},
    {
        id: '336',
        pid: '335',
        url: '/congestion-statistics/stations/statistics',
        component: 'StationStatistics',
        order: 1,
        depth: 3,
        name: '역사 통계',
        description: ''
    },
    {id: '337', pid: '3', url: '', component: '', order: 3, depth: 2, name: '인프라모니터링', description: ''},
    {
        id: '338',
        pid: '337',
        url: '/congestion-statistics/infra/model',
        component: 'InfraModelAnalysis',
        order: 1,
        depth: 3,
        name: '분석모델',
        description: ''
    },
    {
        id: '339',
        pid: '337',
        url: '/congestion-statistics/infra/equipment',
        component: 'InfraEquipmentAnalysis',
        order: 2,
        depth: 3,
        name: '분석장비',
        description: ''
    },
    {id: '340', pid: '3', url: '', component: '', order: 4, depth: 2, name: '데이터보관', description: ''},
    {
        id: '341',
        pid: '340',
        url: '/congestion-statistics/data/storage-cycle',
        component: 'DataStorageCycle',
        order: 1,
        depth: 3,
        name: '데이터보관주기',
        description: ''
    },
    {
        id: '342',
        pid: '340',
        url: '/congestion-statistics/data/backup-path',
        component: 'DataBackupPath',
        order: 2,
        depth: 3,
        name: '데이터백업경로',
        description: ''
    },

    // 비상 대응 하위
    {id: '444', pid: '4', url: '', component: '', order: 1, depth: 2, name: '비상 대응 메뉴얼', description: ''},
    {
        id: '445',
        pid: '444',
        url: '/emergency/manual',
        component: 'EmergencyManual',
        order: 1,
        depth: 3,
        name: '비상 대응 메뉴얼',
        description: ''
    },
    {id: '446', pid: '4', url: '', component: '', order: 2, depth: 2, name: '현장 조치 메뉴얼', description: ''},
    {
        id: '447',
        pid: '446',
        url: '/emergency/action/manual',
        component: 'EmergencyActionManual',
        order: 1,
        depth: 3,
        name: '현장 조치 메뉴얼',
        description: ''
    },
    {id: '448', pid: '4', url: '', component: '', order: 3, depth: 2, name: '현장 인원', description: ''},
    {
        id: '449',
        pid: '448',
        url: '/emergency/personnel',
        component: 'EmergencyFieldPersonnel',
        order: 1,
        depth: 3,
        name: '현장 인원',
        description: ''
    },
    {id: '450', pid: '4', url: '', component: '', order: 4, depth: 2, name: '안내 방송', description: ''},
    {
        id: '451',
        pid: '450',
        url: '/emergency/guide/info',
        component: 'EmergencyGuideInfo',
        order: 1,
        depth: 3,
        name: '안내방송 정보',
        description: ''
    },
    {
        id: '452',
        pid: '450',
        url: '/emergency/automatic/manual',
        component: 'EmergencyBroadcastControl',
        order: 2,
        depth: 3,
        name: '자동수동 방송',
        description: ''
    },

    {id: '453', pid: '4', url: '', component: '', order: 5, depth: 2, name: '알림 규칙', description: ''},
    {
        id: '454',
        pid: '453',
        url: '/emergency/notification-rules',
        component: 'NotificationRules',
        order: 1,
        depth: 3,
        name: '알림 규칙',
        description: ''
    },
    {
        id: '455',
        pid: '453',
        url: '/emergency/notification-text',
        component: 'NotificationText',
        order: 2,
        depth: 3,
        name: '알림 문구',
        description: ''
    },
    {
        id: '456',
        pid: '453',
        url: '/emergency/notification-recipient',
        component: 'NotificationRecipient',
        order: 3,
        depth: 3,
        name: '알림 수신자',
        description: ''
    },
    {
        id: '457',
        pid: '453',
        url: '/emergency/notification-push',
        component: 'NotificationPush',
        order: 4,
        depth: 3,
        name: '푸시 알림',
        description: ''
    },
    {
        id: '458',
        pid: '453',
        url: '/emergency/notification-log',
        component: 'NotificationLog',
        order: 5,
        depth: 3,
        name: '알림 예약/로그',
        description: ''
    },

    // 혼잡도 검증 하위
    {id: '459', pid: '5', url: '', component: '', order: 1, depth: 2, name: '검증 대상', description: ''},
    {
        id: '460',
        pid: '459',
        url: '/congestion-verification/target',
        component: 'CongestionVerificationTarget',
        order: 1,
        depth: 3,
        name: '검증 대상',
        description: ''
    },
    {id: '461', pid: '5', url: '', component: '', order: 2, depth: 2, name: '검증 완료', description: ''},
    {
        id: '462',
        pid: '461',
        url: '/congestion-verification/complete',
        component: 'CongestionVerificationComplete',
        order: 1,
        depth: 3,
        name: '검증 완료',
        description: ''
    },

    // 권한 관리 하위
    {id: '700', pid: '7', url: '', component: '', order: 1, depth: 2, name: '권한 그룹', description: ''},
    {
        id: '703',
        pid: '700',
        url: '/permission/group',
        component: 'PermissionGroup',
        order: 1,
        depth: 3,
        name: '권한 그룹',
        description: ''
    },
    {id: '701', pid: '7', url: '', component: '', order: 2, depth: 2, name: '사용자별 권한', description: ''},
    {
        id: '704',
        pid: '701',
        url: '/permission/user',
        component: 'PermissionUser',
        order: 2,
        depth: 3,
        name: '사용자별 권한',
        description: ''
    },
    {id: '702', pid: '7', url: '', component: '', order: 3, depth: 2, name: '메뉴별 권한', description: ''},
    {
        id: '705',
        pid: '702',
        url: '/permission/menu',
        component: 'PermissionMenu',
        order: 3,
        depth: 3,
        name: '메뉴별 권한',
        description: ''
    },

    // 마이페이지


    // { id: '61', pid: null, depth: 2, name: '권한 그룹', url: '', component: '', code: 'MS-MP-030' },
    // { id: '61-1', pid: '61', depth: 3, name: '권한 그룹', url: '/permission/group', component: 'PermissionGroup', code: 'MS-MP-030-01' },
    //
    // { id: '62', pid: null, depth: 2, name: '역사별 권한', url: '', component: '', code: 'MS-MP-031' },
    // { id: '62-1', pid: '62', depth: 3, name: '역사별 권한', url: '/permission/station', component: 'PermissionUser', code: 'MS-MP-031-01' },
    //
    // { id: '63', pid: null, depth: 2, name: '매뉴별 권한', url: '', component: '', code: 'MS-MP-032' },
    // { id: '63-1', pid: '63', depth: 3, name: '매뉴별 권한', url: '/permission/menu', component: 'PermissionMenu', code: 'MS-MP-032-01' },
    //
    // // 마이페이지
    // { id: '64', pid: null, depth: 2, name: '회원 정보', url: '', component: '', code: 'MS-MP-033' },
    // { id: '64-1', pid: '64', depth: 3, name: '회원 정보', url: '/mypage/profile', component: 'UserProfile', code: 'MS-MP-033-01' },
    //
    // { id: '65', pid: null, depth: 2, name: '비밀번호 재설정', url: '', component: '', code: 'MS-MP-034' },
    // { id: '65-1', pid: '65', depth: 3, name: '비밀번호 재설정', url: '/mypage/reset-password', component: 'ResetPassword', code: 'MS-MP-034-01' },
    //
    // { id: '66', pid: null, depth: 2, name: '권한 조회', url: '', component: '', code: 'MS-MP-035' },
    // { id: '66-1', pid: '66', depth: 3, name: '권한 조회', url: '/mypage/permission/view', component: 'PermissionView', code: 'MS-MP-035-01' },
    // { id: '66-2', pid: '66', depth: 3, name: '권한 요청', url: '/mypage/permission/request', component: 'PermissionRequest', code: 'MS-MP-035-02' },
    //
    // { id: '68', pid: null, depth: 2, name: '회원 탈퇴', url: '', component: '', code: 'MS-MP-036' },
    // { id: '68-1', pid: '68', depth: 3, name: '회원탈퇴', url: '/mypage/withdraw', component: 'UserWithdraw', code: 'MS-MP-036-01' },
    //
    // // 영상조회반출
    // { id: '69', pid: null, depth: 2, name: '영상 조회', url: '', component: '', code: 'MS-MP-037' },
    // { id: '69-1', pid: '69', depth: 3, name: '영상조회', url: '/video/export/view', component: 'VideoView', code: 'MS-MP-037-01' },
    //
    // { id: '70', pid: null, depth: 2, name: '반출 요청', url: '', component: '', code: 'MS-MP-038' },
    // { id: '70-1', pid: '70', depth: 3, name: '반출 요청', url: '/video/export/request', component: 'ExportRequest', code: 'MS-MP-038-01' },
    //
    // { id: '71', pid: null, depth: 2, name: '결재 수신', url: '', component: '', code: 'MS-MP-039' },
    // { id: '71-1', pid: '71', depth: 3, name: '결재 대기', url: '/video/export/receive/pending', component: 'ApprovalReceivePending', code: 'MS-MP-039-01' },
    // { id: '71-2', pid: '71', depth: 3, name: '결재 완료', url: '/video/export/receive/completed', component: 'ApprovalReceiveCompleted', code: 'MS-MP-039-02' },
    //
    // { id: '73', pid: null, depth: 2, name: '결재 상신', url: '', component: '', code: 'MS-MP-040' },
    // { id: '73-1', pid: '73', depth: 3, name: '결재 대기', url: '/video/export/request/pending', component: 'ApprovalSubmitPending', code: 'MS-MP-040-01' },
    // { id: '73-2', pid: '73', depth: 3, name: '결재 완료', url: '/video/export/request/completed', component: 'ApprovalSubmitCompleted', code: 'MS-MP-040-02' }
    //
];

export const dummyMenu = menuList