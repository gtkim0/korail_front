// 대시보드 - 열차 혼잡도 현황
import styles from "./TrainCrowdingStatus.module.scss"
import React from "react";
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import DropDown from "@/shared/components/dropDown/DropDown";
import Image from "next/image";
import MetroLineAtomic from "@/shared/components/MetroLineAtomic/MetroLineAtomic";
import CrowdingBadge from "@/shared/components/CrowdingBadge/CrowdingBadge";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import TrainCrowdingCardDetail from "@/features/dashboard/components/TrainCrowdingCardDetail/TrainCrowdingCardDetail";

interface Props {

}


export default function TrainCrowdingStatus() {
    const data = ["1", "2", "3"]
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
            {data.map((el, idx) => (<TrainCrowdingCardDetail key={idx}/>))}
        </div>
    </>)

}