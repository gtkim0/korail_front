import styles from './CongestionEquipStatusSubFilter.module.scss'

export default function CongestionEquipStatusSubFilter() {
  return (
    <div className={styles.container}>
      <span>실시간 오류</span>
      <div className={styles.line}></div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <span className={styles.title}>CCTV 연결오류 건수</span>
          <span className={styles.value}>0건</span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.title}>서버통신 오류 건수</span>
          <span className={styles.value}>0건</span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.title}>분석모듈 오류 건수</span>
          <span className={styles.value}>0건</span>
        </div>
      </div>
    </div>
  )
}