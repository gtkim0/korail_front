'use client';
import {ReactNode, useState} from 'react';
import styles from './PortalLayout.module.scss';
import PortalSidebar from "@/features/lyaouts/PortalLayout/PortalSidebar/PortalSidebar";
import PortalHeader from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeader";
import PortalFooter from "@/features/lyaouts/PortalLayout/PortalFooter/PortalFooter";
import {dummyMenu} from "@/data/dummyMenu";
import {BaseMenu} from "@/types/menu";
import MenuLoader from "@/shared/components/menu/MenuLoader";
import clsx from "clsx";
import {useGlobalStore} from "@/shared/store/globalStore";
import {useAlarmStore} from "@/shared/store/slice/alarmSlice";

interface Props {
  children: ReactNode;
  menus: BaseMenu[];
  isDashboard: boolean;
}

export default function PortalLayout(props: Props) {

  const {children, menus, isDashboard} = props;

  const codes = useGlobalStore(state => state.codes);

  return (
    <div className={clsx(styles.portalLayout, isDashboard && styles.dashboard)}>
      <MenuLoader menus={menus}/>
      <PortalHeader menus={menus} isDashboard={isDashboard}/>
      <div style={{flex: 1, display: 'flex'}}>
        {!isDashboard && <PortalSidebar menu={menus}/>}
        <div className={styles.portalContent}>
          {children}
        </div>
      </div>
      {!isDashboard && <PortalFooter/>}

    </div>
  )
}