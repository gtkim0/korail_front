// 대시보드 - 열차 혼잡도 현황
import styles from "./TrainCrowdingStatus.module.scss"
import React from "react";
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import DropDown from "@/shared/components/dropDown/DropDown";
import Image from "next/image";
import AlertBadge from "@/features/dashboard/components/AlertBadge/AlertBadge";


export default function TrainCrowdingStatus() {
    return (<>
        <div className={styles.filter}>
            <DropDown
                onSelect={() => {
                }}
                options={[
                    {key: 'a', label: '열차번호'},
                    {key: 'b', label: '차량번호'},
                ]}
                // renderSelected={(selected) => (
                //     <div style={{display: 'flex', alignItems: 'center', gap: '0.2rem'}}>
                //         <span style={{fontWeight: 500, color: '#363637', fontSize: '1.4rem'}}>{selected.label}</span>
                //         <ImageWrapper width={16} height={16} src="/arrow-down.svg"/>
                //     </div>
                // )}
                parentClass={styles.dropdown_parent}
                dropdownClass={styles.dropdown}
                optionClass={styles.dropdown_option}
            />
            <SearchInput placeholder={"열차번호 입력"} parentClass={styles.search_parent}/>
        </div>
        <div className={styles.contents}>
            <div className={styles.item}>
                <div className={styles.item_header}>
                    <div className={styles.train_name}>
                        <Image
                            src={"/line-outline.svg"}
                            alt={"err"}
                            width={16}
                            height={16}
                            priority
                            style={{objectFit: 'contain'}}
                        />
                        <span>1호선 인천행</span>
                        <span className={styles.train_num}>K0660</span>
                    </div>
                    <div className={`${styles.train_badge} ${styles.critical}`}>
                        <div className={styles.o}></div>
                        <span>심각</span>
                        <span>201%</span>
                    </div>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    {/*화살표 이미지 자리*/}
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <AlertBadge label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <AlertBadge label={'심각'} backgroundColor={'#FF1500'}/>
                    <AlertBadge label={'보통'} backgroundColor={'#009856'}/>
                    <AlertBadge label={'주의'} backgroundColor={'#F4AA21'}/>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.item_header}>
                    <div className={styles.train_name}>
                        <Image
                            src={"/line-outline.svg"}
                            alt={"err"}
                            width={16}
                            height={16}
                            priority
                            style={{objectFit: 'contain'}}
                        />
                        <span>1호선 인천행</span>
                        <span className={styles.train_num}>K0660</span>
                    </div>
                    <div className={`${styles.train_badge} ${styles.critical}`}>
                        <div className={styles.o}></div>
                        <span>심각</span>
                        <span>201%</span>
                    </div>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    {/*화살표 이미지 자리*/}
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <AlertBadge label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <AlertBadge label={'심각'} backgroundColor={'#FF1500'}/>
                    <AlertBadge label={'보통'} backgroundColor={'#009856'}/>
                    <AlertBadge label={'주의'} backgroundColor={'#F4AA21'}/>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.item_header}>
                    <div className={styles.train_name}>
                        <Image
                            src={"/line-outline.svg"}
                            alt={"err"}
                            width={16}
                            height={16}
                            priority
                            style={{objectFit: 'contain'}}
                        />
                        <span>1호선 인천행</span>
                        <span className={styles.train_num}>K0660</span>
                    </div>
                    <div className={`${styles.train_badge} ${styles.critical}`}>
                        <div className={styles.o}></div>
                        <span>심각</span>
                        <span>201%</span>
                    </div>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    {/*화살표 이미지 자리*/}
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <AlertBadge label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <AlertBadge label={'심각'} backgroundColor={'#FF1500'}/>
                    <AlertBadge label={'보통'} backgroundColor={'#009856'}/>
                    <AlertBadge label={'주의'} backgroundColor={'#F4AA21'}/>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.item_header}>
                    <div className={styles.train_name}>
                        <Image
                            src={"/line-outline.svg"}
                            alt={"err"}
                            width={16}
                            height={16}
                            priority
                            style={{objectFit: 'contain'}}
                        />
                        <span>1호선 인천행</span>
                        <span className={styles.train_num}>K0660</span>
                    </div>
                    <div className={`${styles.train_badge} ${styles.critical}`}>
                        <div className={styles.o}></div>
                        <span>심각</span>
                        <span>201%</span>
                    </div>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    {/*화살표 이미지 자리*/}
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <AlertBadge label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <AlertBadge label={'심각'} backgroundColor={'#FF1500'}/>
                    <AlertBadge label={'보통'} backgroundColor={'#009856'}/>
                    <AlertBadge label={'주의'} backgroundColor={'#F4AA21'}/>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.item_header}>
                    <div className={styles.train_name}>
                        <Image
                            src={"/line-outline.svg"}
                            alt={"err"}
                            width={16}
                            height={16}
                            priority
                            style={{objectFit: 'contain'}}
                        />
                        <span>1호선 인천행</span>
                        <span className={styles.train_num}>K0660</span>
                    </div>
                    <div className={`${styles.train_badge} ${styles.critical}`}>
                        <div className={styles.o}></div>
                        <span>심각</span>
                        <span>201%</span>
                    </div>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    {/*화살표 이미지 자리*/}
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <AlertBadge label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <AlertBadge label={'심각'} backgroundColor={'#FF1500'}/>
                    <AlertBadge label={'보통'} backgroundColor={'#009856'}/>
                    <AlertBadge label={'주의'} backgroundColor={'#F4AA21'}/>
                </div>
            </div>
        </div>
    </>)

}