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
    return menu.find(m => m.lnkgUrlAddrCn === pathname);
  }, [pathname, menu]);

  const current2DepthId = useMemo(() => {
    if (currentMenu?.depth === 3) {
      const parent2 = menu.find(m => m.menuId === currentMenu.upMenuId);
      return parent2?.menuId ?? null;
    }
    if (currentMenu?.depth === 2) {
      return currentMenu.menuId;
    }
    return null;
  }, [currentMenu, menu]);
  const current1DepthId = useMemo(() => {
    const current2 = menu.find(m => m.menuId === current2DepthId);
    return current2?.upMenuId ?? null;
  }, [current2DepthId, menu]);

  const title = menu.find(i => i.menuId === current1DepthId)?.menuNm

  const secondDepthMenus = useMemo(() => {
    return menu.filter(m => m.depth === 2 && m.upMenuId === current1DepthId);
  }, [menu, current1DepthId]);

  const structuredMenus = useMemo(() => {
    return secondDepthMenus.map(parent => {
      const children = menu.filter(m => m.upMenuId === parent.menuId);
      const isExpanded = parent.menuId === current2DepthId;

      return {
        ...parent,
        children,
        isExpanded,
      };
    });
  }, [secondDepthMenus, current2DepthId, menu]);

  useEffect(() => {
    const currentMenu = menu.find(m => m.lnkgUrlAddrCn === pathname);

    if (currentMenu?.depth === 3) {
      const parent2Depth = menu.find(m => m.menuId === currentMenu.upMenuId);
      if (parent2Depth) {
        setExpandedMenuId(parent2Depth.menuId);
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
          <PortalMenuItem key={item.menuId} item={item}/>
        ))}
      </div>
    </div>
  )
}