import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {MODAL_TITLE} from "@/shared/contants/modalMessage";
import MenuEditArea from "@/features/menu/MenuEditArea/MenuEditArea";
import MenuView from "@/features/menu/MenuView/page";
import {on} from "next/dist/client/components/react-dev-overlay/pages/bus";

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
  { id: '9', pid: '3', url: '/d', component: '', order: 1, depth: 2, name: '혼잡도 단계', description: '' },
  { id: '28', pid: '9', url: '/d', component: '', order: 1, depth: 3, name: '혼잡도 단계', description: '' },
]
const routeSecondMenu = [
  { id: '10', pid: '3', url: '/d', component: '', order: 1, depth: 2, name: '노선도', description: '' },
  { id: '29', pid: '10', url: '/d', component: '', order: 1, depth: 3, name: '노선도', description: '' },
]
const trainSecondMenu = [
  { id: '11', pid: '3', url: '/d', component: '', order: 1, depth: 2, name: '열차정보', description: '' },
  { id: '30', pid: '11', url: '/d', component: '', order: 1, depth: 3, name: '운행정보', description: '' },
  { id: '31', pid: '11', url: '/d', component: '', order: 2, depth: 3, name: '편성정보', description: '' },
  { id: '32', pid: '11', url: '/d', component: '', order: 3, depth: 3, name: '객차정보', description: '' },
  { id: '33', pid: '11', url: '/d', component: '', order: 4, depth: 3, name: '배차주기', description: '' },
]
const subwayStationSecondMenu = [
  { id: '12', pid: '3', url: '/d', component: '', order: 1, depth: 2, name: '역사정보', description: '' },
  { id: '34', pid: '12', url: '/d', component: '', order: 1, depth: 3, name: '역사정보', description: '' },
  { id: '35', pid: '12', url: '/d', component: '', order: 2, depth: 3, name: '구역정보', description: '' },
  { id: '36', pid: '12', url: '/d', component: '', order: 3, depth: 3, name: '대피안내정보', description: '' },
]
const specialSecondMenu = [
  { id: '13', pid: '3', url: '/d', component: '', order: 1, depth: 2, name: '특수 기간 정보', description: '' },
  { id: '37', pid: '13', url: '/d', component: '', order: 1, depth: 3, name: '특수 기간 정보', description: '' },
]
const measurementSecondMenu = [
  { id: '14', pid: '3', url: '/d', component: '', order: 1, depth: 2, name: '계측장치정보', description: '' },
  { id: '38', pid: '14', url: '/d', component: '', order: 1, depth: 3, name: '계측장치정보', description: '' },
  { id: '39', pid: '14', url: '/d', component: '', order: 2, depth: 3, name: '조건영상저장', description: '' },
]

const menuSecondMenu = [
  { id: '15', pid: '3', url: '/d', component: '', order: 1, depth: 2, name: '메뉴정보', description: '' },
  { id: '40', pid: '3', url: '/d', component: '', order: 1, depth: 3, name: '메뉴정보', description: '' },
  { id: '41', pid: '3', url: '/d', component: '', order: 1, depth: 3, name: '배너정보', description: '' },
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

export default async function Menu () {
  // const data = await fetch('')
  return (
    <MenuView initialMenus={dummyMenu}/>
  )
}