import styles from "./RealTimeStationList.module.scss"
import Table from "@/shared/components/table/BaseTable/BaseTable";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";
import React from "react";

export default function RealTimeStationList() {
    const data = [{name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
        name: "승강장",
        crowding: "심각"
    }, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {name: "승강장", crowding: "심각"}]
    return <>
        <div className={styles.table}>
            <Table<T>
                columns={[
                    {accessorKey: "num", header: "번호", enableSorting: false, maxSize: 48},
                    {accessorKey: "name", header: "구역명", enableSorting: false},
                    {
                        accessorKey: "crowding", header: "혼잡도", cell: info => {
                            const value = info.getValue<string>()
                            return <CrowdingBadge level={1} percent={21} noBoxShadow={true}/>
                        }
                    },
                ]}
                data={data}
                minWidth={"0"}
                bgColor={"#162b4e"}
            />
        </div>
        <button className={styles.button}>비상 대응 메뉴얼</button>
    </>
}