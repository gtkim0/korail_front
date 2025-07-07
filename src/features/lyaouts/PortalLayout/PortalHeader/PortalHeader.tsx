'use client'
import {useGlobalStore} from "@/shared/store/globalStore";
import styles from './PortalHeader.module.css'
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
import PortalHeaderItem from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeaderItem/PortalHeaderItem";

export default function PortalHeader() {

  const router = useRouter();
  const { routeMenu } = useGlobalStore(state=> state);
  const renderMenu = routeMenu.filter(i=> i.depth === 1);

  const [ activeMenuId, setActiveMenuId ] = useState<string>('');

  //@TODO hook 으로 빼서 처리.

  const handleMenuClick = (id: string) => {
    const thirdDepth = routeMenu.find(
      item => item.depth === 3 && item.pid === id
    );

    if (thirdDepth?.url) {
      setActiveMenuId(id);
      router.push(thirdDepth.url);
    } else {
      console.warn('하위 3뎁스 메뉴가 없습니다');
    }
  }

  return (
    <header className={styles.portalHeader}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.info_menu}>로그아웃</div>
          <div className={styles.info_menu}>마이페이지</div>
          <div className={styles.info_menu}>사이트맵</div>
        </div>
        <div className={styles.menuArea}>
          <div style={{display:'flex',gap:'1.2rem'}}>
            <div style={{width:'20rem', height:'100%', position:'relative'}}>
              <Image src={'/portal_logo.svg'} alt={'logo'} fill/>
            </div>
            <div className={styles.mainTitle}>혼잡도 관리시스템</div>
          </div>
          <div
            style={{
              display:'flex',
              gap: '2rem',
              flex: 1,
              alignSelf: 'stretch',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <div style={{display:'flex', gap:'2.4rem', height: '100%'}}>
              {
                renderMenu.map(i=>
                  <PortalHeaderItem onClick={handleMenuClick} key={i.id} item={i}/>
                )
              }
            </div>
            <div style={{width:'2.4rem',height:'100%',position:'relative'}}>
              <Image src={'/menu.svg'} alt={''} fill/>
            </div>
          </div>
        </div>
      </div>
    </header>



  )
}