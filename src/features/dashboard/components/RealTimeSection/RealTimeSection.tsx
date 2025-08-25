// 대시보드 - 혼잡도 실시간 현황
import styles from "./RealTimeSection.module.scss"
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import Image from "next/image";
import React, {useState} from "react";
import clsx from "clsx";
import {motion} from "framer-motion";
import DownUp from '@/shared/assets/images/down_up.svg'
import {SearchTargetType} from "@/types/dashboard";
import OlMap from "@/features/dashboard/components/OlMap/OlMap";
import LineRealTime from "@/features/dashboard/components/LineRealTime/LineRealTime";
import resetIcon from "@/shared/assets/images/reset.svg"
import SpecialPeriodInfo from "@/features/dashboard/components/SpecialPeriodInfo/SpecialPeriodInfo";
import RealTimeStationList from "@/features/dashboard/components/RealTimeStationList/RealTimeStationList";
import RealTimeLineList from "@/features/dashboard/components/RealTimeLineList/RealTimeLineList";

interface Props {
    searchTarget: SearchTargetType
}

export default function RealTimeSection({searchTarget}: Props) {
    const [activeCrowding, setActiveCrowding] = useState(null);
    return <>
        <div className={styles.container}>
            <div className={styles.left_content}>
                <div className={styles.header}>
                    <Image
                        src={'/train.svg'}
                        alt={""}
                        width={24}
                        height={24}
                        priority
                        style={{objectFit: 'contain', margin: "6px 0"}}
                    />
                    <div className={styles.text}>
                        <span className={styles.title}>역사 혼잡도 <br/> 실시간 현황</span>
                        <span className={styles.time}>( 구역 수, 14:00 기준 )</span>
                    </div>
                    <button className={styles.refresh}>
                        <ImageWrapper src={resetIcon}/>
                    </button>

                </div>
                <div className={styles.item_container}>
                    <div className={clsx(styles.item, activeCrowding == "보통" && styles.active)}
                         onClick={() => {
                             if (activeCrowding == "보통") {
                                 setActiveCrowding(null)
                             } else {
                                 setActiveCrowding("보통")
                             }
                         }}>
                        <div className={styles.step_box}>보통</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                    <div className={clsx(styles.item, activeCrowding == "주의" && styles.active)}
                         onClick={() => {
                             if (activeCrowding == "주의") {
                                 setActiveCrowding(null)
                             } else {
                                 setActiveCrowding("주의")
                             }
                         }}>
                        <div className={styles.step_box}>주의</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                    <div className={clsx(styles.item, activeCrowding == "혼잡" && styles.active)}
                         onClick={() => {
                             if (activeCrowding == "혼잡") {
                                 setActiveCrowding(null)
                             } else {
                                 setActiveCrowding("혼잡")
                             }
                         }}>
                        <div className={styles.step_box}>혼잡</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                    <div className={clsx(styles.item, activeCrowding == "심각" && styles.active)}
                         onClick={() => {
                             if (activeCrowding == "심각") {
                                 setActiveCrowding(null)
                             } else {
                                 setActiveCrowding("심각")
                             }
                         }}>
                        <div className={styles.step_box}>심각</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                </div>
                <div className={styles.list_container}>
                    {
                        searchTarget.type == "station" ? <RealTimeStationList/> : <RealTimeLineList/>
                    }
                </div>
            </div>
            <div className={styles.right_content}>
                {searchTarget.type == "all" ? <OlMap/> : searchTarget.type == "line" ? <LineRealTime/> :
                    <div className={styles.img_wrap}>
                        <Image src={'/exam_exit.svg'} alt={""} fill
                               style={{objectFit: "contain", background: "#fff", borderRadius: "12px"}}/>
                    </div>}
            </div>
        </div>
        <SpecialPeriodInfo/>
    </>
}