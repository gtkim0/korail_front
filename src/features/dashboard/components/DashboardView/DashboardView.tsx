'use client';
import styles from './DashBoardView.module.scss'
import TopLeftSection from "@/features/dashboard/components/TopLeftSection/TopLeftSection";
import TopRightSection from "@/features/dashboard/components/TopRightSection/TopRightSection";
import TrainCrowdingStatus from "@/features/dashboard/components/TrainCrowdingStatus/TrainCrowdingStatus";
import RealTimeSection from "@/features/dashboard/components/RealTimeSection/RealTimeSection";
import StationCrowdingStatus from "@/features/dashboard/components/StationCrowdingStatus/StationCrowdingStatus";
import CongestionBarChart from "@/features/dashboard/components/CongestionBarChart/CongestionBarChart";
import React, {useEffect, useState} from "react";
import {DashBoardProps, searchTargetInit, SearchTargetType} from "@/types/dashboard";
import {AnimatePresence, motion} from "framer-motion";
import SectionCrowdingStatus from "@/features/dashboard/components/SectionCrowdingStatus/SectionCrowdingStatus";
import BoxHeader from "@/features/dashboard/components/BoxHeader/BoxHeader";
import ArrivalInfo from "@/features/dashboard/components/ArrivalInfo/ArrivalInfo";
import {useCongestStepStore} from "@/shared/store/slice/congestStepSlice";


export default function DashboardView({initialData}: DashBoardProps) {
    const [searchTarget, setSearchTarget] = useState<SearchTargetType>(searchTargetInit);
    const {setCongestStep} = useCongestStepStore();
    useEffect(() => {
        console.log(initialData)
        if (initialData.settingRes) {
            setCongestStep(initialData.settingRes.tPtlDgcnCrtrms)
        }

    }, [initialData]);

    return (
        <div className={styles.container}>
            <div className={styles.top_contents}>
                <TopLeftSection setSearchTarget={setSearchTarget} searchTarget={searchTarget}/>
                {/*<TopCenterSection/>*/}
                <TopRightSection/>
            </div>
            <div className={styles.bottom_contents}>
                {/*left section*/}
                <AnimatePresence mode="wait">
                    {searchTarget.type == "station" ?
                        <motion.div className={styles.left_box} key="station" initial={{opacity: 0}}
                                    animate={{opacity: 1}} exit={{opacity: 0}}
                                    transition={{duration: 0.25, ease: 'easeInOut'}}>
                            <div className={styles.box_container} style={{flex: "1 1 0"}}>
                                <BoxHeader name={"상행 도착 정보"} time={"14:00"}/>
                                <ArrivalInfo/>
                            </div>
                            <div className={styles.box_container} style={{flex: "1 1 0"}}>
                                <BoxHeader name={"하행 도착 정보"} time={"14:00"}/>
                                <ArrivalInfo/>
                            </div>
                        </motion.div>
                        : <motion.div className={styles.left_box} key="not_station" initial={{opacity: 0}}
                                      animate={{opacity: 1}} exit={{opacity: 0}}
                                      transition={{duration: 0.25, ease: 'easeInOut'}}>
                            <div className={styles.box_container} style={{flex: "0 0 auto", overflow: "hidden"}}>
                                <BoxHeader name={"열차 혼잡도 통계"} time={"14:00"}/>
                                <CongestionBarChart
                                    searchTarget={searchTarget}
                                />
                            </div>
                            <div className={styles.box_container} style={{flex: "1 1 0"}}>
                                {/*열차 혼잡도 현황*/}
                                <TrainCrowdingStatus/>
                            </div>
                        </motion.div>}
                </AnimatePresence>
                {/*center section*/}
                <AnimatePresence mode="wait">
                    <motion.div className={styles.center_box} key={searchTarget.type} initial={{opacity: 0}}
                                animate={{opacity: 1}} exit={{opacity: 0}}
                                transition={{duration: 0.25, ease: 'easeInOut'}}>
                        <RealTimeSection searchTarget={searchTarget}/>
                    </motion.div>
                </AnimatePresence>
                {/*right section*/}
                <AnimatePresence mode="wait">
                    {searchTarget.type == "station" ?
                        <motion.div className={styles.right_box} key="station" initial={{opacity: 0}}
                                    animate={{opacity: 1}} exit={{opacity: 0}}
                                    transition={{duration: 0.25, ease: 'easeInOut'}}>
                            <div className={styles.box_container} style={{flex: "1"}}>
                                <BoxHeader name={"구역별 실시간 혼잡도"} time={"14:00"}/>
                                <SectionCrowdingStatus/>
                            </div>
                        </motion.div> :
                        <motion.div className={styles.right_box} key="not_station" initial={{opacity: 0}}
                                    animate={{opacity: 1}} exit={{opacity: 0}}
                                    transition={{duration: 0.25, ease: 'easeInOut'}}>
                            <div className={styles.box_container} style={{flex: "0 0 auto", overflow: "hidden"}}>
                                <BoxHeader name={"역사 혼잡도 통계"} time={"14:00"}/>
                                <CongestionBarChart
                                    searchTarget={searchTarget}
                                />
                            </div>
                            <div className={styles.box_container} style={{flex: "1 1 0"}}>
                                <BoxHeader name={"역사 혼잡도 현황"} time={"14:00"}/>
                                <StationCrowdingStatus/>
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>)
}