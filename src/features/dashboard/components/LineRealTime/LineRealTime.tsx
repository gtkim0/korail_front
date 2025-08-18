import styles from "./LineRealTime.module.scss"
import Image from "next/image";
import upTrain from "@/shared/assets/images/up_train_icon.svg"
import downTrain from "@/shared/assets/images/down_train_icon.svg"
import React from "react";
import markIcon from "@/shared/assets/images/arrow-drop-down.svg";
import OlMap from "@/features/dashboard/components/OlMap/OlMap";

export default function LineRealTime() {
    const data = []
    return <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.down_route}>인천방면</div>
            <div className={styles.separator}></div>
            <div className={styles.station_info}>역사정보</div>
            <div className={styles.separator}></div>
            <div className={styles.up_route}>연천방면</div>
        </div>
        <div className={styles.content}>
            <div className={styles.item}>
                <div className={styles.down_route}>
                    <Image alt="" src={markIcon}/>
                    {/*해당 역에 접근중 , 도착 , 출발 중인 열차들 정보 train_info 반복문 돌리기*/}
                    <div className={styles.train_info} style={{top: "50%"}}>
                        <div className={styles.crowding}>보통</div>
                        <div className={styles.destination}>신창</div>
                        <div className={styles.express}>급</div>
                        <div className={styles.train_num}>1935</div>
                        <Image src={upTrain} alt="" className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.separator}>
                </div>
                <div className={styles.station_info}>
                    <div className={styles.crowding}>보통</div>
                    <div>가산디지털단지역</div>
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
                    <div className={styles.train_info} style={{top: "50%"}}>
                        <div className={styles.crowding}>보통</div>
                        <div className={styles.destination}>신창</div>
                        <div className={styles.express}>급</div>
                        <div className={styles.train_num}>1935</div>
                        <Image src={downTrain} alt="" className={styles.icon}/>
                    </div>
                </div>
            </div>
            <div className={styles.item} style={{height: "100px"}}>
                <div className={styles.down_route}>
                    <Image src={markIcon} alt=""/>
                    {/*해당 역에 접근중 , 도착 , 출발 중인 열차들 정보 train_info 반복문 돌리기*/}
                    <div className={styles.train_info} style={{top: "50%"}}>
                        <div className={styles.crowding}>보통</div>
                        <div className={styles.destination}>신창</div>
                        <div className={styles.express}>급</div>
                        <div className={styles.train_num}>1935</div>
                        <Image src={upTrain} alt="" className={styles.icon}/>
                    </div>

                </div>
                <div className={styles.separator}>
                </div>
                <div className={styles.station_info}>
                    <div style={{
                        position: "absolute",
                        top: "15px",
                        left: "-10px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "4px"
                    }}>
                        <span style={{
                            width: "66px",
                            height: "29px",
                            fill: "#243955",
                        }}>
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
                        <button style={{
                            fontSize: "10px",
                            marginTop: "-2px",
                            background: "transparent",
                            color: "#fff"
                        }}>가산디지털단지역 방면
                        </button>
                    </div>
                    <div className={styles.crowding}>보통</div>
                    <div>가산디지털단지</div>
                    <Image
                        src={"/line-outline.svg"}
                        alt={""}
                        width={20}
                        height={20}
                        priority
                        style={{objectFit: 'contain'}}
                    />
                </div>
                <div className={styles.separator}>
                </div>
                <div className={styles.up_route}>
                    <Image alt="" src={markIcon} className={styles.rotate}/>
                    <div className={styles.train_info} style={{top: "50%"}}>
                        <div className={styles.crowding}>보통</div>
                        <div className={styles.destination}>신창</div>
                        <div className={styles.express}>급</div>
                        <div className={styles.train_num}>1935</div>
                        <Image src={downTrain} alt="" className={styles.icon}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
}

