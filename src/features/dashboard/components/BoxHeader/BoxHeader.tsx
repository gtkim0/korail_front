import styles from "@/features/dashboard/components/DashboardView/DashBoardView.module.scss";
import Image from "next/image";
import React from "react";
import icon from "@/shared/assets/images/train.svg"

interface Props {
    name: string;
    time?: string;
}

export default function BoxHeader({name, time}: Props) {
    return (
        <div className={styles.box_header}>
            <Image
                src={icon}
                alt={""}
            />{name}
            {time && <span className={styles.box_time}>(편성 수, {time} 기준)</span>}
        </div>)
}