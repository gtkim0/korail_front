import styles from './PortalHeaderItem.module.scss';
import {BaseMenu} from "@/types/menu";
import clsx from "clsx";

interface Props {
  item: BaseMenu;
  onClick: (id: string) => void;
  onHover: (id: string) => void;
  isActive?: boolean;
}

export default function PortalHeaderItem({item, onClick, onHover, isActive}: Props) {
  return (
    <div
      onClick={()=> onClick(item.id)}
      className={clsx(styles.portalHeaderItem, isActive && styles.active)}
      onMouseEnter={() => onHover(item.id)}
    >
      <div className={styles.portalHeaderItemLabel}>
        {item.name}
      </div>
    </div>
  )
}