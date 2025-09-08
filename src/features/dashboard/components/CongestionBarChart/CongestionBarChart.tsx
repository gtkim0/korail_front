'use client';
import React, {useEffect, useState} from 'react';
import styles from './CongestionBarChart.module.scss';
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {SearchTargetType} from "@/types/dashboard";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import Refresh from "@/features/dashboard/components/Refresh/Refresh";
import {useCongestStepStore} from "@/shared/store/slice/congestStepSlice";
import _ from "lodash";


// type DataKey = "name" | "normal" | "warning" | "congested" | "critical";
// type keyValue = {
//     [key in DataKey]: string | number
// }

interface Props {
    searchTarget: SearchTargetType;
}

export default function CongestionBarChart({searchTarget}: Props) {

    const dummyData = [
        {
            name: "경부선",
            arr: [{dgcnStgNo: 1, cnt: 6}, {dgcnStgNo: 2, cnt: 7}, {dgcnStgNo: 3, cnt: 8}, {dgcnStgNo: 4, cnt: 2}]
        },
        {
            name: "경의중앙선",
            arr: [{dgcnStgNo: 1, cnt: 10}, {dgcnStgNo: 2, cnt: 12}, {dgcnStgNo: 3, cnt: 25}, {dgcnStgNo: 4, cnt: 1}]
        },
        {
            name: "경강선",
            arr: [{dgcnStgNo: 1, cnt: 7}, {dgcnStgNo: 2, cnt: 3}, {dgcnStgNo: 3, cnt: 18}, {dgcnStgNo: 4, cnt: 5}]
        },
        {
            name: "경춘선",
            arr: [{dgcnStgNo: 1, cnt: 10}, {dgcnStgNo: 2, cnt: 20}, {dgcnStgNo: 3, cnt: 2}, {dgcnStgNo: 4, cnt: 14}]
        },
        {
            name: "동해선",
            arr: [{dgcnStgNo: 1, cnt: 21}, {dgcnStgNo: 2, cnt: 3}, {dgcnStgNo: 3, cnt: 9}, {dgcnStgNo: 4, cnt: 16}]
        },

    ]
    // 혼잡도 데이터와 혼잡도 단계 데이터를 가공해서 통계를 내야함 아래 형태로
    const levels = [
        {key: 'normal', label: '보통', count: 402, percent: 60},
        {key: 'warning', label: '주의', count: 108, percent: 18},
        {key: 'congested', label: '혼잡', count: 94, percent: 14},
        {key: 'critical', label: '심각', count: 32, percent: 8},
    ]
    const [animatedPercents, setAnimatedPercents] = useState<number[]>([]);
    const [showBadges, setShowBadges] = useState<boolean>(false);
    const {congestStep} = useCongestStepStore();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedPercents(levels.map(level => level.percent));
        }, 100);

        const badgeTimeout = setTimeout(() => {
            setShowBadges(true);
        }, 800);

        return () => {
            clearTimeout(timeout);
            clearTimeout(badgeTimeout);
        };
    }, [levels]);

    //테이블에 맞게 가공하는 함수
    const transformData = (data: typeof dummyData) => {
        return data.map(item => ({
            name: item.name,
            ..._.mapValues(_.keyBy(item.arr, "dgcnStgNo"), "cnt"),
        }));
    };
    // 테이블 컬럼 생성
    const columns = congestStep.map((el) => {
        return {
            accessorKey: `${el.dgcnStgNo}`, header: el.stgNm, enableSorting: false, cell: info => {
                const value = info.getValue<string>()
                return <span style={{color: `#${el.indctClorNo}`}}>{value}</span>
            }
        }
    })

    return (
        <>
            <div className={styles.chart}>
                {congestStep.map((level, index) => (
                    <div key={level.dgcnStgNo} className={styles.row}>
                        <div className={styles.label}
                             style={{
                                 backgroundColor: `#${level.indctClorNo}`,
                                 boxShadow: `0 0 8px 0 #${level.indctClorNo}`
                             }}>{level.stgNm}</div>
                        <div className={styles.barArea}>
                            <div
                                className={styles.barFill}
                                style={{
                                    width: `${animatedPercents[index] || 0}%`,
                                    transition: 'width 0.6s ease-out',
                                    background: `repeating-linear-gradient(
                    90deg,
                    #${level.indctClorNo},
                    #${level.indctClorNo} 2px,
                    transparent 2px,
                    transparent 4px
    )`
                                }}
                            >
                                <div
                                    className={clsx([styles.badge, showBadges && styles.showBadge])}
                                    style={{
                                        color: `#${level.indctClorNo}`,
                                    }}
                                >
                                    13
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <AnimatePresence initial={false}>
                {searchTarget.type == "all" &&
                    <motion.div
                        className={styles.table}
                        key="table"
                        initial={{height: 0, opacity: 0, y: -5}}
                        animate={{height: 'auto', opacity: 1, y: 0}}
                        exit={{height: 0, opacity: 0, y: -5}}
                        transition={{duration: 0.25, ease: 'easeInOut'}}>
                        <Refresh/>
                        <Table<T>
                            columns={[
                                {accessorKey: "name", header: "노선", enableSorting: false},
                                ...columns
                            ]}
                            data={transformData(dummyData)}
                            minWidth={"0"}
                        />
                    </motion.div>}
            </AnimatePresence>

        </>
    );
}