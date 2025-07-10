export const oneDepthMenu = [
  { id: '0', pid: null, url: '/', component: 'Main', order: 1, depth: 0, name: 'Menu', description: '메인메뉴 에 대한설명' },
  { id: '1', pid: '0', url: '/dashboard', component: '', order: 1, depth: 1, name: '대시보드', description: '대시보드 에 대한설명' },
  { id: '2', pid: '0', url: '/info', component: '', order: 2, depth: 1, name: '기본정보', description: '기본정보 에 대한설명' },
  { id: '3', pid: '0', url: '/a', component: '', order: 3, depth: 1, name: '혼잡도 통계', description: '혼잡도 통계 에 대한설명' },
  { id: '4', pid: '0', url: '/s', component: '', order: 4, depth: 1, name: '비상 대응', description: '비상 대응 에 대한설명' },
  { id: '5', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '혼잡도 검증', description: '혼잡도 검증 에 대한설명' },
  { id: '6', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: 'API 관리', description: '혼잡도 검증 에 대한설명' },
  { id: '7', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '권한 관리', description: '혼잡도 검증 에 대한설명' },
  { id: '8', pid: '0', url: '/d', component: '', order: 5, depth: 1, name: '영상조회반출', description: '혼잡도 검증 에 대한설명' },
];

const congestionSecondMenu = [
  { id: '9', pid: '3', url: '', component: '', order: 1, depth: 2, name: '혼잡도 단계', description: '' },
  { id: '28', pid: '9', url: '/basic/congestion/level', component: 'CongestionStep', order: 1, depth: 3, name: '혼잡도 단계', description: '' },
]
const routeSecondMenu = [
  { id: '10', pid: '3', url: '', component: '', order: 2, depth: 2, name: '노선도', description: '' },
  { id: '29', pid: '10', url: '/basic/congestion/subway', component: '', order: 1, depth: 3, name: '노선도', description: '' },
]
const trainSecondMenu = [
  { id: '11', pid: '3', url: '', component: '', order: 3, depth: 2, name: '열차정보', description: '' },
  { id: '30', pid: '11', url: '/basic/train/operation', component: '', order: 1, depth: 3, name: '운행정보', description: '' },
  { id: '31', pid: '11', url: '/basic/train/programming', component: '', order: 2, depth: 3, name: '편성정보', description: '' },
  { id: '32', pid: '11', url: '/basic/train/carriage', component: '', order: 3, depth: 3, name: '객차정보', description: '' },
  { id: '33', pid: '11', url: '/basic/train/dispatch', component: '', order: 4, depth: 3, name: '배차주기', description: '' },
]
const subwayStationSecondMenu = [
  { id: '12', pid: '3', url: '', component: '', order: 4, depth: 2, name: '역사정보', description: '' },
  { id: '34', pid: '12', url: '/basic/subway/info', component: '', order: 1, depth: 3, name: '역사정보', description: '' },
  { id: '35', pid: '12', url: '/basic/subway/area', component: '', order: 2, depth: 3, name: '구역정보', description: '' },
  { id: '36', pid: '12', url: '/basic/subway/evacuationInfo', component: '', order: 3, depth: 3, name: '대피안내정보', description: '' },
]
const specialSecondMenu = [
  { id: '13', pid: '3', url: '', component: '', order: 5, depth: 2, name: '특수 기간 정보', description: '' },
  { id: '37', pid: '13', url: '/basic/special/info', component: '', order: 1, depth: 3, name: '특수 기간 정보', description: '' },
]
const measurementSecondMenu = [
  { id: '14', pid: '3', url: '', component: '', order: 6, depth: 2, name: '계측장치정보', description: '' },
  { id: '38', pid: '14', url: '/basic/measurement/manage', component: '', order: 1, depth: 3, name: '계측장치정보', description: '' },
  { id: '39', pid: '14', url: '/basic/measurement/video', component: '', order: 2, depth: 3, name: '조건영상저장', description: '' },
]
const menuSecondMenu = [
  { id: '15', pid: '3', url: '', component: '', order: 7, depth: 2, name: '메뉴정보', description: '' },
  { id: '40', pid: '15', url: '/basic/menu/manage', component: 'Menu', order: 1, depth: 3, name: '메뉴정보', description: '' },
  { id: '41', pid: '15', url: '/basic/menu/banner', component: 'Banner', order: 2, depth: 3, name: '배너정보', description: '' },
]

const secondDepthMenu = {
  congestionSecondMenu,
  routeSecondMenu,
  trainSecondMenu,
  subwayStationSecondMenu,
  specialSecondMenu,
  measurementSecondMenu,
  menuSecondMenu,
}

export const dummyMenu = [
  ...oneDepthMenu,
  ...Object.values(secondDepthMenu).flat(),
]