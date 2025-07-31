import styles from "@/app/(auth)/auth/signup/signup.module.scss";
import Image from "next/image";
import PortalFooter from "@/features/lyaouts/PortalLayout/PortalFooter/PortalFooter";
import PortalLogo from '@/shared/assets/images/portal_logo.svg';

import {ReactNode} from "react";

interface Props {
  children: ReactNode;
  title: string;
}

export default function AuthContainer({children, title}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.systemLabel}>코레일 철도 혼잡도 관리시스템</span>
          <div className={styles.logoRow}>
            <div className={styles.logoImage}>
              <Image src={PortalLogo} alt="logo" fill style={{objectFit: 'contain'}}/>
            </div>
            <span className={styles.title}>{title}</span>
          </div>
        </div>
        {children}
      </div>
      {/*<PortalFooter />*/}
    </div>
  )
}