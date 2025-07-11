'use client'
import styles from './PortalSidebar.module.scss';
import {useGlobalStore} from "@/shared/store/globalStore";
import {BaseMenu} from "@/types/menu";
import PortalMenuItem from "@/features/lyaouts/PortalLayout/PortalSidebar/PortalMenuItem/PortalMenuItem";

export default function PortalSidebar({menu}: { menu: BaseMenu[] }) {

  const { selectedMenu } = useGlobalStore(state=> state);
  // const childrenMenus = menu.filter(i=> i.pid === selectedMenu.id)

  const secondDepthMenus = menu.filter(item => item.pid === '3');

  const structuredMenus = secondDepthMenus.map(parent => {
    const children = menu.filter(child => child.pid === parent.id);
    return {
      ...parent,
      children,
    };
  });

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