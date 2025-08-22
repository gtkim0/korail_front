'use client';
import {useEffect} from 'react';
import {useGlobalStore} from '@/shared/store/globalStore';
import {BaseMenu} from "@/types/menu";

export default function MenuLoader({menus}: { menus: BaseMenu[] }) {
  const setRouteMenu = useGlobalStore(state => state.setRouteMenu);
  const setMenu = useGlobalStore(state => state.setMenu);

  useEffect(() => {
    setRouteMenu(menus);
    setMenu(menus);
  }, []);

  return null;
}