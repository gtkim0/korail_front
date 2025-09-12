// 대시보드 - 열차 혼잡도 현황
import styles from "./TrainCrowdingStatus.module.scss"
import React, {useRef, useState} from "react";
import {SearchInput} from "@/shared/components/Input/searchInput/SearchInput";
import DropDown from "@/shared/components/dropDown/DropDown";
import Image from "next/image";
import TrainCrowdingCardDetail from "@/features/dashboard/components/TrainCrowdingCardDetail/TrainCrowdingCardDetail";
import icon from "@/shared/assets/images/train.svg";
import FilterRadioGroup from "@/shared/components/searchFilter/Filters/FilterRadioGroup/FilterRadioGroup";
import Refresh from "@/features/dashboard/components/Refresh/Refresh";

interface Props {

}

export default function TrainCrowdingStatus() {
    const [activeTab, setActiveTab] = useState<"all" | "up" | "down">("all")
    const contentsRef = useRef<HTMLDivElement>(null);
    const dummyDataSet1 = [
        {
            line: "1호선 인천행",
            train: "K0021",
            trains: [1, 3, 2, 4, 4, 3, 2],
            startRoute: "연천역",
            endRoute: "인천역",
            status: "전역출발",
            level: 4,
            percent: 120
        },
        {
            line: "1호선 서울행",
            train: "K0022",
            trains: [2, 1, 3, 4, 1, 2, 3],
            startRoute: "인천역",
            endRoute: "서울역",
            status: "전역출발",
            level: 4,
            percent: 90
        },
        {
            line: "1호선 청량리행",
            train: "K0023",
            trains: [3, 2, 1, 4, 2, 3, 1],
            startRoute: "의정부역",
            endRoute: "청량리역",
            status: "전역출발",
            level: 4,
            percent: 100
        },
        {
            line: "1호선 소요산행",
            train: "K0024",
            trains: [4, 3, 2, 1, 3, 2, 4],
            startRoute: "서울역",
            endRoute: "소요산역",
            status: "전역출발",
            level: 3,
            percent: 80
        },
        {
            line: "1호선 인천행",
            train: "K0025",
            trains: [1, 2, 3, 4, 1, 2, 3],
            startRoute: "동두천역",
            endRoute: "인천역",
            status: "전역출발",
            level: 3,
            percent: 110
        },
        {
            line: "1호선 서울행",
            train: "K0026",
            trains: [2, 3, 4, 1, 2, 3, 4],
            startRoute: "인천역",
            endRoute: "서울역",
            status: "전역출발",
            level: 3,
            percent: 95
        },
        {
            line: "1호선 청량리행",
            train: "K0027",
            trains: [3, 4, 1, 2, 3, 4, 1],
            startRoute: "의정부역",
            endRoute: "청량리역",
            status: "전역출발",
            level: 2,
            percent: 105
        },
        {
            line: "1호선 소요산행",
            train: "K0028",
            trains: [4, 1, 2, 3, 4, 1, 2],
            startRoute: "서울역",
            endRoute: "소요산역",
            status: "전역출발",
            level: 1,
            percent: 85
        },
        {
            line: "1호선 인천행",
            train: "K0029",
            trains: [1, 2, 4, 3, 2, 1, 4],
            startRoute: "연천역",
            endRoute: "인천역",
            status: "전역출발",
            level: 1,
            percent: 115
        },
        {
            line: "1호선 서울행",
            train: "K0030",
            trains: [2, 1, 3, 2, 4, 3, 1],
            startRoute: "인천역",
            endRoute: "서울역",
            status: "전역출발",
            level: 1,
            percent: 92
        },
        {
            line: "1호선 청량리행",
            train: "K0031",
            trains: [3, 2, 1, 4, 3, 2, 1],
            startRoute: "의정부역",
            endRoute: "청량리역",
            status: "전역출발",
            level: 1,
            percent: 98
        },
        {
            line: "1호선 소요산행",
            train: "K0032",
            trains: [4, 3, 2, 1, 4, 3, 2],
            startRoute: "서울역",
            endRoute: "소요산역",
            status: "전역출발",
            level: 1,
            percent: 87
        },
    ];
    const dummyDataSet2 = [
        {
            line: "1호선 인천행",
            train: "K0101",
            trains: [2, 3, 1, 4, 2, 3, 1],
            startRoute: "동두천역",
            endRoute: "인천역",
            status: "전역출발",
            level: 4,
            percent: 120
        },
        {
            line: "1호선 서울행",
            train: "K0102",
            trains: [1, 4, 3, 2, 1, 4, 3],
            startRoute: "인천역",
            endRoute: "서울역",
            status: "전역출발",
            level: 4,
            percent: 95
        },
        {
            line: "1호선 청량리행",
            train: "K0103",
            trains: [3, 2, 4, 1, 3, 2, 4],
            startRoute: "의정부역",
            endRoute: "청량리역",
            status: "전역출발",
            level: 4,
            percent: 100
        },
        {
            line: "1호선 소요산행",
            train: "K0104",
            trains: [4, 1, 2, 3, 4, 1, 2],
            startRoute: "서울역",
            endRoute: "소요산역",
            status: "전역출발",
            level: 4,
            percent: 85
        },
        {
            line: "1호선 인천행",
            train: "K0105",
            trains: [2, 3, 4, 1, 2, 3, 4],
            startRoute: "연천역",
            endRoute: "인천역",
            status: "전역출발",
            level: 4,
            percent: 110
        },
        {
            line: "1호선 서울행",
            train: "K0106",
            trains: [1, 2, 3, 4, 1, 2, 3],
            startRoute: "인천역",
            endRoute: "서울역",
            status: "전역출발",
            level: 4,
            percent: 90
        },
        {
            line: "1호선 청량리행",
            train: "K0107",
            trains: [3, 1, 2, 4, 3, 1, 2],
            startRoute: "의정부역",
            endRoute: "청량리역",
            status: "전역출발",
            level: 3,
            percent: 105
        },
        {
            line: "1호선 소요산행",
            train: "K0108",
            trains: [4, 3, 1, 2, 4, 3, 1],
            startRoute: "서울역",
            endRoute: "소요산역",
            status: "전역출발",
            level: 3,
            percent: 87
        },
        {
            line: "1호선 인천행",
            train: "K0109",
            trains: [2, 1, 4, 3, 2, 1, 4],
            startRoute: "동두천역",
            endRoute: "인천역",
            status: "전역출발",
            level: 2,
            percent: 115
        },
        {
            line: "1호선 서울행",
            train: "K0110",
            trains: [1, 3, 2, 4, 1, 3, 2],
            startRoute: "인천역",
            endRoute: "서울역",
            status: "전역출발",
            level: 2,
            percent: 92
        },
        {
            line: "1호선 청량리행",
            train: "K0111",
            trains: [3, 4, 1, 2, 3, 4, 1],
            startRoute: "의정부역",
            endRoute: "청량리역",
            status: "전역출발",
            level: 2,
            percent: 98
        },
        {
            line: "1호선 소요산행",
            train: "K0112",
            trains: [4, 2, 3, 1, 4, 2, 3],
            startRoute: "서울역",
            endRoute: "소요산역",
            status: "전역출발",
            level: 1,
            percent: 87
        },
    ];
    const [data, setData] = useState(dummyDataSet1)
    const [dd, setDD] = useState(false);


    const clickFn = () => {
        setData(dummyDataSet2)
        contentsRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setDD(false)
    }


    return (<>
        <div className={styles.header}>
            <Image
                src={icon}
                alt={""}
            />
            <span>열차 혼잡도 현황</span>
            <div className={styles.radio}>
                <FilterRadioGroup
                    name="TrainCrowdingStatus"
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
        {dd && <Refresh top={130} onClick={clickFn}/>}

        <div className={styles.contents} ref={contentsRef}>
            {data.map((el, idx) => (<TrainCrowdingCardDetail key={idx} data={el}/>))}
        </div>
    </>)

}