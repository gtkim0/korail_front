import styles from "./ArrivalInfo.module.scss";
import TrainCrowdingCardDetail from "@/features/dashboard/components/TrainCrowdingCardDetail/TrainCrowdingCardDetail";
import React from "react";

export default function ArrivalInfo() {
    const data = [{
        line: "1호선 인천행",
        train: "K0021",
        trains: [1, 3, 2, 4, 4, 3, 2],
        startRoute: "연천역",
        endRoute: "인천역",
        status: "전역출발",
        level: 4,
        percent: 120
    },
        {
            line: "1호선 서울행",
            train: "K0022",
            trains: [2, 1, 3, 4, 1, 2, 3],
            startRoute: "인천역",
            endRoute: "서울역",
            status: "전역출발",
            level: 4,
            percent: 90
        },
        {
            line: "1호선 청량리행",
            train: "K0023",
            trains: [3, 2, 1, 4, 2, 3, 1],
            startRoute: "의정부역",
            endRoute: "청량리역",
            status: "전역출발",
            level: 4,
            percent: 100
        },]
    return (<div className={styles.container}>
        {data.map((el, idx) => (<TrainCrowdingCardDetail key={idx} data={el}/>))}
    </div>)
}