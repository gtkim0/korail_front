'use client';
import styles from './DashBoardView.module.scss'
import TopLeftSection from "@/features/dashboard/components/TopLeftSection/TopLeftSection";
import TopRightSection from "@/features/dashboard/components/TopRightSection/TopRightSection";
import TrainCrowdingStatus from "@/features/dashboard/components/TrainCrowdingStatus/TrainCrowdingStatus";
import RealTimeStatus from "@/features/dashboard/components/RealTimeStatus/RealTimeStatus";
import StationCrowdingStatus from "@/features/dashboard/components/StationCrowdingStatus/StationCrowdingStatus";
import CongestionBarChart from "@/features/dashboard/components/CongestionBarChart/CongestionBarChart";
import React, {useState} from "react";
import {SearchTargetType, searchTargetInit} from "@/types/dashboard";
import {AnimatePresence, motion} from "framer-motion";
import SectionCrowdingStatus from "@/features/dashboard/components/SectionCrowdingStatus/SectionCrowdingStatus";
import useModal from "@/shared/hooks/useModal";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import CrowdingModal from "@/features/dashboard/components/CrowdingModal/CrowdingModal";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import BoxHeader from "@/features/dashboard/components/BoxHeader/BoxHeader";
import TopCenterSection from "@/features/dashboard/components/TopCenterSection/TopCenterSection";

export default function DashboardView() {
    const [searchTarget, setSearchTarget] = useState<SearchTargetType>(searchTargetInit);
    const {isOpen, open, close} = useModal();
    const func = () => {
    }

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
                                <TrainCrowdingStatus/>
                            </div>
                            <div className={styles.box_container} style={{flex: "1 1 0"}}>
                                <BoxHeader name={"하행 도착 정보"} time={"14:00"}/>
                                <TrainCrowdingStatus/>
                            </div>
                        </motion.div>
                        : <motion.div className={styles.left_box} key="not_station" initial={{opacity: 0}}
                                      animate={{opacity: 1}} exit={{opacity: 0}}
                                      transition={{duration: 0.25, ease: 'easeInOut'}}>
                            <div className={styles.box_container} style={{flex: "0 0 auto", overflow: "hidden"}}>
                                <BoxHeader name={"열차 혼잡도 통계"} time={"14:00"}/>
                                <CongestionBarChart
                                    searchTarget={searchTarget}
                                    levels={[
                                        {key: 'normal', label: '보통', count: 402, percent: 60},
                                        {key: 'warning', label: '주의', count: 108, percent: 18},
                                        {key: 'congested', label: '혼잡', count: 94, percent: 14},
                                        {key: 'critical', label: '심각', count: 32, percent: 8},
                                    ]}
                                    data={[
                                        {name: "경부선", normal: 21, warning: 30, congested: 10, critical: 3},
                                        {name: "경의중앙선", normal: 10, warning: 22, congested: 30, critical: 5},
                                        {name: "경강선", normal: 30, warning: 40, congested: 20, critical: 8},
                                        {name: "경춘선", normal: 14, warning: 20, congested: 50, critical: 2},
                                        {name: "동해선", normal: 26, warning: 24, congested: 12, critical: 4},
                                        {name: "ss", normal: 26, warning: 24, congested: 12, critical: 4},
                                    ]}
                                />
                            </div>
                            <div className={styles.box_container} style={{flex: "1 1 0"}}>
                                <BoxHeader name={"열차 혼잡도 현황"} time={"14:00"}/>
                                <TrainCrowdingStatus/>
                            </div>
                        </motion.div>}
                </AnimatePresence>
                {/*center section*/}
                <AnimatePresence mode="wait">
                    <motion.div className={styles.center_box} key={searchTarget.type} initial={{opacity: 0}}
                                animate={{opacity: 1}} exit={{opacity: 0}}
                                transition={{duration: 0.25, ease: 'easeInOut'}}>
                        <RealTimeStatus searchTarget={searchTarget}/>
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
                                    levels={[
                                        {key: 'normal', label: '보통', count: 402, percent: 60},
                                        {key: 'warning', label: '주의', count: 108, percent: 18},
                                        {key: 'congested', label: '혼잡', count: 94, percent: 14},
                                        {key: 'critical', label: '심각', count: 32, percent: 8},
                                    ]}
                                    data={[
                                        {name: "경부선", normal: 21, warning: 30, congested: 10, critical: 3},
                                        {name: "경의중앙선", normal: 10, warning: 22, congested: 30, critical: 5},
                                        {name: "경강선", normal: 30, warning: 40, congested: 20, critical: 8},
                                        {name: "경춘선", normal: 14, warning: 20, congested: 50, critical: 2},
                                        {name: "동해선", normal: 26, warning: 24, congested: 12, critical: 4}
                                    ]}
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
            <BaseModal
                title={"역사 혼잡도 심각 목록"}
                isOpen={isOpen}
                onCloseAction={close}
                isDashboard={true}
                footer={<BaseModalFooter close={close} onSubmit={func} isDashboard={true}/>}
            >
                <CrowdingModal/>
            </BaseModal>
        </div>)
}