import styles from './BaseModalFooter.module.css';
interface Props {
  editAreaRef?: any;
  close: ()=> void;
}

export const BaseModalFooter = (props: Props) => {

  const { editAreaRef, close } = props;

  return (
    <div className={styles.footer}>
      <button className={`${styles.button} ${styles.cancel}`} onClick={close}>
        취소
      </button>
      <button
        className={`${styles.button} ${styles.save}`}
        onClick={() => editAreaRef.current?.submit()}
      >
        저장
      </button>
    </div>
  );
}