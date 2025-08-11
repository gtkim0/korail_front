import styles from './SectionCrowdingStatus.module.scss'
import Table from "@/shared/components/table/BaseTable/BaseTable";
import React from "react";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";

export default function SectionCrowdingStatus() {
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
    return <div className={styles.table}>
        <Table<T>
            columns={[
                {accessorKey: "name", header: "구역명", enableSorting: false},
                {
                    accessorKey: "crowding", header: "혼잡도", cell: info => {
                        const value = info.getValue<string>()
                        return <CrowdingBadge level={1} percent={21}/>
                    }
                },
            ]}
            data={data}
            minWidth={"0"}
            bgColor={"#162b4e"}
        />
    </div>
}