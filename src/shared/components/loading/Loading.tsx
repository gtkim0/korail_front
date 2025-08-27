'use client';
import styles from './loading.module.scss';
import icon from "@/shared/assets/images/loading.svg"
import {createPortal} from "react-dom";
import Image from "next/image";

export default function GlobalLoading() {
    return createPortal(
        (
            <div className={styles.container}>
                <Image src={icon} className={styles.icon} alt="loading"/>
            </div>
        ),
        document.body,
    );
}