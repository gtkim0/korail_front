import { BaseMenu } from "@/types/menu";
import styles from "@/features/lyaouts/PortalLayout/PortalHeader/PortalHeader.module.scss";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {useRouter} from "next/navigation";

interface Props {
  menuGroup: (BaseMenu & { thirdDepths: BaseMenu[] })[];
  visible: boolean;
}

export default function FullMenuDropdown({ menuGroup, visible }: Props) {

  const router = useRouter();
  const [columnsPerRow, setColumnsPerRow] = useState(6);

  const getColumnCount = () => {
    const width = window.innerWidth;
    if (width <= 600) return 1;
    if (width <= 900) return 2;
    if (width <= 1050) return 4;
    if (width <= 1280) return 5;
    return 6;
  };

  const handleMenuClick = (item: BaseMenu) => {
    if(!item.url) return;
    router.push(item.url);
  }

  useEffect(() => {
    const update = () => setColumnsPerRow(getColumnCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className={clsx(styles.dropdownFullMenu, visible ? styles.show : styles.hide)}>
      <div className={styles.inner}>
        {menuGroup.map((second, idx) => {
          const isLastInRow = (idx + 1) % columnsPerRow === 0;
          return (
            <div
              key={second.id}
              className={clsx(styles.subMenuGroup, isLastInRow && styles.noBorder)}
            >
              <div className={styles.subMenuLabel}>{second.name}</div>
              <ul className={styles.thirdDepthWrapper}>
                {second.thirdDepths.map((third) => (
                  <li onClick={()=> handleMenuClick(third)} key={third.id} className={styles.thirdDepthItem}>
                    {third.name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}