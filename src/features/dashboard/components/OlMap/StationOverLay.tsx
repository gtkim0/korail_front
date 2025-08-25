import {Feature} from "ol";
import styles from "./OlMap.module.scss"
import Image from "next/image";
import React, {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";
import TrainCrowdingCard from "@/features/dashboard/components/TrainCrowdingCard/TrainCrowdingCard";


export default function StationOverLay({feature, coordKey}: { feature: Feature, coordKey: string }) {
    const [visibleTable, setVisibleTable] = useState<"train" | "station" | null>(null)

    const data = [{name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}]
    return (
        <AnimatePresence>
            <motion.div key={coordKey} className={styles.station_overlay} initial={{opacity: 0, y: 10}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.3}}>
                <Image
                    src={"/line-outline.svg"}
                    alt={"err"}
                    width={20}
                    height={20}
                    priority
                    style={{objectFit: 'contain'}}
                />
                <span>{feature.get("name")}</span>
                <button
                    className={styles.button}
                    onClick={() => {
                        setVisibleTable("train")
                    }}>
                    <span>열차</span><span className={styles.num}>4</span>
                </button>
                <button
                    className={styles.button}
                    onClick={() => {
                        setVisibleTable("station")
                    }}>
                    <span>역사</span><span className={styles.num}>4</span>
                </button>
            </motion.div>
            <AnimatePresence mode="wait">
                {visibleTable == "station" &&
                    <motion.div key={visibleTable} initial={{opacity: 0, x: -50, y: "-50%"}}
                                animate={{opacity: 1, x: 0, y: "-50%"}}
                                exit={{opacity: 0, x: -50, y: "-50%"}}
                                transition={{duration: 0.3}}
                                className={styles.overlay_in_overlay}>
                        <div className={styles.header}>
                            <Image
                                src={"/line-outline.svg"}
                                alt={"err"}
                                width={20}
                                height={20}
                                priority
                                style={{objectFit: 'contain'}}
                            />
                            <span>{feature.get("name")}</span>
                            <span>노선번호1203</span>
                        </div>
                        <div className={styles.station_container}>
                            <div className={styles.station_table}>
                                <Table<T>
                                    columns={[
                                        {accessorKey: "name", header: "역사명", enableSorting: false},
                                        {
                                            accessorKey: "crowding",
                                            header: "혼잡도",
                                            enableSorting: false,
                                            cell: info => {
                                                const value = info.getValue<string>()
                                                return <CrowdingBadge level={1} percent={21} noBoxShadow={true}/>
                                            }
                                        },
                                    ]}
                                    data={data}
                                    minWidth={"0"}
                                    bgColor={"#162b4e"}
                                />
                            </div>
                        </div>

                    </motion.div>}
                {visibleTable == "train" &&
                    <motion.div key={visibleTable} initial={{opacity: 0, x: -50, y: "-50%"}}
                                animate={{opacity: 1, x: 0, y: "-50%"}}
                                exit={{opacity: 0, x: -50, y: "-50%"}}
                                transition={{duration: 0.3}}
                                className={styles.overlay_in_overlay}>
                        <div className={styles.header}>
                            <Image
                                src={"/line-outline.svg"}
                                alt={"err"}
                                width={20}
                                height={20}
                                priority
                                style={{objectFit: 'contain'}}
                            />
                            <span>{feature.get("name")}</span>
                            <span>노선번호1203</span>
                        </div>
                        <div className={styles.train_container}>
                            <div className={styles.train_table}>
                                {data.map((el, idx) => (<TrainCrowdingCard key={idx}/>))}
                            </div>
                        </div>
                    </motion.div>}
            </AnimatePresence>
        </AnimatePresence>)
}