// 대시보드 - 혼잡도 실시간 현황
import styles from "./RealTimeStatus.module.scss"
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

interface Props {
    searchTarget: SearchTargetType
}

export default function RealTimeStatus({searchTarget}: Props) {
    const [activeTab, setActiveTab] = useState<"train" | "station">("train")
    const data = [{line: "경인선", img: "",}]
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
                    <div className={styles.item}>
                        <div className={styles.step_box}>보통</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.step_box}>보통</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.step_box}>보통</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.step_box}>보통</div>
                        <span className={styles.step_num}>134</span>
                    </div>
                </div>
                <div className={styles.list_container}>
                    <div className={styles.tab}>
                        <motion.div className={styles.tab_bg} layout
                                    transition={{type: "spring", stiffness: 500, damping: 30}}
                                    style={{left: `${activeTab == "train" ? "0%" : "50%"}`}}></motion.div>
                        <div className={clsx(styles.tab_item, activeTab == "train" && styles.active)}
                             onClick={() => {
                                 setActiveTab("train")
                             }}>열차별
                        </div>
                        <div className={clsx(styles.tab_item, activeTab == "station" && styles.active)}
                             onClick={() => {
                                 setActiveTab("station")
                             }}>역사별
                        </div>
                    </div>
                    <div className={styles.button_wrap}>
                        <button>
                            <span>오름차순</span>
                            <Image
                                src={DownUp}
                                alt={"오름차순"}
                            />
                        </button>
                    </div>
                    <div className={styles.list}></div>
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