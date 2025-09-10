import Image from "next/image";
import icon from "@/shared/assets/images/dashboard_empty.svg"
import styles from "./Empty.module.scss"
import clsx from "clsx";

interface Props {
    className?: string;
    text?: string;
}

export function Empty({className, text = "혼잡도 데이터 없음"}: Props) {
    return <div className={clsx([styles.container, className && className])}>
        <Image src={icon} alt={"empty"}/>
        <span> {text}</span>
    </div>
}