'use client'
import styles from './PortalSidebar.module.scss';
import {useGlobalStore} from "@/shared/store/globalStore";
import {BaseMenu} from "@/types/menu";
import PortalMenuItem from "@/features/lyaouts/PortalLayout/PortalSidebar/PortalMenuItem/PortalMenuItem";
import {useEffect, useMemo} from "react";
import {usePathname} from "next/navigation";

export default function PortalSidebar({menu}: { menu: BaseMenu[] }) {

  const pathname = usePathname();
  const setExpandedMenuId = useGlobalStore(state => state.setExpandedMenuId);

  const currentMenu = useMemo(() => {
    return menu.find(m => m.url === pathname);
  }, [pathname, menu]);

  const current2DepthId = useMemo(() => {
    if (currentMenu?.depth === 3) {
      const parent2 = menu.find(m => m.id === currentMenu.pid);
      return parent2?.id ?? null;
    }
    if (currentMenu?.depth === 2) {
      return currentMenu.id;
    }
    return null;
  }, [currentMenu, menu]);
  const current1DepthId = useMemo(() => {
    const current2 = menu.find(m => m.id === current2DepthId);
    return current2?.pid ?? null;
  }, [current2DepthId, menu]);

  const title = menu.find(i=> i.id === current1DepthId)?.name

  const secondDepthMenus = useMemo(() => {
    return menu.filter(m => m.depth === 2 && m.pid === current1DepthId);
  }, [menu, current1DepthId]);

  const structuredMenus = useMemo(() => {
    return secondDepthMenus.map(parent => {
      const children = menu.filter(m => m.pid === parent.id);
      const isExpanded = parent.id === current2DepthId;

      return {
        ...parent,
        children,
        isExpanded,
      };
    });
  }, [secondDepthMenus, current2DepthId, menu]);

  useEffect(() =>  {
    const currentMenu = menu.find(m => m.url === pathname);

    if (currentMenu?.depth === 3) {
      const parent2Depth = menu.find(m => m.id === currentMenu.pid);
      if (parent2Depth) {
        setExpandedMenuId(parent2Depth.id);
      }
    }
  }, [pathname, menu, setExpandedMenuId]);

  return (
    <div className={styles.portalSidebar}>
      <div className={styles.portalSidebarHeader}>
        <span className={styles.secDep}>
          {title}
        </span>
      </div>
      <div className={styles.menuScrollArea}>
        {structuredMenus.map(item => (
          <PortalMenuItem key={item.id} item={item}/>
        ))}
      </div>
    </div>
  )
}