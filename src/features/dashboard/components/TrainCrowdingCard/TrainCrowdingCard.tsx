import styles from './TrainCrowdingCard.module.scss'
import Image from "next/image";
import React from "react";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";

export default function TrainCrowdingCard() {
    return <div className={styles.container}>
        <div className={styles.top}>
            <Image
                src={"/line-outline.svg"}
                alt={"err"}
                width={20}
                height={20}
                priority
                style={{objectFit: 'contain'}}
            />
            <span className={styles.name}>경의중앙선</span>
            <span>K0660</span>
            <span className={styles.express}>급</span>
            <CrowdingBadge level={1} percent={21} noBoxShadow={true} className={styles.margin}/>
        </div>
        <div className={styles.bottom}>
            <span>가산디지털단지역</span>
            <Image src={"/arrow_circle_right.svg"} alt={""} width={24} height={24}/>
            <span>인천역</span>
        </div>
    </div>
}