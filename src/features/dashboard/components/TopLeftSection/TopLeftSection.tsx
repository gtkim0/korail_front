'use client';
// 대시보드 - 좌측 상단 노선 선택 드롭다운
import styles from "./TopLeftSection.module.scss"
import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import {RouteDirectionListType} from "@/types/routes-direction";
import {useDashboardSelectStore} from "@/shared/store/slice/dashboardSelectSlice";
import {useClientApi} from "@/shared/hooks/useClientApi";
import {useGetRoutesList} from "@/features/dashboard/hooks/queryHooks";

interface Props {
    initialData: RouteDirectionListType
}


export default function TopLeftSection({initialData}: Props) {
    const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
    const [isItemOpen, setIsItemOpen] = useState<number | null>(null);

    const {searchTarget, setTarget, setWideRailYn, reset} = useDashboardSelectStore();

    const {data} = useGetRoutesList(initialData);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleItem = (idx: number) => {
        setIsItemOpen(prev => (prev === idx ? null : idx));
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropOpen(false);
                setIsItemOpen(null);
            }
        };
        if (isDropOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropOpen]);

    const formatData = (rawData: RouteDirectionListType) => {
        let arr = [];
        const list = rawData?.list
        if (!list && list?.length == 0) return [];

        for (let i = 0; i < list?.length; i++) {
            const {lnNo, lnNm, imgPathUrlCn} = list[i]
            for (let j = 0; j < list[i]?.trifRteDtlms?.length; j++) {
                arr.push({...list[i]?.trifRteDtlms[j], lnNo, lnNm, imgPathUrlCn})
            }
        }
        return arr
    }
    const formattedData = formatData(data)


    return <div className={styles.container}>
        <button className={styles.total_route_button} onClick={() => reset()}>
            전체 노선 보기
        </button>
        <div className={styles.border}></div>
        <div className={styles.toggle}>
            <motion.div className={styles.toggle_bg} layout
                        transition={{type: "spring", stiffness: 500, damping: 30}}
                        style={{left: `${searchTarget.wideRailYn == "Y" ? "2px" : "50%"}`}}></motion.div>
            <div className={clsx(styles.toggle_item, searchTarget.wideRailYn == "Y" && styles.active)}
                 onClick={() => {
                     setWideRailYn("Y");
                 }}>광역
            </div>
            <div className={clsx(styles.toggle_item, searchTarget.wideRailYn == "N" && styles.active)}
                 onClick={() => {
                     setWideRailYn("N");
                 }}>간선
            </div>
        </div>
        <div className={styles.dropdown_container} ref={dropdownRef}>
            <button
                className={clsx([styles.button, isDropOpen && styles.open, (!formattedData || formattedData.length == 0) && styles.disabled])}
                onClick={() => {
                    if (formattedData && formattedData.length > 0) {
                        setIsDropOpen(!isDropOpen)
                    }
                }}>
                <div
                    className={styles.text}>{searchTarget.type == "station" ? searchTarget.stnNm : searchTarget.type == "line" ? searchTarget.rteDtlNm : "노선선택"}</div>
                <motion.img src={"/arrow-down-white.svg"} alt={"arrow"} width={20} height={20}
                            animate={{rotate: isDropOpen ? 180 : 0}}/>
            </button>
            <AnimatePresence initial={false}>
                {isDropOpen &&
                    <motion.div className={styles.dropdown} key="route_dropdown"
                                initial={{height: 0, opacity: 0, y: -5}}
                                animate={{height: 'auto', opacity: 1, y: 0}}
                                exit={{height: 0, opacity: 0, y: -5}}
                                transition={{duration: 0.25, ease: 'easeInOut'}}>
                        <div className={styles.scroll}>
                            {formattedData && formattedData?.map((el1, idx1) => {
                                const isOpen = isItemOpen == idx1
                                const hasChildren = el1.trifStnms && el1.trifStnms.length > 0;
                                return <div key={`dropdown_line_${el1.rteDtlNo}`} className={styles.item}>
                                    <div className={styles.line_item}>
                                        <Image
                                            src={"/line-outline.svg"}
                                            alt={"err"}
                                            width={20}
                                            height={20}
                                            priority
                                            style={{objectFit: 'contain'}}
                                        />
                                        <span className={styles.span_name}
                                              onClick={() => {
                                                  setTarget("line", el1.lnNo, el1.lnNm, el1.rteDtlNo, el1.rteDtlNm)
                                                  setIsItemOpen(null);
                                                  setIsDropOpen(false);
                                              }}>{el1.rteDtlNm}</span>
                                        <motion.img src={"/arrow-down-white.svg"} alt={"arrow"} width={20} height={20}
                                                    animate={{rotate: isOpen ? 180 : 0}} className={styles.arrow_item}
                                                    onClick={() => {
                                                        hasChildren && toggleItem(idx1)
                                                    }}/>
                                    </div>
                                    <AnimatePresence initial={false}>
                                        {isOpen && hasChildren &&
                                            <motion.div
                                                key="station"
                                                initial={{height: 0, opacity: 0, y: -5}}
                                                animate={{height: 'auto', opacity: 1, y: 0}}
                                                exit={{height: 0, opacity: 0, y: -5}}
                                                transition={{duration: 0.25, ease: 'easeInOut'}}>
                                                {
                                                    el1?.trifStnms?.map((el2, idx2) => {
                                                        return <div className={styles.station_item}
                                                                    key={`dropdown_station_${idx2}`}
                                                        >
                                                            <Image width={12} height={12} src={'/star_fill.svg'}
                                                                   alt="err"/>
                                                            <Image
                                                                src={"/line-outline.svg"}
                                                                alt={"err"}
                                                                width={20}
                                                                height={20}
                                                                priority
                                                                style={{objectFit: 'contain'}}
                                                            />
                                                            <span className={styles.span_name}
                                                                  onClick={() => {
                                                                      setTarget("station", el1.lnNo, el1.lnNm, el1.rteDtlNo, el1.rteDtlNm, el2.stnCd, el2.stnNm)
                                                                      setIsItemOpen(null);
                                                                      setIsDropOpen(false);
                                                                  }}>{el2.stnNm}</span>
                                                        </div>
                                                    })
                                                }
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                </div>
                            })}
                        </div>
                    </motion.div>}
            </AnimatePresence>
        </div>
    </div>
}