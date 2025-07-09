'use client'
import {useGlobalStore} from "@/shared/store/globalStore";
import styles from './PortalHeader.module.css'
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import PortalHeaderItem from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeaderItem/PortalHeaderItem";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

export default function PortalHeader() {

  const router = useRouter();
  const { routeMenu, setSelectedRouteMenu } = useGlobalStore(state=> state);
  const renderMenu = routeMenu.filter(i=> i.depth === 1);

  const [ activeMenuId, setActiveMenuId ] = useState<string>('');

  //@TODO hook 으로 빼서 처리.
  const handleMenuClick = (id: string) => {
    const secondDepthList = routeMenu.filter(i => i.depth === 2 && i.pid === id);

    const thirdDepth = routeMenu.find(i =>
      i.depth === 3 && secondDepthList.some(second => second.id === i.pid)
    );

    if (thirdDepth?.url) {
      setActiveMenuId(id);
      setSelectedRouteMenu(thirdDepth)
      router.push(thirdDepth.url);
    } else {
      console.warn('하위 3뎁스 메뉴가 없습니다');
    }
  };

  return (
    <header className={styles.portalHeader}>
      <div className={styles.wrapper}>
        <div className={styles.menuArea}>
          <div style={{display:'flex',gap:'1.2rem', alignItems:'center'}}>
            <ImageWrapper width={166} height={40} src={'/portal_logo.svg'} />
            <div className={styles.mainTitle}>혼잡도 관리시스템</div>
          </div>
          <div
            style={{
              display:'flex',
              gap: '2rem',
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/*<div style={{display:'flex', gap:'2.4rem', height: '100%'}}>*/}
            <div style={{display:'flex', gap: 'clamp(0.8rem, 2vw, 2.4rem)', height: '100%'}}>
              {
                renderMenu.map(i=>
                  <PortalHeaderItem onClick={handleMenuClick} key={i.id} item={i}/>
                )
              }
            </div>
            {/*<div style={{width:'2.4rem',height:'100%',position:'relative'}}>*/}
            {/*  <Image src={'/menu.svg'} alt={''} fill/>*/}
            {/*</div>*/}
          </div>

          <div className={styles.info}>
            <div className={styles.info_menu}>로그아웃</div>
            <div className={styles.info_menu}>마이페이지</div>
            <div className={styles.info_menu}>사이트맵</div>
          </div>
        </div>
      </div>
    </header>



  )
}