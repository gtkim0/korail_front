import styles from './CrowdingBadge.module.scss'
import clsx from "clsx";
import React from "react";

interface Props {
    // 1 = 심각 , 2 = 혼잡 , 3 = 주의 , 4 = 보통
    level: 1 | 2 | 3 | 4;
    percent?: number;
    noBoxShadow?: boolean;
}

export default function CrowdingBadge({level, percent, noBoxShadow = false}: Props) {
    const data = {
        1: {className: styles.critical, title: "심각"},
        2: {className: styles.congested, title: "혼잡"},
        3: {className: styles.warning, title: "주의"},
        4: {className: styles.normal, title: "보통"},
    }
    const element = data[level]
    return <div className={clsx(styles.badge, element.className, noBoxShadow && styles.noBoxShadow)}>
        <div className={styles.o}></div>
        <span className={styles.title}>{element.title}</span>
        {
            percent && <span className={styles.per}>{percent}%</span>
        }
    </div>
}