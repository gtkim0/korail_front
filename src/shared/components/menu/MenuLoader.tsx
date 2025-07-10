'use client';
import { useEffect } from 'react';
import { useGlobalStore } from '@/shared/store/globalStore';

export default function MenuLoader() {
  const setRouteMenu = useGlobalStore(state => state.setRouteMenu);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch('/api/menus');

      console.log(res);

      const data = await res.json();

      console.log(data);
      setRouteMenu(data);
    };

    fetchMenu();
  }, []);

  return null;
}