import styles from "./TopCenterSection.module.scss"
import {motion} from "framer-motion";
import React, {useState} from "react";

interface Props {

}

export default function TopCenterSection({}: Props) {
    const data = [{name: "연천-인천", id: "1"}, {name: "광운대-신창", id: "2"}, {name: "영등포-광명", id: "3"}, {
        name: "의정부-서동탄",
        id: "4"
    }];
    const [activeTab, setActiveTab] = useState(data[0]);

    return <div className={styles.container}>
        {data.map((el, idx) => (
            <div key={`route-${idx}`} className={styles.item} onClick={() => setActiveTab(el)}>
                {activeTab.id == el.id && <motion.div layoutId={"tabActive"} className={styles.activeTab}
                                                      transition={{
                                                          type: "spring",
                                                          stiffness: 300,
                                                          damping: 30
                                                      }}></motion.div>}
                <span className={activeTab.id == el.id ? styles.active : ""}>{el.name}</span>
            </div>
        ))}
    </div>
}