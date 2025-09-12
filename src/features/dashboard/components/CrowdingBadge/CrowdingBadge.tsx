import styles from './CrowdingBadge.module.scss'
import clsx from "clsx";
import React from "react";
import {useCongestStepStore} from "@/shared/store/slice/congestStepSlice";
import {hexToRgba} from "@/utils/darkenHexColor";

interface Props {
    // 1 = 심각 , 2 = 혼잡 , 3 = 주의 , 4 = 보통
    level: 1 | 2 | 3 | 4;
    percent?: number;
    noBoxShadow?: boolean;
    className?: string;
}

export default function CrowdingBadge({level, percent, noBoxShadow = false, className}: Props) {
    const {congestStep} = useCongestStepStore();

    const step = congestStep.find((s) => s.dgcnStgNo === level);
    if (!step) return null;
    return <div className={clsx(styles.badge, noBoxShadow && styles.noBoxShadow, className)}
                style={{
                    background: `${hexToRgba(step.indctClorNo, 0.2)}`,
                    boxShadow: `0 0 8px 0 #${step.indctClorNo}`,
                    border: `1px solid #${step.indctClorNo}`
                }}>
        <div className={styles.o}
             style={{background: `#${step.indctClorNo}`, boxShadow: `0 0 8px 0 #${step.indctClorNo}`}}></div>
        <span className={styles.title}>{step.stgNm}</span>
        {
            percent && <span className={styles.per} style={{color: `#${step.indctClorNo}`}}>{percent}%</span>
        }
    </div>
}