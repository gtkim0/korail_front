import styles from './SectionCrowdingStatus.module.scss'
import Table from "@/shared/components/table/BaseTable/BaseTable";
import React from "react";
import CrowdingBadge from "@/features/dashboard/components/CrowdingBadge/CrowdingBadge";
import useModal from "@/shared/hooks/useModal";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import CrowdingModal from "@/features/dashboard/components/modal/CrowdingModal/CrowdingModal";

export default function SectionCrowdingStatus() {

    const {isOpen, open, close} = useModal();
    const modalOnSubmit = () => {
    }

    const data = [{name: "승강장1", crowding: "심각"}, {name: "승강장", crowding: "심각"}, {
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
                    {accessorKey: "name", header: "구역명", enableSorting: false},
                    {
                        accessorKey: "crowding", header: "혼잡도", cell: info => {
                            const value = info.getValue<string>()
                            return <CrowdingBadge level={1} percent={21} noBoxShadow={true}/>
                        }
                    },
                    {
                        accessorKey: "", header: "상세", cell: info => {
                            const value = info.getValue<string>()
                            return <button className={styles.go_detail} onClick={() => {
                                open()
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M16.318 17.4489C14.8468 18.6678 12.9582 19.4004 10.8984 19.4004C6.20402 19.4004 2.39844 15.5948 2.39844 10.9004C2.39844 6.20597 6.20402 2.40039 10.8984 2.40039C15.5929 2.40039 19.3984 6.20597 19.3984 10.9004C19.3984 12.9589 18.6667 14.8465 17.4491 16.3173L20.7662 19.6343C21.0786 19.9468 21.0786 20.4533 20.7662 20.7657C20.4538 21.0781 19.9473 21.0781 19.6348 20.7657L16.318 17.4489ZM3.99844 10.9004C3.99844 7.08963 7.08767 4.00039 10.8984 4.00039C14.7092 4.00039 17.7984 7.08963 17.7984 10.9004C17.7984 12.7135 17.0991 14.3632 15.9555 15.5947C15.8799 15.6322 15.809 15.6825 15.746 15.7455C15.6829 15.8086 15.6326 15.8796 15.595 15.9554C14.3633 17.1002 12.7126 17.8004 10.8984 17.8004C7.08767 17.8004 3.99844 14.7112 3.99844 10.9004Z"
                                          fill="#fff"/>
                                </svg>
                                상세
                            </button>
                        }
                    },
                ]}
                data={data}
                minWidth={"0"}
                bgColor={"#162b4e"}
            />
        </div>
        <BaseModal
            title={"혼잡도 현황"}
            isOpen={isOpen}
            onCloseAction={close}
            isDashboard={true}
            footer={<BaseModalFooter close={close} onSubmit={modalOnSubmit} isDashboard={true}/>}
        >
            <CrowdingModal/>
        </BaseModal></>
}