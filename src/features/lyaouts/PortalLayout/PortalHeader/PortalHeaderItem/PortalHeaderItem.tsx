import styles from './PortalHeaderItem.module.css';
import {BaseMenu} from "@/types/menu";

interface Props {
  item: BaseMenu;
  onClick: (id: string) => void;
  onHover: (id: string) => void;
}

export default function PortalHeaderItem({item, onClick, onHover }: Props) {
  return (
    <div
      onClick={()=> onClick(item.id)}
      className={styles.portalHeaderItem}
      onMouseEnter={() => onHover(item.id)}
    >
      <div className={styles.portalHeaderItemLabel}>
        {item.name}
      </div>
    </div>
  )
}