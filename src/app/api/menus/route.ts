import { NextResponse } from 'next/server';
import {oneDepthMenu} from "@/app/pages/Menu";

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

export async function GET() {
  try {
    // const menus = await getMenus();

    const menus = dummyMenu;


    return NextResponse.json(menus);
  } catch (error) {
    console.error('[GET /api/menus]', error);
    return NextResponse.json(
      { message: 'Failed to fetch menu' },
      { status: 500 }
    );
  }
}