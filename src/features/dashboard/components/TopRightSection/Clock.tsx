import React, {useEffect, useState} from "react";
import styles from "@/features/dashboard/components/TopRightSection/TopRightSection.module.scss";
import {format} from "date-fns";
import {ko} from "date-fns/locale";

export default function Clock() {
    const [now, setNow] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval)
    }, []);
     return    <div className={styles.timer}>
         <span className={styles.date}>{format(now, "yyyy-MM-dd")}</span>
         <span className={styles.date}>{format(now, "eee", {locale: ko})}</span>
         <span className={styles.time}>{format(now, "hh:mm")}</span>
         <span className={styles.time}>{format(now, "a").toUpperCase()}</span>
     </div>
}