import styles from './TransferListWrapper.module.scss';
import {ReactNode} from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function TransferListWrapper({title, children}: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        {title}
      </span>
      <div className={styles.flexCol}>
        {children}
      </div>
    </div>
  )
}