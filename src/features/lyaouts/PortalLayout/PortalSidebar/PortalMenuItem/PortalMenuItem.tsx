'use client';
import { BaseMenu } from "@/types/menu";
import styles from './PortalMenuItem.module.css';
import { useGlobalStore } from "@/shared/store/globalStore";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {usePathname, useRouter} from 'next/navigation'
import clsx from "clsx";

export default function PortalMenuItem({ item }: { item: BaseMenu & { children?: BaseMenu[] } }) {

  const router = useRouter();
  const pathname = usePathname();

  const hasChildren = item.children && item.children.length > 0;
  const expandedMenuIds = useGlobalStore(state => state.expandedMenuIds);
  const expandMenu = useGlobalStore(state => state.expandMenu);
  const collapseMenu = useGlobalStore(state => state.collapseMenu);

  const isOpen = expandedMenuIds.includes(item.id);

  const isMatch = item.url === pathname

  const handleToggle = () => {

    if(item.depth === 3) {
      router.push(item.url)
    }

    if (!hasChildren) return;
    if (isOpen) collapseMenu(item.id);
    else expandMenu(item.id);
  };

  return (
    <div className={clsx(styles.menuItemWrapper, {[styles.menuItemWrapper_open]: isOpen})}>
      <div className={clsx(styles.menuItem, {[styles.menuOpen]: isOpen})} onClick={handleToggle}>
        <span className={clsx('font_lg', 'text_bold','font', isMatch && styles.match)}>{item.name}</span>
        {hasChildren && (
          <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>
            <ImageWrapper width={20} height={20} src={ isOpen ? '/arrow-down-white.svg' : '/arrow-down.svg'} />
          </span>
        )}
      </div>

      {isOpen && hasChildren && (
        <div className={styles.childrenWrapper}>
          {item.children?.map(child => (
            <PortalMenuItem key={child.id} item={child} />
          ))}
        </div>
      )}
    </div>
  );
}