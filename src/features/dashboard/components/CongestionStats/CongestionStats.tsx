'use client';
import React, {useEffect, useState} from 'react';
import styles from './CongestionStats.module.scss';
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import {useCongestStepStore} from "@/shared/store/slice/congestStepSlice";
import _ from "lodash";
import {useDashboardSelectStore} from "@/shared/store/slice/dashboardSelectSlice";
import {CongStatsResType, RouteCongestionType, StageSummaryType} from "@/types/congestion-stats";
import {useQuery} from "@tanstack/react-query";
import {useClientApi} from "@/shared/hooks/useClientApi";
import {Empty} from "@/features/dashboard/components/Empty/Empty";


interface Props {
    isTrain: boolean
    initialData: CongStatsResType;
}

export default function CongestionStats({isTrain, initialData}: Props) {
    const {searchTarget} = useDashboardSelectStore();

    const url = isTrain ? "/api/dashboards/trains/congestion/statistics" : "/api/dashboards/stations/congestion/statistics"
    const api = useClientApi();

    const {data} = useQuery({
        queryKey: ["CongestionStats", searchTarget, isTrain], queryFn: async () => {
            const res = await api.get(url, {wideRailYn: searchTarget.wideRailYn})
            return res.result
        },
        initialData: initialData
    })

    const [animatedPercents, setAnimatedPercents] = useState<number[]>([]);
    const [showBadges, setShowBadges] = useState<boolean>(false);
    const {congestStep} = useCongestStepStore();


    //테이블에 맞게 가공하는 함수
    const transformData = (data: RouteCongestionType[]) => {
        return data.map(item => ({
            rteNm: item.rteNm,
            ..._.mapValues(_.keyBy(item.stages, "dgcnStgNo"), "stageCnt"),
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
    // 통계 데이터에 맞게 가공하는 함수
    const makeLevels = (total: StageSummaryType[] | undefined) => {
        if (!total || total.length === 0) return [];

        const sum = total.reduce((acc, cur) => acc + cur.stageCnt, 0);

        return total.map(stage => ({
            ...stage,
            percent: sum > 0 ? Math.round((stage.stageCnt / sum) * 100) : 0
        }));
    };
    const levels = makeLevels(data?.total)

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
    }, [data.total]);

    return (
        <>
            <div className={styles.chart}>
                {levels?.length > 0 ? levels.map((level, index) => {
                    const currentStep = congestStep.find(s => s.dgcnStgNo === level.dgcnStgNo);
                    const colorCd = currentStep ? `#${currentStep.indctClorNo}` : "transparent";
                    return <div key={`${level.dgcnStgNo}`} className={styles.row}>
                        <div className={styles.label}
                             style={{
                                 backgroundColor: colorCd,
                                 boxShadow: `0 0 8px 0 ${colorCd}`
                             }}>
                            {level.stgNm}
                        </div>
                        <div className={styles.barArea}>
                            <div
                                className={styles.barFill}
                                style={{
                                    width: `${animatedPercents[index] || 0}%`,
                                    transition: 'width 0.6s ease-out',
                                    background: `repeating-linear-gradient(
                                        90deg,
                                        ${colorCd},
                                        ${colorCd} 2px,
                                        transparent 2px,
                                        transparent 4px
                                    )`
                                }}
                            >
                                {level?.percent > 0 && <div
                                    className={clsx([styles.badge, showBadges && styles.showBadge])}
                                    style={{color: colorCd}}
                                >
                                    {level.stageCnt}
                                </div>}
                            </div>
                        </div>
                    </div>
                }) : <Empty className={styles.empty}/>}
            </div>
            <AnimatePresence initial={false}>
                {searchTarget.type == "all" && data?.list?.length > 0 &&
                    <motion.div
                        className={styles.table}
                        key="table"
                        initial={{maxHeight: 0, opacity: 0}}
                        animate={{maxHeight: 200, opacity: 1}}
                        exit={{maxHeight: 0, opacity: 0}}
                        transition={{duration: 0.25, ease: 'easeInOut'}}>
                        {/*<Refresh/>*/}
                        <main className={styles.inner}>
                            <Table<T>
                                columns={[
                                    {accessorKey: "rteNm", header: "노선", enableSorting: false},
                                    ...columns
                                ]}
                                data={transformData(data?.list)}
                                minWidth={"0"}
                            />
                        </main>
                    </motion.div>}
            </AnimatePresence>

        </>
    );
}