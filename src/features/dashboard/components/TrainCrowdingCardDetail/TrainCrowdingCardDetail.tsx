import styles from "./TrainCrowdingCardDetail.module.scss";
import Image from "next/image";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import MetroLineAtomic from "@/features/dashboard/components/MetroLineAtomic/MetroLineAtomic";
import React from "react";
import arrowIcon from "@/shared/assets/images/left-arrow.svg"

interface Props {
    data: any
}

export default function TrainCrowdingCardDetail({data}: Props) {
    return <div className={styles.item}>
        <div className={styles.item_header}>
            <div className={styles.train_name}>
                <Image
                    src={"/line-outline.svg"}
                    alt={"err"}
                    width={16}
                    height={16}
                    priority
                    style={{objectFit: 'contain'}}
                />
                <span>{data?.line}</span>
                <span className={styles.train_num}>{data?.train}</span>
            </div>
            <CrowdingBadge level={data?.level} percent={data?.percent}/>
        </div>
        <div className={styles.item_content}>
            <div className={styles.item_route}>
                <div className={styles.departure_defore}>{data?.status}</div>
                <div className={styles.route}>
                    <span className={styles.station}>{data?.startRoute}</span>
                    <Image src={arrowIcon} alt=""/>
                    <span className={styles.station}>{data?.endRoute}</span>
                </div>
            </div>
            <div className={styles.item_train}>
                {data?.trains?.map((el, idx) => {
                    return <MetroLineAtomic label={el} key={idx}/>
                })}
            </div>
        </div>
    </div>
}