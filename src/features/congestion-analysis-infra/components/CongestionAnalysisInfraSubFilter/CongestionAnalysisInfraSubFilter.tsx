import styles from './CongestionAnalysisInfraSubFilter.module.scss';

interface Props {
  date?: string;
}

export default function CongestionAnalysisInfraSubFilter(props: any) {
  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <span>조회날짜</span>
        <span className={styles.date}>
          2025-08-01
        </span>
      </div>

      <div className={styles.line}></div>
      <div className={styles.rightBox}>
        <div className={styles.normalize}>
          <span className={styles.title}>정상수집률</span>
          <span className={styles.percent}>97.3%</span>
        </div>
        <div className={styles.normalize}>
          <span className={styles.title}>평균전송시간</span>
          <span className={styles.percent}>512ms</span>
        </div>
        <div className={styles.errorBox}>
          <div className={styles.errorBoxWrapper}>
            <div className={styles.circle}></div>
            <span>오류건수</span>
          </div>
          <span className={styles.count}>12건</span>
        </div>
      </div>
    </div>
  )
}