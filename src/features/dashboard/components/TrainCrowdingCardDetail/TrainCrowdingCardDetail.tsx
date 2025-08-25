import styles from "./TrainCrowdingCardDetail.module.scss";
import Image from "next/image";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import MetroLineAtomic from "@/features/dashboard/components/MetroLineAtomic/MetroLineAtomic";
import React from "react";
import arrowIcon from "@/shared/assets/images/left-arrow.svg"

export default function TrainCrowdingCardDetail() {
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
                <span>1호선 인천행</span>
                <span className={styles.train_num}>K0660</span>
            </div>
            <CrowdingBadge level={1} percent={21}/>
        </div>
        <div className={styles.item_content}>
            <div className={styles.item_route}>
                <div className={styles.departure_defore}>전역출발</div>
                <div className={styles.route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    <Image src={arrowIcon} alt=""/>
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
            </div>
            <div className={styles.item_train}>
                <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>
                <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>
                <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>
                <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
                <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
                <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
                <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
                <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
                <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
                <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
            </div>
        </div>
    </div>
}