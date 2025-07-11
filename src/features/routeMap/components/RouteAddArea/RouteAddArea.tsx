import styles from './RouteAddArea.module.scss';
import RoutePlanner from "@/features/routeMap/components/RoutePlanner/RoutePlanner";

export default function RouteAddArea () {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.title}>
          노선 편성(역 등록)
        </span>
        <div className={styles.routeArea}>
          <div className={styles.titleArea}>
            <div className={styles.title}>
              <span>노선 편성</span>
              <span className={styles.star}>*</span>
            </div>

            <RoutePlanner />
          </div>
        </div>
      </div>
    </div>
  )
}