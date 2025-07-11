'use client';
import {ReactNode, useEffect} from 'react';
import styles from './PortalLayout.module.scss';
import PortalSidebar from "@/features/lyaouts/PortalLayout/PortalSidebar/PortalSidebar";
import PortalHeader from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeader";
import PortalFooter from "@/features/lyaouts/PortalLayout/PortalFooter/PortalFooter";
import {dummyMenu} from "@/data/dummyMenu";
import {BaseMenu} from "@/types/menu";
import {useGlobalStore} from "@/shared/store/globalStore";
import MenuLoader from "@/shared/components/menu/MenuLoader";

interface Props {
  children: ReactNode;
  menus: BaseMenu[]
}

export default function PortalLayout(props: Props) {

  const { children, menus } = props;

  return (
    <div className={styles.portalLayout}>
      <MenuLoader menus={menus}/>
      <PortalHeader menus={menus}/>
      <div style={{ flex: 1, display: 'flex'}}>
        <PortalSidebar menu={dummyMenu}/>
        <div className={styles.portalContent}>
        { children }
        </div>
      </div>
      <PortalFooter />
    </div>
  )
}