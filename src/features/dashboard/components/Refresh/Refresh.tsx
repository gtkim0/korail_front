'use client';
import resetIcon from "@/shared/assets/images/reset.svg"
import {motion} from "framer-motion";
import styles from "./Refresh.module.scss";
import Image from "next/image";

interface Props {
    top?: number;
    onClick?: () => void
}

export default function Refresh({top = 50, onClick}: Props) {
    return <motion.button className={styles.button} initial={{opacity: 0, y: 5, x: "-50%"}}
                          style={{top: `${top}px`}}
                          animate={{opacity: 1, y: 0, x: "-50%"}}
                          exit={{opacity: 0, y: 5, x: "-50%"}}
                          transition={{duration: 0.25, ease: "easeInOut"}}
                          onClick={() => {
                              onClick && onClick()
                          }}>
        <Image src={resetIcon} alt="reset" width={16}
               height={16}
        />최신 데이터로 새로고침</motion.button>
}