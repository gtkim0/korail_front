import {useGlobalStore} from "@/shared/store/globalStore";

interface Props {
  onCreateMenu: () => void;
  onDeleteMenu: () => void;
  onUpMenu: () => void;
  onDownMenu: () => void;
  disableCreate?: boolean;
}

export default function MenuHeader (props: Props) {

  const {
    onCreateMenu,
    onDeleteMenu,
    onUpMenu,
    onDownMenu,
    disableCreate
  } = props;

  return (
    <div style={{display:'flex', gap:'1rem'}}>
      {
        <button disabled={disableCreate} onClick={onCreateMenu}>추가</button>
      }
      <button onClick={onDeleteMenu}>삭제</button>
      <button onClick={onUpMenu}>위로</button>
      <button onClick={onDownMenu}>아래로</button>
    </div>
  )
}