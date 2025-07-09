import {useGlobalStore} from "@/shared/store/globalStore";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";

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
    <div
      style={{
        display:'flex',
        padding:'1.2rem 1.6rem',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottom:'1px solid #D5D5D6'
      }}
    >
      <div style={{height:'3.2rem', display:'flex', flex: 1}}>
        <div
          style={{
            display:'flex',
            alignItems:'center',
            gap:'.8rem',
            flex: 1,
            height:'100%'
          }}
        >
            <button
              disabled={disableCreate}
              onClick={onCreateMenu}
              style={{
                display:'flex',
                minWidth: '6.4rem',
                padding:'0 1rem',
                justifyContent:'center',
                alignItems:'center',
                gap:'.2rem',
                borderRadius:'4px',
                border: '1px solid #9FD1FF',
                background:'#E3EBF2',
                height: '100%',
                color:'#00417A'
              }}
            >
              <ImageWrapper width={16} height={16} src={'/plus_fill.svg'} />
              추가
            </button>
            <button
              style={{
                minWidth: '6.4rem',
                padding:'0 1rem',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                gap:'.2rem',
                borderRadius:'4px',
                border: '1px solid #D5D5D6',
                background:'#fff',
                height: '100%'
              }}
              onClick={onDeleteMenu}>
              삭제
            </button>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'.8rem'}}>
          <button
            onClick={onUpMenu}
            style={{
              height:'100%',
              padding:'6px',
              borderRadius:'6px',
              border:'1px solid #D5D5D6'
            }}
          >
            <ImageWrapper width={20} height={20} src={'/arrow-top.svg'} />
          </button>
          <button
            onClick={onDownMenu}
            style={{
              height:'100%',
              padding:'6px',
              borderRadius:'6px',
              border:'1px solid #D5D5D6'
            }}
          >
            <ImageWrapper width={20} height={20} src={'/arrow-down.svg'} />
          </button>
        </div>
      </div>
    </div>
  )
}