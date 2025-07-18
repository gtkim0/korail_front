import {useTab} from "@/shared/provider/TabProvider";
import styles from './TabList.module.scss'
import clsx from "clsx";

export default function TabList() {
  const { activeTab, setActiveTab } = useTab();

  return (
    <div className={styles.tabList}>
      <button onClick={() => setActiveTab('find-id')} className={clsx(styles.left, activeTab === 'find-id' && styles.active)}>
        아이디 찾기
      </button>
      <button onClick={() => setActiveTab('find-password')} className={clsx(styles.right, activeTab === 'find-password' && styles.active)}>
        비밀번호 찾기
      </button>
    </div>
  );
}