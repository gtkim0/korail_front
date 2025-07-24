import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p className={styles.text}>페이지를 불러오는 중입니다...</p>
    </div>
  );
}