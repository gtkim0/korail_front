'use client';
// 대시 보드 우측 상단 타이머 및 알람
import styles from "./TopRightSection.module.scss";
import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import {ko} from "date-fns/locale"
import alarmIcon from "@/shared/assets/images/bell-filled.svg"
import ToggleSwitch from "@/shared/components/toggleSwitch/ToggleSwitch";
import Image from "next/image";
import clsx from "clsx";
import useModal from "@/shared/hooks/useModal";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import CrowdingModal from "@/features/dashboard/components/modal/CrowdingModal/CrowdingModal";
import {BaseModalFooter} from "@/shared/components/modal/BaseModal/BaseModalFooter/BaseModalFooter";
import AlarmModal from "@/features/dashboard/components/modal/AlarmModal/AlarmModal";
import {useAlarmStore} from "@/shared/store/slice/alarmSlice";
import Clock from "@/features/dashboard/components/TopRightSection/Clock";
import {createPortal} from "react-dom";
import {useSSE} from "@/shared/hooks/useSSE";

export default function TopRightSection() {
    const { isOn, toggle } = useAlarmStore();

    // 알람목록 모달
    const {isOpen, open, close} = useModal();
    const modalOnSubmit = () => {
    }

    const { messages, connected, connect, disconnect } = useSSE({
        url: "/apis/api/test/subscribe",
        autoConnect: true,
    });
    //
    // console.log(messages)

    return (<>
            <div className={styles.container}>
              <Clock/>
                <div className={styles.alarm}>
                    <div className={styles.title}>
                        <Image
                            src={alarmIcon}
                            alt={""}
                        />
                        <span>알림창</span>
                    </div>
                    <div className={styles.toggle}>
                        <ToggleSwitch checked={isOn} onChange={(checked) => {
                           toggle(checked)
                        }} height={20}/>
                        <span>{isOn ? "On" : "Off"}</span>
                    </div>
                    <button className={clsx(styles.button, styles.active)} onClick={() => {
                        open()
                    }}>알림목록
                    </button>
                </div>
            </div>
            <BaseModal
                title={"알림 목록"}
                isOpen={isOpen}
                onCloseAction={close}
                isDashboard={true}
                footer={<BaseModalFooter close={close} onSubmit={modalOnSubmit} isDashboard={true}/>}
                maxWidth={"xl"}
            >
                <AlarmModal/>
            </BaseModal>
        </>
    )
}