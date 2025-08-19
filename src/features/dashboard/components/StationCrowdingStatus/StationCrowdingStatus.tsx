// 대시보드 - 관심역사 혼잡도 현황
import styles from "./StationCrowdingStatus.module.scss"
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import React, {useState} from "react";
import Image from "next/image";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import {AnimatePresence, motion} from "framer-motion";
import clsx from "clsx";
import CrowdingBadge from "@/shared/components/CrowdingBadge/CrowdingBadge";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

export default function StationCrowdingStatus() {
    const [openStation, setOpenStation] = useState<null | number>(null);
    const data = [
        {station_name: "가산디지털단지역", table: [{sort: "승강장", name: "승강장1", crowding: "72%"}]},
        {station_name: "노량진", table: [{sort: "승강장", name: "승강장2", crowding: "80%"}]},
        {station_name: "신도림", table: [{sort: "승강장", name: "승강장3", crowding: "10%"}]},
        {station_name: "남영", table: [{sort: "승강장", name: "승강장4", crowding: "20%"}]},
        {station_name: "남영", table: [{sort: "승강장", name: "승강장4", crowding: "20%"}]},
        {station_name: "남영", table: [{sort: "승강장", name: "승강장4", crowding: "20%"}]},
        {station_name: "남영", table: [{sort: "승강장", name: "승강장4", crowding: "20%"}]},
        {station_name: "남영", table: [{sort: "승강장", name: "승강장4", crowding: "20%"}]},
        {station_name: "남영", table: [{sort: "승강장", name: "승강장4", crowding: "20%"}]},
    ]
    const toggleItem = (idx: number) => {
        setOpenStation(prev => (prev === idx ? null : idx));
    }
    return <>
        <div className={styles.filter}>
            <SearchInput placeholder={"역사명 입력"} parentClass={styles.search_parent}/>
        </div>
        <div className={styles.contents}>
            {data.map((el, idx) => {
                const isOpen = openStation == idx;
                const hasChildren = el.table && el.table.length > 0;
                return <div className={styles.item} key={`station_crowding_${idx}`}>
                    <div className={styles.item_header} onClick={() => toggleItem(idx)}>
                        <div className={styles.left}>
                            <ImageWrapper width={12} height={12} src={'/star_fill.svg'}/>
                            <CrowdingBadge level={1}/>
                            <Image
                                src={"/line-outline.svg"}
                                alt={"err"}
                                width={16}
                                height={16}
                                priority
                                style={{objectFit: 'contain'}}
                            />
                            <span className={styles.span_text}>{el.station_name}</span>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.arrow_wrap}>
                                <motion.img src={"/arrow-down-white.svg"} alt={"arrow"} width={20} height={20}
                                            animate={{rotate: isOpen ? 180 : 0}}/>
                            </div>
                        </div>
                    </div>
                    <AnimatePresence initial={false}>
                        {isOpen && hasChildren && (
                            <motion.div
                                className={styles.table}
                                key="table"
                                initial={{height: 0, opacity: 0, y: -5}}
                                animate={{height: 'auto', opacity: 1, y: 0}}
                                exit={{height: 0, opacity: 0, y: -5}}
                                transition={{duration: 0.25, ease: 'easeInOut'}}
                            >
                                <Table<T>
                                    columns={[
                                        {accessorKey: "sort", header: "구역종류", enableSorting: false},
                                        {accessorKey: "name", header: "구역명", enableSorting: false},
                                        {
                                            accessorKey: "crowding",
                                            header: "혼잡도",
                                            enableSorting: false,
                                            cell: info => {
                                                const value = info.getValue<string>()
                                                return <span style={{color: "#009856"}}>{value}</span>
                                            }
                                        }
                                    ]}
                                    data={el.table}
                                    minWidth={"0"}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            })}
        </div>
    </>
}