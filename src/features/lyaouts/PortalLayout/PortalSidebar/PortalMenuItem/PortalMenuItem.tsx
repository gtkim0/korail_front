'use client';
import { BaseMenu } from "@/types/menu";
import styles from './PortalMenuItem.module.css';
import { useGlobalStore } from "@/shared/store/globalStore";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {usePathname, useRouter} from 'next/navigation'
import clsx from "clsx";
import {AnimatePresence, motion} from "framer-motion";

export default function PortalMenuItem({ item }: { item: BaseMenu & { children?: BaseMenu[] } }) {

  const router = useRouter();
  const pathname = usePathname();

  const hasChildren = item.children && item.children.length > 0;
  const expandedMenuId = useGlobalStore(state => state.expandedMenuId);
  const setExpandedMenuId = useGlobalStore(state => state.setExpandedMenuId);

  const isOpen = expandedMenuId === item.id;
  const isMatch = item.url === pathname;

  const handleToggle = () => {

    if (item.depth === 3) {
      router.push(item.url);
      return;
    }

    if (!hasChildren) return;

    if (isOpen) {
      setExpandedMenuId(null);
    } else {
      setExpandedMenuId(item.id);
    }
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

      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            className={styles.childrenWrapper}
            key="children"
            initial={{ height: 0, opacity: 0, y: -5 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -5 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {item.children?.map(child => (
              <PortalMenuItem key={child.id} item={child} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}