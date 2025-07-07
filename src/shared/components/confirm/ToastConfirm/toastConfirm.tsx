import { toast } from 'react-hot-toast'
import styles from './toastConfirm.module.css' // 필요시 사용

export function toastConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const toastId = toast.custom((t) => (
      <div
        className={styles.toastContainer + (t.visible ? ` ${styles.show}` : '')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.message}>{message}</div>
        <div className={styles.buttonGroup}>
          <button
            className={styles.cancelButton}
            onClick={() => {
              toast.dismiss(toastId)
              resolve(false)
            }}
          >
            취소
          </button>
          <button
            className={styles.confirmButton}
            onClick={() => {
              toast.dismiss(toastId)
              resolve(true)
            }}
          >
            확인
          </button>
        </div>
      </div>
    ), { duration: Infinity })
  })
}