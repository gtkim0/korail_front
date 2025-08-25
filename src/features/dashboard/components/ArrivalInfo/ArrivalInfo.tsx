import styles from "./ArrivalInfo.module.scss";
import TrainCrowdingCardDetail from "@/features/dashboard/components/TrainCrowdingCardDetail/TrainCrowdingCardDetail";
import React from "react";

export default function ArrivalInfo() {
    const data = ["1", "2", "3"]
    return (<div className={styles.container}>
        {data.map((el, idx) => (<TrainCrowdingCardDetail key={idx}/>))}
    </div>)
}