'use client';
import React, {useEffect, useState} from 'react';
import styles from './CongestionBarChart.module.scss';
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {SearchTargetType} from "@/types/dashboard";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";

interface CongestionLevel {
    label: string;
    key: 'normal' | 'warning' | 'congested' | 'critical';
    count: number;
    percent: number;
}

type DataKey = "name" | "normal" | "warning" | "congested" | "critical";
type keyValue = {
    [key in DataKey]: string | number
}

interface Props {
    levels: CongestionLevel[];
    data: keyValue[]
    searchTarget: SearchTargetType;
}

export default function CongestionBarChart({levels, data, searchTarget}: Props) {

    const [animatedPercents, setAnimatedPercents] = useState<number[]>([]);
    const [showBadges, setShowBadges] = useState<boolean>(false);

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

    return (
        <>
            <div className={styles.chart}>
                {levels.map((level, index) => (
                    <div key={level.key} className={styles.row}>
                        <div className={clsx(styles.label, styles[level.key])}>{level.label}</div>
                        <div className={styles.barArea}>
                            <div
                                className={clsx(styles.barFill, styles[level.key])}
                                style={{width: `${animatedPercents[index] || 0}%`, transition: 'width 0.6s ease-out'}}
                            >
                                <div
                                    className={clsx([styles.badge, styles[level.key], showBadges && styles.showBadge])}
                                >
                                    {level.count}
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
                        <Table<T>
                            columns={[
                                {accessorKey: "name", header: "노선", enableSorting: false},
                                {
                                    accessorKey: "normal", header: "보통", enableSorting: false, cell: info => {
                                        const value = info.getValue<string>()
                                        return <span style={{color: "#009856"}}>{value}</span>
                                    }
                                },
                                {
                                    accessorKey: "warning", header: "주의", enableSorting: false, cell: info => {
                                        const value = info.getValue<string>()
                                        return <span style={{color: "#ffb800"}}>{value}</span>
                                    }
                                },
                                {
                                    accessorKey: "congested", header: "혼잡", enableSorting: false, cell: info => {
                                        const value = info.getValue<string>()
                                        return <span style={{color: "#ff6b00"}}>{value}</span>
                                    }
                                },
                                {
                                    accessorKey: "critical", header: "심각", enableSorting: false, cell: info => {
                                        const value = info.getValue<string>()
                                        return <span style={{color: "#e60012"}}>{value}</span>
                                    }
                                }
                            ]}
                            data={data}
                            minWidth={"0"}
                        />
                    </motion.div>}
            </AnimatePresence>

        </>
    );
}