// 대시보드 - 열차 혼잡도 현황
import styles from "./TrainCrowdingStatus.module.scss"
import React, {useState} from "react";
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import DropDown from "@/shared/components/dropDown/DropDown";
import Image from "next/image";
import TrainCrowdingCardDetail from "@/features/dashboard/components/TrainCrowdingCardDetail/TrainCrowdingCardDetail";
import icon from "@/shared/assets/images/train.svg";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";

interface Props {

}

export default function TrainCrowdingStatus() {
    const [activeTab, setActiveTab] = useState<"all" | "up" | "down">("all")
    const data = ["1", "2", "3"]

    return (<>
        <div className={styles.header}>
            <Image
                src={icon}
                alt={""}
            />
            <span>열차 혼잡도 현황</span>
            <div className={styles.radio}>
                <FilterRadioGroup
                    selected={activeTab}
                    options={[
                        {key: 'all', label: '전체'},
                        {key: 'up', label: '상행'},
                        {key: 'down', label: '하행'}
                    ]}
                    onChange={(e) => {
                        setActiveTab(e)
                    }}
                />
            </div>
        </div>
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
            {data.map((el, idx) => (<TrainCrowdingCardDetail key={idx}/>))}
        </div>
    </>)

}