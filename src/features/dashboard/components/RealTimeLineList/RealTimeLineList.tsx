import React, {useState} from "react";
import styles from "./RealTimeLineList.module.scss"
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import Image from "next/image";
import DownUp from "@/shared/assets/images/down_up.svg";
import TrainCrowdingCard from "@/features/dashboard/components/TrainCrowdingCard/TrainCrowdingCard";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";

export default function RealTimeLineList() {
    const [activeTab, setActiveTab] = useState<"train" | "station">("train");
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
    return <div className={styles.container}>
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
        <div className={styles.list_container}>
            <AnimatePresence mode="sync">
                {activeTab == "train" ?
                    <motion.div key={"train"} initial={{x: "-100%", opacity: 0}} animate={{x: 0, opacity: 1}}
                                exit={{x: "-100%", opacity: 0}} transition={{duration: 0.4}} className={styles.list}>
                        {data.map((el, idx) => {
                            return <TrainCrowdingCard key={`train_crowding_card_${idx}`}/>
                        })}
                    </motion.div> :
                    <motion.div key={"station"} initial={{x: "100%", opacity: 0}} animate={{x: 0, opacity: 1}}
                                exit={{x: "100%", opacity: 0}} transition={{duration: 0.4}} className={styles.list}
                    >
                        {data.map((el, idx) => {
                            return <div className={styles.station_item} key={`station_crowding_card_${idx}`}>
                                <Image
                                    src={"/line-outline.svg"}
                                    alt={"err"}
                                    width={20}
                                    height={20}
                                    priority
                                    style={{objectFit: 'contain'}}
                                /><span className={styles.station_title}>가산디지털단지역</span>
                                <CrowdingBadge level={1} percent={21} noBoxShadow={true} className={styles.margin}/>
                            </div>
                        })}
                    </motion.div>}

            </AnimatePresence>
        </div>
    </div>
}