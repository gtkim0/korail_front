import styles from './PortalContentLayout.module.scss';
import MenuTitle from "@/shared/components/menuTitle/MenuTitle";
import MenuBreadCrumb from "@/shared/components/menuBreadCrumb/MenuBreadCrumb";
import {ReactNode, Suspense} from "react";
import {BaseMenu} from "@/types/menu";
import Loading from "@/shared/components/loading/Loading";

interface Props {
  path: string;
  menus: BaseMenu[];
  children: ReactNode;
}

export default function  PortalContentLayout ({path, menus, children}: Props) {

  const currentMenu = menus.find(i=> i.url === path);

  return (
    <div className={styles.container}>
      <div className={styles.contentHeader}>
        <MenuTitle title={currentMenu?.name || ''}/>
        <MenuBreadCrumb path={path} menus={menus}/>
      </div>

      {/*<Suspense fallback={<Loading />}>*/}
        <div style={{display:'flex', flexDirection:'column', gap:'4rem', flex: 1}}>
        { children }
        </div>
      {/*</Suspense>*/}
    </div>
  )
}