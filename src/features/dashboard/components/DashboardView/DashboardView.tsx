'use client';
import styles from './DashBoardView.module.scss'
import RouteDropDown from "@/features/dashboard/components/RouteDropDown/RouteDropDown";
import Timer from "@/features/dashboard/components/Timer/Timer";
import TrainCrowdingStatus from "@/features/dashboard/components/TrainCrowdingStatus/TrainCrowdingStatus";
import RealtimeStatus from "@/features/dashboard/components/RealtimeStatus/RealtimeStatus";
import StationCrowding from "@/features/dashboard/components/StationCrowding/StationCrowding";
import CongestionBarChart from "@/features/dashboard/components/CongestionBarChart/CongestionBarChart";
import React from "react";

export default function DashboardView() {
    return (
        <div className={styles.container}>
            <div className={styles.top_contents}>
                <div className={styles.route_select}>
                    <button className={styles.total_route_button}>전체 노선 보기</button>
                    <RouteDropDown/>
                </div>
                <Timer/>
            </div>
            <div className={styles.bottom_contents}>
                <div className={styles.train_crowding}>
                    <div className={styles.box_container}>
                        <div className={styles.box_header}>열차 혼잡도 통계 <span
                            className={styles.box_time}>(편성 수, 14:00 기준)</span></div>
                        <CongestionBarChart
                            time="14:00"
                            levels={[
                                {key: 'normal', label: '보통', count: 402, percent: 60},
                                {key: 'warning', label: '주의', count: 108, percent: 18},
                                {key: 'congested', label: '혼잡', count: 94, percent: 14},
                                {key: 'critical', label: '심각', count: 32, percent: 8},
                            ]}
                            title={"열차"}
                            data={[
                                {name: "경부선", normal: 21, warning: 30, congested: 10, critical: 3},
                                {name: "경의중앙선", normal: 10, warning: 22, congested: 30, critical: 5},
                                {name: "경강선", normal: 30, warning: 40, congested: 20, critical: 8},
                                {name: "경춘선", normal: 14, warning: 20, congested: 50, critical: 2},
                                {name: "동해선", normal: 26, warning: 24, congested: 12, critical: 4}
                            ]}
                        />
                    </div>
                    <div className={styles.box_container} style={{flexGrow: "1"}}>
                        <div className={styles.box_header}>열차 혼잡도 현황 <span
                            className={styles.box_time}>(편성 수, 14:00 기준)</span></div>
                        <TrainCrowdingStatus/>
                    </div>
                </div>
                <div className={styles.realtime_status}>
                    <RealtimeStatus/>
                </div>
                <div className={styles.station_crowding}>
                    <StationCrowding/>
                </div>
            </div>
        </div>)
}