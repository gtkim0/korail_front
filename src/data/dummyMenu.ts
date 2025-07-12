export const menuList = [
  { id: '0', pid: null, url: '/', component: 'Main', order: 1, depth: 0, name: 'Menu', description: '메인메뉴 에 대한설명' },
  { id: '1', pid: '0', url: '/dashboard', component: '', order: 1, depth: 1, name: '대시보드', description: '대시보드 에 대한설명' },
  { id: '2', pid: '0', url: '/info', component: '', order: 2, depth: 1, name: '기본정보', description: '기본정보 에 대한설명' },
  { id: '3', pid: '0', url: '/a', component: '', order: 3, depth: 1, name: '혼잡도 통계', description: '혼잡도 통계 에 대한설명' },
  { id: '4', pid: '0', url: '/s', component: '', order: 4, depth: 1, name: '비상 대응', description: '비상 대응 에 대한설명' },
  { id: '5', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '혼잡도 검증', description: '혼잡도 검증 에 대한설명' },
  { id: '6', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: 'API 관리', description: '혼잡도 검증 에 대한설명' },
  { id: '7', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '권한 관리', description: '혼잡도 검증 에 대한설명' },
  { id: '8', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '영상조회반출', description: '혼잡도 검증 에 대한설명' },

  // 기본정보 하위
  { id: '9', pid: '2', url: '', component: '', order: 1, depth: 2, name: '혼잡도 단계', description: '' },
  { id: '28', pid: '9', url: '/basic/congestion/level', component: 'CongestionStep', order: 1, depth: 3, name: '혼잡도 단계', description: '' },

  { id: '10', pid: '2', url: '', component: '', order: 2, depth: 2, name: '노선도', description: '' },
  { id: '29', pid: '10', url: '/basic/congestion/subway', component: 'RouteMap', order: 1, depth: 3, name: '노선도', description: '' },

  { id: '11', pid: '2', url: '', component: '', order: 3, depth: 2, name: '열차정보', description: '' },
  { id: '30', pid: '11', url: '/basic/train/operation', component: 'OperationInfo', order: 1, depth: 3, name: '운행정보', description: '' },
  { id: '31', pid: '11', url: '/basic/train/programming', component: 'ProgrammingInfo', order: 2, depth: 3, name: '편성정보', description: '' },
  { id: '32', pid: '11', url: '/basic/train/carriage', component: 'CarriageInfo', order: 3, depth: 3, name: '객차정보', description: '' },
  { id: '33', pid: '11', url: '/basic/train/dispatch', component: 'BatchCycle', order: 4, depth: 3, name: '배차주기', description: '' },

  { id: '12', pid: '2', url: '', component: '', order: 4, depth: 2, name: '역사정보', description: '' },
  { id: '34', pid: '12', url: '/basic/subway/info', component: 'HistoryInfo', order: 1, depth: 3, name: '역사정보', description: '' },
  { id: '35', pid: '12', url: '/basic/subway/area', component: 'ZoneInfo', order: 2, depth: 3, name: '구역정보', description: '' },
  { id: '36', pid: '12', url: '/basic/subway/evacuationInfo', component: 'EvacuationInfo', order: 3, depth: 3, name: '대피안내정보', description: '' },

  { id: '13', pid: '2', url: '', component: '', order: 5, depth: 2, name: '특수 기간 정보', description: '' },
  { id: '37', pid: '13', url: '/basic/special/info', component: 'SpecialPeriodInfo', order: 1, depth: 3, name: '특수 기간 정보', description: '' },

  { id: '14', pid: '2', url: '', component: '', order: 6, depth: 2, name: '계측장치정보', description: '' },
  { id: '38', pid: '14', url: '/basic/measurement/manage', component: 'InstrumentationInfo', order: 1, depth: 3, name: '계측장치정보', description: '' },
  { id: '39', pid: '14', url: '/basic/measurement/video', component: 'SaveConditionalImage', order: 2, depth: 3, name: '조건영상저장', description: '' },

  { id: '15', pid: '2', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
  { id: '40', pid: '15', url: '/basic/menu/manage', component: 'Menu', order: 1, depth: 3, name: '메뉴정보', description: '' },
  { id: '41', pid: '15', url: '/basic/menu/banner', component: 'Banner', order: 2, depth: 3, name: '배너정보', description: '' },

  
  // 혼잡도 통계 하위

  // 비상 대응 하위
  { id: '444', pid: '4', url: '', component: '', order: 1, depth: 2, name: '비상 대응 메뉴얼', description: '' },
  { id: '445', pid: '444', url: '/emergency/manual', component: 'EmergencyManual', order: 1, depth: 3, name: '비상 대응 메뉴얼', description: '' },

  { id: '446', pid: '4', url: '', component: '', order: 2, depth: 2, name: '현장 조치 메뉴얼', description: '' },
  { id: '447', pid: '446', url: '/emergency/action/manual', component: 'EmergencyActionManual', order: 1, depth: 3, name: '현장 조치 메뉴얼', description: '' },

  { id: '448', pid: '4', url: '', component: '', order: 3, depth: 2, name: '현장 인원', description: '' },
  { id: '449', pid: '448', url: '/emergency/personnel', component: 'EmergencyFieldPersonnel', order: 1, depth: 3, name: '현장 인원', description: '' },

  { id: '450', pid: '4', url: '', component: '', order: 4, depth: 2, name: '안내 방송', description: '' },
  { id: '451', pid: '450', url: '/emergency/guide/info', component: '', order: 1, depth: 3, name: '안내방송 정보', description: '' },
  { id: '452', pid: '450', url: '/emergency/automatic/manual', component: '', order: 2, depth: 3, name: '자동수동 방송', description: '' },

  { id: '453', pid: '4', url: '', component: '', order: 5, depth: 2, name: '알림 규칙', description: '' },
  { id: '454', pid: '453', url: '/emergency/notification-rules', component: '', order: 1, depth: 3, name: '알림 규칙', description: '' },


  // temp 들도 포함
  // { id: '150', pid: '3', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
  // { id: '151', pid: '3', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
  // { id: '152', pid: '3', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
  // { id: '153', pid: '3', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
  // { id: '154', pid: '3', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
  // { id: '155', pid: '3', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
];

export const dummyMenu = menuList