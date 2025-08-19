import styles from "./CrowdingModal.module.scss"
import CrowdingBadge from "@/shared/components/CrowdingBadge/CrowdingBadge";
import Table from "@/shared/components/table/BaseTable/BaseTable";
import React from "react";

export default function CrowdingModal() {
    const data = [{name: "홍길동", part: "역운영처", grade: "용산역", num: "02-222-2222"}, {
        name: "홍길동",
        part: "역운영처",
        grade: "용산역",
        num: "02-222-2222"
    }, {name: "홍길동", part: "역운영처", grade: "용산역", num: "02-222-2222"}, {
        name: "홍길동",
        part: "역운영처",
        grade: "용산역",
        num: "02-222-2222"
    }, {name: "홍길동", part: "역운영처", grade: "용산역", num: "02-222-2222"}, {
        name: "홍길동",
        part: "역운영처",
        grade: "용산역",
        num: "02-222-2222"
    }, {name: "홍길동", part: "역운영처", grade: "용산역", num: "02-222-2222"}, {
        name: "홍길동",
        part: "역운영처",
        grade: "용산역",
        num: "02-222-2222"
    }, {name: "홍길동", part: "역운영처", grade: "용산역", num: "02-222-2222"}, {
        name: "홍길동",
        part: "역운영처",
        grade: "용산역",
        num: "02-222-2222"
    }]
    return <div className={styles.container}>
        <div className={styles.header}>
            <span>구역명</span>
            <span className={styles.name}>승강장1</span>
            <span>혼잡도</span>
            <CrowdingBadge level={1} percent={201}/>
            <span className={styles.time}>(구역수 , 14:00) 기준</span>
        </div>
        <div className={styles.content}>
            <div className={styles.table_header}>
                <span>현장근무인원 정보</span>
                <button>현장조치 메뉴얼</button>
            </div>
            <Table<T>
                columns={[
                    {accessorKey: "name", header: "노선", enableSorting: false},
                    {accessorKey: "part", header: "부서", enableSorting: false},
                    {accessorKey: "grade", header: "직급", enableSorting: false},
                    {accessorKey: "num", header: "연락처", enableSorting: false},
                ]}
                data={data}
                minWidth={"0"}
            />
        </div>
    </div>
}