import styles from "@/features/dashboard/components/DashboardView/DashBoardView.module.scss";
import Image from "next/image";
import React from "react";

interface Props {
    name: string;
    time: string;
}

export default function DashBoardBoxHeader({name, time}: Props) {
    return (
        <div className={styles.box_header}>
            <Image
                src={'/train.svg'}
                alt={""}
                width={20}
                height={20}
            />{name}
            <span className={styles.box_time}>(편성 수, {time} 기준)</span>
        </div>)
}