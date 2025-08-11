import styles from './TransfetListHeader.module.scss';

interface Props {
  title: string;
}

export default function TransferListHeaderTitle({title}: Props) {
  return (
    <span className={styles.title}>
      {title} <span className={styles.star}>*</span>
    </span>
  )
}