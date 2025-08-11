// 대시 보드 우측 상단 타이머
import styles from "./TopRightSection.module.scss";
import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import {ko} from "date-fns/locale"
import alarmIcon from "@/shared/assets/images/bell-filled.svg"
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import Image from "next/image";
import clsx from "clsx";

export default function TopRightSection() {
    const [now, setNow] = useState(new Date())
    const [isOn, setIsOn] = useState<boolean>(false);
    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(interval)
    }, []);
    return (<div className={styles.container}>
            <div className={styles.timer}>
                <span className={styles.date}>{format(now, "yyyy-MM-dd")}</span>
                <span className={styles.date}>{format(now, "eee", {locale: ko})}</span>
                <span className={styles.time}>{format(now, "hh:mm")}</span>
                <span className={styles.time}>{format(now, "a").toUpperCase()}</span>
            </div>
            <div className={styles.alarm}>
                <div className={styles.title}>
                    <Image
                        src={alarmIcon}
                        alt={""}
                    />
                    <span>알림창</span>
                </div>
                <div className={styles.toggle}>
                    <ToggleSwitch checked={isOn} onChange={(checked) => {
                        setIsOn(checked)
                    }} height={20}/>
                    <span>{isOn ? "On" : "Off"}</span>
                </div>
                <button className={clsx(styles.button, styles.active)}>알림목록</button>
            </div>
        </div>
    )
}