import styles from './FilterGroup.module.css';
export default function FilterGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.filterGroup}>
      <div className={styles.filterWrapper}>
        {children}
      </div>
    </div>
  );
}