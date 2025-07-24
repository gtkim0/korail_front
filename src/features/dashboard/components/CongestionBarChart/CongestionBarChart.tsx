'use client';
import React, {useEffect, useState} from 'react';
import styles from './CongestionBarChart.module.scss';

interface CongestionLevel {
  label: string;
  key: 'normal' | 'warning' | 'congested' | 'critical';
  count: number;
  percent: number; // 0 ~ 100
}

interface CongestionBarChartProps {
  levels: CongestionLevel[];
  time: string;
}

export default function CongestionBarChart({ levels, time }: CongestionBarChartProps) {

  const [animatedPercents, setAnimatedPercents] = useState<number[]>([]);
  const [showBadges, setShowBadges] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedPercents(levels.map(level => level.percent));
    }, 100);

    const badgeTimeout = setTimeout(() => {
      setShowBadges(true);
    }, 800);

    return () => {
      clearTimeout(timeout);
      clearTimeout(badgeTimeout);
    };
  }, [levels]);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        🚋 역사 혼잡도 통계 <span className={styles.time}>{time} 기준</span>
      </div>
      <div className={styles.chart}>
        {levels.map((level, index) => (
          <div key={level.key} className={styles.row}>
            <div className={`${styles.label} ${styles[level.key]}`}>{level.label}</div>
            <div className={styles.barArea}>
              <div
                className={`${styles.barFill} ${styles[level.key]}`}
                style={{ width: `${animatedPercents[index] || 0}%`, transition: 'width 0.6s ease-out' }}
              >
                <div
                  className={`${styles.badge} ${styles[level.key]} ${showBadges ? styles.showBadge : ''}`}
                >
                  {level.count}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}