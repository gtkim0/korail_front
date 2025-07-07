'use client';
import { BaseMenu } from "@/types/menu";
import styles from './PortalMenuItem.module.css';
import { useGlobalStore } from "@/shared/store/globalStore";

export default function PortalMenuItem({ item }: { item: BaseMenu & { children?: BaseMenu[] } }) {
  const hasChildren = item.children && item.children.length > 0;
  const expandedMenuIds = useGlobalStore(state => state.expandedMenuIds);
  const expandMenu = useGlobalStore(state => state.expandMenu);
  const collapseMenu = useGlobalStore(state => state.collapseMenu);

  const isOpen = expandedMenuIds.includes(item.id);

  const handleToggle = () => {
    if (!hasChildren) return;
    if (isOpen) collapseMenu(item.id);
    else expandMenu(item.id);
  };

  return (
    <div className={styles.menuItemWrapper}>
      <div className={styles.menuItem} onClick={handleToggle}>
        {hasChildren && (
          <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>
            ▶
          </span>
        )}
        <span>{item.name}</span>
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