'use client';
import { useEffect } from 'react';
import { useGlobalStore } from '@/shared/store/globalStore';
import {BaseMenu} from "@/types/menu";

export default function MenuLoader({menus}: { menus: BaseMenu[]}) {
  const setRouteMenu = useGlobalStore(state => state.setRouteMenu);

  useEffect(() => {
    setRouteMenu(menus);
  }, []);

  return null;
}