// 대시보드 - 좌측 상단 노선 선택 드롭다운
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import styles from './RouteDropDown.module.scss'

export default function RouteDropDown() {
    return <>
        <button className={styles.button}>
            <div className={styles.text}>노선선택</div>
            <span className={styles.chevron}>
              <ImageWrapper width={20} height={20} src={"/arrow-down-white.svg"}/>
            </span>
        </button>
        <div></div>
    </>
}