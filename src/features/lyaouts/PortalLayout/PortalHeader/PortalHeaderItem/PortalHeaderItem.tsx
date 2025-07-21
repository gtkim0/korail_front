import styles from './PortalHeaderItem.module.scss';
import {BaseMenu} from "@/types/menu";
import clsx from "clsx";
import { motion } from "framer-motion";

interface Props {
  item: BaseMenu;
  onClick: (id: string) => void;
  onHover: (id: string) => void;
  isActive?: boolean;
}

export default function PortalHeaderItem({item, onClick, onHover, isActive}: Props) {
  return (
    <motion.div
      onClick={() => onClick(item.id)}
      onMouseEnter={() => onHover(item.id)}
      className={clsx(styles.portalHeaderItem)}
      animate={{
        borderBottom: isActive ? '3px solid #1489F2' : '3px solid rgba(0, 0, 0, 0)',
        color: isActive ? '#0061B8' : '#363637',
      }}
      whileHover={{
        borderBottom: '3px solid #1489F2',
        color: '#0061B8',
      }}
      transition={{
        duration: 0.15,
        ease: 'easeInOut',
      }}
    >
      <div className={styles.portalHeaderItemLabel}>
        {item.name}
      </div>
    </motion.div>
  )
}