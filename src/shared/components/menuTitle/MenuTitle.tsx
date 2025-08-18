import styles from './MenuTitle.module.css'
// import {useGlobalStore} from "@/shared/store/globalStore";
// import {usePathname} from "next/navigation";

interface Props {
  title?: string
}

export default function MenuTitle({title}: Props) {

  // const pathname = usePathname();
  // const { routeMenu } = useGlobalStore(state => state);
  //
  // const currentMenu = routeMenu.find(item => item.url === pathname);
  //
  // return (
  //   <div className={styles.menuTitle}>
  //     { currentMenu?.name || ''}
  //   </div>
  // )

  return (
    <div className={styles.menuTitle}>
      {title}
    </div>
  )
}