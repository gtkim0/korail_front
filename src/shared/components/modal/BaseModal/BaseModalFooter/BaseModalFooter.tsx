import styles from './BaseModalFooter.module.css';
interface Props {
  onSubmit: ()=> void;
  close: ()=> void;
  disabled?: boolean;
}

export const BaseModalFooter = (props: Props) => {

  const { onSubmit, close, disabled } = props;

  return (
    <div className={styles.footer}>
      <button className={`${styles.button} ${styles.cancel}`} onClick={close}>
        취소
      </button>
      <button
        type={'submit'}
        className={`${styles.button} ${styles.save}`}
        onClick={onSubmit}
        style={{ background: disabled ? 'grey': '#0061bb', color: disabled ? '#000' : '#fff'}}
      >
        저장
      </button>
    </div>
  );
}