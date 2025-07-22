import styles from './ModalAddFormLayout.module.scss'
import {ReactNode} from "react";

export default function ModalAddFormLayout({children}: { children: ReactNode}) {
  return (
    <form className={styles.form}>
      { children }
    </form>
  )
}
