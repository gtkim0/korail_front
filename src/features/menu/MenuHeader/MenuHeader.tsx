import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import styles from './MenuHeader.module.scss'

interface Props {
  onCreateMenu: () => void;
  onDeleteMenu: () => void;
  onUpMenu: () => void;
  onDownMenu: () => void;
  disableCreate?: boolean;
}

export default function MenuHeader(props: Props) {

  const {
    onCreateMenu,
    onDeleteMenu,
    onUpMenu,
    onDownMenu,
    disableCreate
  } = props;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.btnWrapper}>
          <button
            disabled={disableCreate}
            onClick={onCreateMenu}
            className={styles.createBtn}
          >
            <ImageWrapper width={16} height={16} src={'/plus_fill.svg'}/>
            추가
          </button>
          <button
            className={styles.delBtn}
            onClick={onDeleteMenu}>
            삭제
          </button>
        </div>
        <div className={styles.arrowWrapper}>
          <button onClick={onUpMenu}>
            <ImageWrapper width={20} height={20} src={'/arrow-top.svg'}/>
          </button>
          <button onClick={onDownMenu}>
            <ImageWrapper width={20} height={20} src={'/arrow-down.svg'}/>
          </button>
        </div>
      </div>
    </div>
  )
}