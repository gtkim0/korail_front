'use client';
import React, {useEffect, useState} from 'react';
import styles from './CongestionBarChart.module.scss';
import Table from "@/shared/components/table/BaseTable/BaseTable";

interface CongestionLevel {
    label: string;
    key: 'normal' | 'warning' | 'congested' | 'critical';
    count: number;
    percent: number;
}

type dataKey = "name" | "normal" | "warning" | "congested" | "critical";
type keyValue = {
    key: dataKey;
    value: string | number
}

interface CongestionBarChartProps {
    levels: CongestionLevel[];
    time: string;
    title: string;
    data: keyValue[]
}

export default function CongestionBarChart({levels, time, title, data}: CongestionBarChartProps) {

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
                        <div className={`${styles.label} ${styles[level.key]}`}>{level.label}</div>
                        <div className={styles.barArea}>
                            <div
                                className={`${styles.barFill} ${styles[level.key]}`}
                                style={{width: `${animatedPercents[index] || 0}%`, transition: 'width 0.6s ease-out'}}
                            >
                                <div
                                    className={`${styles.badge} ${styles[level.key]} ${showBadges ? styles.showBadge : ''}`}
                                >
                                    {level.count}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.table}>
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
            </div>
        </>
    );
}