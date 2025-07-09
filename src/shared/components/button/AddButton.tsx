import styles from './AddButton.module.css'
interface Props {
  onClick?: ()=> void;
  text: string
}

export default function AddButton (props: Props) {

  const { onClick, text } = props;

  return (
    <button className={styles.button} onClick={onClick}>
      <span>{ text }</span>
    </button>
  )
}