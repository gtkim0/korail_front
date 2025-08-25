import React, {useRef, useState, useEffect} from "react";
import styles from "./LineRealTime.module.scss"
import Image from "next/image";
import upTrain from "@/shared/assets/images/up_train_icon.svg"
import downTrain from "@/shared/assets/images/down_train_icon.svg"
import markIcon from "@/shared/assets/images/arrow-drop-down.svg";
import ReactDOM from "react-dom";
import {motion, AnimatePresence} from "framer-motion";
import clsx from "clsx";
import starIcon from "@/shared/assets/images/star_fill.svg"
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import TrainCrowdingCardDetail from "@/features/dashboard/components/TrainCrowdingCardDetail/TrainCrowdingCardDetail";

type TooltipState = {
    top: number;
    left: number;
    type: "station" | "train";
    direction: "up" | "down";
    data: any;
    buttonRect: DOMRect;
} | null;

export default function LineRealTime() {
    const [tooltip, setTooltip] = useState<TooltipState>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const data = [
        {id: "1", station: "가산디지털단지역", other: true},
        {id: "2", station: "서울역", other: false},
        {id: "3", station: "부산역", other: false},
        {id: "4", station: "대전역", other: true},
        {id: "5", station: "광주역", other: false},
        {id: "6", station: "대구역", other: false},
        {id: "7", station: "구로역", other: false},
        {id: "8", station: "광운대역", other: false},
        {id: "9", station: "안양역", other: false},
        {id: "10", station: "독산역", other: false},
        {id: "11", station: "관악역", other: true},
        {id: "12", station: "명학역", other: false},
        {id: "13", station: "서울대벤처타운역", other: false},
        {id: "14", station: "신림역", other: false},
    ]
    const handleClick = (
        e: React.MouseEvent<HTMLDivElement>,
        type: "station" | "train",
        data: any // 데이터 형식 정해지면 타입 정하기
    ) => {
        const buttonRect = e.currentTarget.getBoundingClientRect();

        const tooltipHeight = (type == "station" ? 219 : 115) + 20;
        const spaceAbove = buttonRect.top;
        const viewportHeight = window.innerHeight;

        let direction: "up" | "down" = "up";
        let top = buttonRect.top - tooltipHeight;
        let left = buttonRect.left + buttonRect.width / 2 - 327 / 2;

        if (spaceAbove < tooltipHeight) {
            direction = "down";
            top = Math.min(buttonRect.bottom, viewportHeight - tooltipHeight);
        }

        setTooltip({
            top,
            left: left,
            type,
            direction,
            data,
            buttonRect,
        });

    };

    // outside click 닫기
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (tooltip && !document.getElementById("tooltip-root")?.contains(e.target as Node)) {
                setTooltip(null);
            }
        };
        const handleScroll = () => {
            if (tooltip) {
                setTooltip(null)
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        const container = containerRef.current;
        container?.addEventListener("scroll", handleScroll)
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            container?.removeEventListener("scroll", handleScroll)
        }
    }, [tooltip]);

    const tooltipElement =
        tooltip &&
        ReactDOM.createPortal(
            <AnimatePresence>
                <motion.div
                    id="tooltip-root"
                    key={tooltip.data.id + tooltip.type}
                    initial={{
                        opacity: 0,
                        scale: 0.9,
                        y: tooltip.direction === "up" ? 20 : -20,
                        x: "0"
                    }}
                    animate={{opacity: 1, scale: 1, y: 10, x: "0"}}
                    exit={{
                        opacity: 0,
                        scale: 0.9,
                        y: tooltip.direction === "up" ? -20 : 20,
                        x: "0"
                    }}
                    transition={{duration: 0.2}}
                    style={{
                        top: tooltip.top,
                        left: tooltip.left,
                    }}
                    className={styles.tooltip_container}
                >
                    {/* 화살표 */}
                    <div
                        className={styles.arrow}
                        style={{
                            ...(tooltip.direction === "down"
                                ? {
                                    top: -8,
                                    borderBottom: "8px solid #536688",
                                }
                                : {
                                    bottom: -8,
                                    borderTop: "8px solid #536688",
                                }),
                        }}
                    />

                    {tooltip.type === "station" ? (
                        <StationTooltip data={tooltip.data}/>
                    ) : (
                        <TrainTooltip data={tooltip.data}/>
                    )}
                </motion.div>
            </AnimatePresence>,
            document.body
        );

    return <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.down_route}>인천방면</div>
            <div className={styles.separator}></div>
            <div className={styles.station_info}>역사정보</div>
            <div className={styles.separator}></div>
            <div className={styles.up_route}>연천방면</div>
        </div>
        <div className={styles.content} ref={containerRef}>
            {/*다른 방면으로 빠지는 역의 경우 item의 높이를 100px로 하고 station_info 하위에 svg와 버튼 엘리먼트 표출*/}
            {data.map((el, idx) => {
                return <div key={`station_list_${idx}`}
                            className={clsx(styles.item, el.other && styles.height)}>
                    <div className={styles.down_route}>
                        <Image alt="" src={markIcon}/>
                        {/*해당 역에 접근중 , 도착 , 출발 중인 열차들 정보 train_info 반복문 돌리기*/}
                        <div
                            //해당 열차정보 어떻게 반복문 돌릴 지 로직 구현 후 active 적용 (상행 하행 열차 둘 다)
                            // className={clsx(styles.train_info, tooltip?.data?.id == el.id && tooltip?.type == "train" && styles.active)}
                            className={styles.train_info}
                            style={{top: "50%"}}
                            onClick={(e) => handleClick(e, "train", el)}>
                            <div className={styles.crowding}>보통</div>
                            <div className={styles.destination}>신창</div>
                            <div className={styles.express}>급</div>
                            <div className={styles.train_num}>1935</div>
                            <Image src={upTrain} alt="" className={styles.icon}/>
                        </div>
                    </div>
                    <div className={styles.separator}>
                    </div>
                    <div
                        className={clsx(styles.station_info, tooltip?.data?.id == el.id && tooltip?.type == "station" && styles.active)}
                        onClick={(e) => handleClick(e, "station", el)}
                    >
                        {el.other && <div className={styles.other_side}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 29"
                                 style={{transform: "scaleY(-1)"}}>
                            <path fillRule="evenodd"
                                  d="M0 4V0h10v4c0 8.284 6.716 15 15 15h36a5 5 0 0 1 0 10H25C11.193 29 0 17.807 0 4Z"
                                  clipRule="evenodd"></path>
                            <g fill="#fff">
                                <path d="M27.25 21H25l3 3-3 3h2.25l3-3-3-3Z" opacity="0.4"></path>
                                <path d="M35.5 21h-2.25l3 3-3 3h2.25l3-3-3-3Z" opacity="0.6"></path>
                                <path d="M43.75 21H41.5l3 3-3 3h2.25l3-3-3-3Z" opacity="0.8"></path>
                                <path d="M52 21h-2.25l3 3-3 3H52l3-3-3-3Z"></path>
                            </g>
                            <circle cx="61" cy="24" r="3" fill="#fff"></circle>
                        </svg>
                        </span>
                            <button>가산디지털단지역 방면</button>
                        </div>}
                        <div className={styles.crowding}>보통</div>
                        <div className={styles.title}>가산디지털단지역</div>
                        <Image
                            src={"/line-outline.svg"}
                            alt={""}
                            width={20}
                            height={20}
                            priority
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                    <div className={styles.separator}></div>
                    <div className={styles.up_route}>
                        <Image alt="" src={markIcon} className={styles.rotate}/>
                        <div className={styles.train_info} style={{top: "50%"}}
                             onClick={(e) => handleClick(e, "train", el)}>
                            <div className={styles.crowding}>보통</div>
                            <div className={styles.destination}>신창</div>
                            <div className={styles.express}>급</div>
                            <div className={styles.train_num}>1935</div>
                            <Image src={downTrain} alt="" className={styles.icon}/>
                        </div>
                    </div>
                </div>
            })}
            {tooltipElement}
        </div>
    </div>
}

/* ---------- 툴팁 컴포넌트 ---------- */
function StationTooltip({data}: { data: any }) {
    const arr = [
        {sort: "승강장", name: "승강장1", crowding: "72%"},
        {sort: "승강장", name: "승강장3", crowding: "10%"},
        {sort: "승강장", name: "승강장4", crowding: "20%"},
        {sort: "승강장", name: "승강장4", crowding: "20%"},
        {sort: "승강장", name: "승강장4", crowding: "20%"},
        {sort: "승강장", name: "승강장4", crowding: "20%"},
        {sort: "승강장", name: "승강장4", crowding: "20%"},
        {sort: "승강장", name: "승강장4", crowding: "20%"},
        {sort: "승강장", name: "승강장4", crowding: "20%"},
    ]
    return (
        <div style={{width: "328px", height: "219px"}} className={styles.station_tooltip}>
            <div className={styles.station_tooltip_header}>
                <Image src={starIcon} alt="err"/>
                <Image
                    src={"/line-outline.svg"}
                    alt={""}
                    width={20}
                    height={20}
                    priority
                    style={{objectFit: 'contain'}}
                />
                <span className={styles.title}>가산디지털단지역</span>
                <CrowdingBadge level={1} percent={21}/>
            </div>
            <div className={styles.station_tooltip_body}>
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
                    data={arr}
                    minWidth={"0"}
                />
            </div>
        </div>
    );
}

function TrainTooltip({data}: { data: any }) {
    return (
        <div style={{width: "328px", height: "115px"}}>
            <TrainCrowdingCardDetail/>
        </div>
    );
}
