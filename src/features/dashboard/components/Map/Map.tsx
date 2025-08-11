import styles from "./Map.module.scss"
import {useRef} from "react";

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);
    return <div className={styles.container} ref={mapRef}></div>
}