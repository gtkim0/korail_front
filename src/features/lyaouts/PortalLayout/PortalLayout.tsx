import { ReactNode } from 'react';
import styles from './PortalLayout.module.css';
import PortalSidebar from "@/features/lyaouts/PortalLayout/PortalSidebar/PortalSidebar";
import {dummyMenu} from "@/app/pages/Menu";
import PortalHeader from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeader";
import PortalFooter from "@/features/lyaouts/PortalLayout/PortalFooter/PortalFooter";

interface Props {
  children: ReactNode;
}

export default function PortalLayout(props: Props) {

  const { children } = props;

  return (
    <div className={styles.portalLayout}>
      <PortalHeader />
      {/*<div style={{ padding:'3.2rem 4rem', flex: 1, display: 'flex', height: 'calc(100vh - 80px)', overflow:'hidden'}}>*/}
      <div style={{ padding:'3.2rem 4rem', flex: 1, display: 'flex'}}>
        <PortalSidebar menu={dummyMenu}/>
        <div style={{ flex: 1, padding: '1rem 2rem', height: '100%', boxSizing: 'border-box' }}>
        { children }
        </div>
      </div>
      <PortalFooter />
    </div>
  )
}