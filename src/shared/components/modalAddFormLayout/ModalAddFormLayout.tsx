import styles from './ModalAddFormLayout.module.scss'
import {ReactNode} from "react";

export default function ModalAddFormLayout({children, style}: { children: ReactNode, style?: object }) {
  return (
    <form className={styles.form} style={style}>
      {children}
    </form>
  )
}
