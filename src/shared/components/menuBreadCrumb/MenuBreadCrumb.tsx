import {BaseMenu} from "@/types/menu";
import Image from "next/image";
import styles from './MenuBreadCrumb.module.css'
import clsx from "clsx";

type Props = {
  path: string;
  menus: BaseMenu[];
}

function getBreadcrumb(menuList: BaseMenu[], target: BaseMenu | null) {
  if (!target) return [];

  const path: BaseMenu[] = [];
  let current: BaseMenu | null = target;

  while (current) {
    path.unshift(current);
    current = menuList.find(m => m.menuId === current?.upMenuId) || null;
  }

  return path;
}

export default function MenuBreadCrumb({path, menus}: Props) {

  const currentMenu = menus.find(item => item.lnkgUrlAddrCn === path);
  const breadcrumb = getBreadcrumb(menus, currentMenu!);

  return (
    <nav className={styles.breadCrumb}>
      {breadcrumb.map((item, idx) => {
        return (
          <span
            className={clsx(idx === 0 && styles.isFirst, idx === breadcrumb.length - 1 && styles.isMatch)}
            key={item.menuId}
            style={{
              lineHeight: 0
            }}
          >
            {idx === 0 &&
                <div style={{position: 'relative', width: '1.6rem', height: '1.6rem'}}>
                    <Image src={'/home-stroke.svg'} alt={'logo'} fill style={{objectFit: 'contain'}}/>
                </div>
            }
            {item.menuNm}
            {idx < breadcrumb.length - 1 &&
                <div style={{position: 'relative', width: '1.6rem', height: '1.6rem'}}>
                    <Image src={'/arrow-right.svg'} alt={'logo'} fill style={{objectFit: 'contain'}}/>
                </div>
            }
        </span>
        )
      })}
    </nav>
  );
}