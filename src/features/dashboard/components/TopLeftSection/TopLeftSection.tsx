// 대시보드 - 좌측 상단 노선 선택 드롭다운
import styles from "./TopLeftSection.module.scss"
import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";
import {SearchTargetType, searchTargetInit} from "@/types/dashboard";
import clsx from "clsx";

interface Props {
    searchTarget: SearchTargetType;
    setSearchTarget: React.Dispatch<React.SetStateAction<SearchTargetType>>;
}

export default function TopLeftSection(props: Props) {
    const {searchTarget, setSearchTarget} = props;
    const data = [
        {
            line: "1호선",
            stations: [{name: "가산디지털단지", stars: true}, {name: "안양", stars: false}]
        },
        {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }, {
            line: "경의중앙선", stations: [{name: "회기", stars: true}, {name: "중랑", stars: false}]
        }
    ]
    const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
    const [isItemOpen, setIsItemOpen] = useState<number | null>(null);
    const [isLeft, setIsLeft] = useState<boolean>(false);

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


    return <div className={styles.container}>
        <button className={styles.total_route_button} onClick={() => setSearchTarget(searchTargetInit)}>
            전체 노선 보기
        </button>
        <div className={styles.border}></div>
        <div className={styles.toggle}>
            <motion.div className={styles.toggle_bg} layout
                        transition={{type: "spring", stiffness: 500, damping: 30}}
                        style={{left: `${isLeft ? "2px" : "50%"}`}}></motion.div>
            <div className={clsx(styles.toggle_item, isLeft && styles.active)}
                 onClick={() => {
                     setIsLeft(true)
                 }}>광역
            </div>
            <div className={clsx(styles.toggle_item, !isLeft && styles.active)}
                 onClick={() => {
                     setIsLeft(false)
                 }}>간선
            </div>
        </div>
        <div className={styles.dropdown_container} ref={dropdownRef}>
            <button className={clsx(styles.button, isDropOpen && styles.open)} onClick={() => {
                setIsDropOpen(!isDropOpen)
            }}>
                <div className={styles.text}>{searchTarget.name == "" ? "노선선택" : searchTarget.name}</div>
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
                            {data.map((el1, idx1) => {
                                const isOpen = isItemOpen == idx1
                                const hasChildren = el1.stations && el1.stations.length > 0;
                                return <div key={`dropdown_line_${idx1}`} className={styles.item}>
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
                                                  setSearchTarget({type: "line", name: el1.line})
                                                  setIsItemOpen(null);
                                                  setIsDropOpen(false);
                                              }}>{el1.line}</span>
                                        <motion.img src={"/arrow-down-white.svg"} alt={"arrow"} width={20} height={20}
                                                    animate={{rotate: isOpen ? 180 : 0}} className={styles.arrow_item}
                                                    onClick={() => toggleItem(idx1)}/>
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
                                                    el1.stations.map((el2, idx2) => {
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
                                                                      setSearchTarget({type: "station", name: el2.name})
                                                                      setIsItemOpen(null);
                                                                      setIsDropOpen(false);
                                                                  }}>{el2.name}</span>
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