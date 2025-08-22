'use client'
import {useGlobalStore} from "@/shared/store/globalStore";
import styles from './PortalHeader.module.scss';
import {useEffect, useMemo, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import PortalHeaderItem from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeaderItem/PortalHeaderItem";
import {BaseMenu} from "@/types/menu";
import HeaderRightSection from "@/features/lyaouts/PortalLayout/PortalHeader/RightSection/RightSection";
import FullMenuDropdown from "@/features/lyaouts/PortalLayout/PortalHeader/FullMenuDropdown/FullMenuDropdown";
import {AnimatePresence, motion} from "framer-motion";
import PortalLogo from '@/shared/assets/images/portal_logo.svg'
import Image from "next/image";
import clsx from "clsx";

export default function PortalHeader({menus, isDashboard}: { menus: BaseMenu[], isDashboard: boolean }) {

  const pathname = usePathname();
  const router = useRouter();
  const {setSelectedRouteMenu} = useGlobalStore(state => state);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);


  const renderMenu = menus.filter(i => i.depth === 1);
  const [activeMenuId, setActiveMenuId] = useState<string>('');


  const activeFirstDepthId = useMemo(() => {
    const current = menus.find(m => m.url === pathname);
    if (!current) return null;

    const second = menus.find(m => m.id === current.pid);
    if (!second) return null;

    const first = menus.find(m => m.id === second.pid);
    return first?.id ?? null;
  }, [menus, pathname]);

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

  useEffect(() => {
    const updateHeight = () => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        setContainerHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <>
      <header
        className={clsx(styles.portalHeader, isDashboard && styles.dashboard)}
        onMouseLeave={() => setActiveMenuId('')}
      >
        <div ref={wrapperRef} className={styles.wrapper}>
          <div className={styles.menuArea}>
            <div className={styles.menuWrapper}>
              <div
                className={styles.leftArea}
                onClick={() => router.push('/dashboard')}
              >
                <div className={styles.imageArea}>
                  <Image alt={''} src={PortalLogo} fill style={{objectFit: 'contain'}}/>
                </div>
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
                      isActive={activeFirstDepthId === i.id}
                      isDashboard={isDashboard}
                    />
                  ))}
                </div>
              </div>
            </div>
            <HeaderRightSection/>
          </div>

          {/*@TODO 추후 데이터 다 들어간후 any 제거*/}
          <FullMenuDropdown
            visible={!!activeMenuId}
            menuGroup={menuGroup as any}
          />
        </div>
      </header>

      <AnimatePresence>
        {activeMenuId && (
          <motion.div
            className={styles.backdropBelowHeader}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            style={{
              top: containerHeight,
              height: `calc(100vh - ${containerHeight}px)`,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}