// 대시보드 - 열차 혼잡도 현황
import styles from "./TrainCrowdingStatus.module.scss"
import React from "react";
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import DropDown from "@/shared/components/dropDown/DropDown";
import Image from "next/image";
import MetroLineAtomic from "@/features/dashboard/components/MetroLineAtomic/MetroLineAtomic";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

interface Props {

}


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
                    <CrowdingBadge level={1} percent={21}/>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    <ImageWrapper width={24} height={24} src={'/arrow_circle_right.svg'} enableCursor={false}/>
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>
                    <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>
                    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
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
                    <CrowdingBadge level={1} percent={21}/>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    <ImageWrapper width={24} height={24} src={'/arrow_circle_right.svg'} enableCursor={false}/>
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>
                    <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>
                    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
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
                    <CrowdingBadge level={1} percent={21}/>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    <ImageWrapper width={24} height={24} src={'/arrow_circle_right.svg'} enableCursor={false}/>
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>
                    <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>
                    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
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
                    <CrowdingBadge level={1} percent={21}/>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    <ImageWrapper width={24} height={24} src={'/arrow_circle_right.svg'} enableCursor={false}/>
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>
                    <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>
                    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
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
                    <CrowdingBadge level={1} percent={21}/>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    <ImageWrapper width={24} height={24} src={'/arrow_circle_right.svg'} enableCursor={false}/>
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>
                    <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>
                    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
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
                    <CrowdingBadge level={1} percent={21}/>
                </div>
                <div className={styles.item_route}>
                    <span className={styles.station}>가산디지털단지역</span>
                    <ImageWrapper width={24} height={24} src={'/arrow_circle_right.svg'} enableCursor={false}/>
                    <span className={styles.station}>디지털미디어시티역</span>
                </div>
                <div className={styles.item_train}>
                    <MetroLineAtomic label={'혼잡'} backgroundColor={'#F4AA21'}/>
                    <MetroLineAtomic label={'심각'} backgroundColor={'#FF1500'}/>
                    <MetroLineAtomic label={'보통'} backgroundColor={'#009856'}/>
                    <MetroLineAtomic label={'주의'} backgroundColor={'#F4AA21'}/>
                </div>
            </div>
        </div>
    </>)

}