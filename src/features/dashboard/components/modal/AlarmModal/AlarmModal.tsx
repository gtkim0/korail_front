import styles from "./AlarmModal.module.scss"
import Table from "@/shared/components/table/BaseTable/BaseTable";
import React from "react";

export default function AlarmModal() {
    const data = [
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },
        {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        }, {
            date: "2025-04-14 12:00:00",
            line_name: "경인선",
            station_name: "남영",
            sort: "역사명",
            step: "심각",
            per: "140",
            cont: "인천-연천 k0660 심각 발생"
        },

    ]
    return <div className={styles.container}>
        <div className={styles.table}>
            <Table<T>
                columns={[
                    {
                        id: "num", header: "", cell: (
                            {row}
                        ) => {
                            //추후 페이지 번호 계산 로직 추가
                            return row.index + 1
                        }, size: 80
                    },
                    {accessorKey: "date", header: "데이터 기준일자", enableSorting: false, size: 200},
                    {accessorKey: "line_name", header: "노선명", enableSorting: false, size: 120},
                    {accessorKey: "station_name", header: "역사명", enableSorting: false, size: 120},
                    {accessorKey: "sort", header: "구분", enableSorting: false, size: 80},
                    {accessorKey: "step", header: "혼잡도", enableSorting: false, size: 80},
                    {accessorKey: "per", header: "%", enableSorting: false, size: 80},
                    {accessorKey: "cont", header: "내용", enableSorting: false, size: 300},
                ]}
                data={data}
                minWidth={"0"}
                bgColor={"#162b4e"}
            />
        </div>
    </div>
}