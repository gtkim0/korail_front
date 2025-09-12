// 대시보드 - 혼잡도 실시간 현황
import styles from "./RealTimeSection.module.scss"
import Image from "next/image";
import React, {useState} from "react";
import clsx from "clsx";
import OlMap from "@/features/dashboard/components/OlMap/OlMap";
import LineRealTime from "@/features/dashboard/components/LineRealTime/LineRealTime";
import SpecialPeriodInfo from "@/features/dashboard/components/SpecialPeriodInfo/SpecialPeriodInfo";
import RealTimeStationList from "@/features/dashboard/components/RealTimeStationList/RealTimeStationList";
import RealTimeLineList from "@/features/dashboard/components/RealTimeLineList/RealTimeLineList";
import {useCongestStepStore} from "@/shared/store/slice/congestStepSlice";
import {useDashboardSelectStore} from "@/shared/store/slice/dashboardSelectSlice";

interface Props {

}

export default function RealTimeSection({}: Props) {
    const {searchTarget} = useDashboardSelectStore();
    const [activeCrowding, setActiveCrowding] = useState(null);
    const {congestStep} = useCongestStepStore();
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
                    {/*<button className={styles.refresh}>*/}
                    {/*    <Image src={resetIcon} alt="reset"/>*/}
                    {/*</button>*/}

                </div>
                <div className={styles.item_container}>
                    {congestStep?.map((el, idx) => {
                        return <div className={clsx(styles.item, activeCrowding == el.dgcnStgNo && styles.active)}
                                    key={`congestStep-${idx}`}
                                    onClick={() => {
                                        if (activeCrowding == el.dgcnStgNo) {
                                            setActiveCrowding(null)
                                        } else {
                                            setActiveCrowding(el.dgcnStgNo)
                                        }
                                    }}>
                            <div className={styles.step_box} style={{background: `#${el.indctClorNo}`}}>{el.stgNm}</div>
                            <span className={styles.step_num} style={{color: `#${el.indctClorNo}`}}>134</span>
                        </div>
                    })}
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