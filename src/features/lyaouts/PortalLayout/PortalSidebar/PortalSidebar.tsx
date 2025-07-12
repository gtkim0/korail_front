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

  useEffect(() => {
    const currentMenu = menu.find(m => m.url === pathname);

    if (currentMenu?.depth === 3) {
      const parent2Depth = menu.find(m => m.id === currentMenu.pid);
      if (parent2Depth) {
        setExpandedMenuId(parent2Depth.id);
      }
    }
  }, [pathname, menu, setExpandedMenuId]);

  const secondDepthMenus = useMemo(() => menu.filter(item => item.pid === '2'), [menu]);

  const structuredMenus = useMemo(() => {
    return secondDepthMenus.map(parent => {
      const children = menu.filter(child => child.pid === parent.id);
      return {
        ...parent,
        children,
      };
    });
  }, [secondDepthMenus, menu]);

  return (
    <div className={styles.portalSidebar}>
      <div className={styles.portalSidebarHeader}>
        <span className={styles.secDep}>
        기본정보
        </span>
      </div>
      <div className={styles.menuScrollArea}>
        {structuredMenus.map(item => (
          <PortalMenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}