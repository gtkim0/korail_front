// 대시 보드 우측 상단 타이머
import styles from "@/features/dashboard/components/DashboardView/DashBoardView.module.scss";
import {useEffect, useState} from "react";
import {format} from "date-fns";

export default function Timer() {
    const [now, setNow] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval)
    }, []);
    return (<div className={styles.timer}>
        <span className={styles.date}>{format(now, "yyyy-MM-dd")}</span>
        <span className={styles.time}>{format(now, "hh:mm")}</span>
        <span className={styles.time}>{format(now, "a").toUpperCase()}</span>
    </div>)
}