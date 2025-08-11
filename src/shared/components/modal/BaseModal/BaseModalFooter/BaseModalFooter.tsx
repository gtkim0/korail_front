import styles from './BaseModalFooter.module.css';
import clsx from "clsx";

interface Props {
    onSubmit: () => void;
    close: () => void;
    disabled?: boolean;
    isDashboard?: boolean;
}

export const BaseModalFooter = (props: Props) => {

    const {onSubmit, close, disabled, isDashboard} = props;

    return (
        <div className={clsx(styles.footer, isDashboard && styles.darkMode)}>
            <button className={`${styles.button} ${styles.cancel}`} onClick={close}>
                취소
            </button>
            <button
                type={'submit'}
                className={`${styles.button} ${styles.save}`}
                onClick={onSubmit}
                style={{background: disabled ? 'grey' : '#0061bb', color: disabled ? '#000' : '#fff'}}
            >
                저장
            </button>
        </div>
    );
}