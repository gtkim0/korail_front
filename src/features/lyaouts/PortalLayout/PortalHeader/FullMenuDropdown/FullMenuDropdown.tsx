import {BaseMenu} from "@/types/menu";
import styles from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeader.module.scss";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";

interface Props {
  menuGroup: (BaseMenu & { thirdDepths: BaseMenu[] })[];
  visible: boolean;
}

export default function FullMenuDropdown({menuGroup, visible}: Props) {

  const path = usePathname();
  const router = useRouter();
  const [columnsPerRow, setColumnsPerRow] = useState(6);

  const actualColumns = Math.min(columnsPerRow, menuGroup.length);

  const getColumnCount = () => {
    const width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 900) return 2;
    if (width <= 1050) return 4;
    if (width <= 1280) return 5;
    return 6;
  };

  const handleMenuClick = (item: BaseMenu) => {
    if (!item.lnkgUrlAddrCn) return;
    router.push(item.lnkgUrlAddrCn);
  }

  useEffect(() => {
    const update = () => setColumnsPerRow(getColumnCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          // layout
          className={styles.dropdownFullMenu}
          initial={{opacity: 0, height: 0, y: -5}}
          animate={{opacity: 1, height: 'auto', y: 0}}
          exit={{opacity: 0, height: 0, y: -5}}
          transition={{duration: 0.3, ease: 'easeInOut'}}
        >
          <motion.div className={styles.inner}>
            {Array.from({length: actualColumns}).map((_, columnIndex) => (
              <div key={columnIndex} className={styles.subMenuGroup}>
                {menuGroup
                  .filter((_, idx) => idx % actualColumns === columnIndex)
                  .map((menu, idx) => (
                    <div style={{padding: '1rem 0'}} key={menu.menuId}>
                      <div className={styles.subMenuLabel}>{menu.menuNm}</div>
                      <div className={styles.thirdDepthWrapper}>
                        {menu.thirdDepths.map(third => (
                          <div
                            onClick={() => handleMenuClick(third)}
                            key={third.menuId}
                            className={clsx(styles.thirdDepthItem, third.lnkgUrlAddrCn === path && styles.current)}
                          >
                            {third.menuNm}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}