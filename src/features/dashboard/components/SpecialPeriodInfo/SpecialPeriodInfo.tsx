import styles from "./SpecialPeriodInfo.module.scss"
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

export default function SpecialPeriodInfo() {
    const data = [{name: "1호선", title: "추석연휴 , 공휴일 : 2025년 10월 5일 일요일 ~ 2025년 10월 8일"}, {
        name: "2호선",
        title: "설연휴 , 공휴일 : 2026년 1월 25일 일요일 ~ 2026년 1월 28일"
    }]
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % data.length);
        }, 5000)
        return () => clearInterval(id)
    }, []);
    return <div className={styles.container}>
        <AnimatePresence mode="wait">
            <motion.div key={index} initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}
                        exit={{y: -20, opacity: 0}} transition={{duration: 0.35, ease: "easeInOut"}}
                        className={styles.item}>
                <span>특수기간정보</span>
                <span>{data[index].title}</span>
            </motion.div>
        </AnimatePresence>
    </div>
}