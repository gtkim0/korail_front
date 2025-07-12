'use client'
import { useGlobalStore } from "@/shared/store/globalStore";
import styles from './PortalHeader.module.scss';
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PortalHeaderItem from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeaderItem/PortalHeaderItem";
import { ImageWrapper } from "@/shared/components/ImageWrapper/ImageWrapper";
import { BaseMenu } from "@/types/menu";
import HeaderRightSection from "@/features/lyaouts/PortalLayout/PortalHeader/RightSection/RightSection";
import FullMenuDropdown from "@/features/lyaouts/PortalLayout/PortalHeader/FullMenuDropdown/FullMenuDropdown";

export default function PortalHeader({ menus }: { menus: BaseMenu[] }) {
  const router = useRouter();
  const { setSelectedRouteMenu } = useGlobalStore(state => state);

  const renderMenu = menus.filter(i => i.depth === 1);
  const [activeMenuId, setActiveMenuId] = useState<string>('');

  const allMenuGroups = useMemo(() => {
    const secondDepth = menus.filter(i => i.depth === 2);
    const thirdDepth = menus.filter(i => i.depth === 3);

    const map: Record<string, { id: string; name: string; thirdDepths: BaseMenu[] }[]> = {};

    menus.filter(i => i.depth === 1).forEach(first => {
      const seconds = secondDepth.filter(s => s.pid === first.id);
      map[first.id] = seconds.map(s => ({
        ...s,
        thirdDepths: thirdDepth.filter(t => t.pid === s.id)
      }));
    });

    return map;
  }, [menus]);

  const menuGroup = activeMenuId ? allMenuGroups[activeMenuId] ?? [] : [];

  const handleMenuClick = (id: string) => {
    const secondDepthList = menus.filter(i => i.depth === 2 && i.pid === id);
    const thirdDepth = menus.find(i =>
      i.depth === 3 && secondDepthList.some(second => second.id === i.pid)
    );

    if (thirdDepth?.url) {
      setSelectedRouteMenu(thirdDepth);
      router.push(thirdDepth.url);
    } else {
      console.warn('하위 3뎁스 메뉴가 없습니다');
    }
  };

  const handleMenuHover = (id: string) => {
    setActiveMenuId(id);
  };

  return (
    <header
      className={styles.portalHeader}
      onMouseLeave={() => setActiveMenuId('')}
    >
      <div className={styles.wrapper}>
        <div className={styles.menuArea}>
          <div className={styles.menuWrapper}>
            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
              <ImageWrapper width={166} height={40} src={'/portal_logo.svg'} />
              <div className={styles.mainTitle}>혼잡도 관리시스템</div>
            </div>
            <div className={styles.contentWrapper}>
              <div className={styles.content}>
                {renderMenu.map(i => (
                  <PortalHeaderItem
                    key={i.id}
                    item={i}
                    onClick={handleMenuClick}
                    onHover={handleMenuHover}
                  />
                ))}
              </div>
            </div>
          </div>
          <HeaderRightSection />
        </div>

        <FullMenuDropdown
          visible={!!activeMenuId}
          menuGroup={menuGroup}
        />
      </div>
    </header>
  );
}