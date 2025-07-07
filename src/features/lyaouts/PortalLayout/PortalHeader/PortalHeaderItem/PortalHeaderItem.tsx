import styles from './PortalHeaderItem.module.css';
import {BaseMenu} from "@/types/menu";

interface Props {
  item: BaseMenu;
  onClick: (id: string) => void;
}

export default function PortalHeaderItem({item, onClick}: Props) {
  return (
    <div onClick={()=> onClick(item.id)} className={styles.portalHeaderItem}>
      <div className={styles.portalHeaderItemLabel}>
        {item.name}
      </div>
    </div>
  )
}