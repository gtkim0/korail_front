import styles from './TableFilter.module.css'
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import clsx from "clsx";

export default function TableFilter () {
  return (
    <div className={styles.tableFilter}>
      <div
        style={{
          display:'flex',
          alignItems: 'center',
          gap: '.8rem'
        }}
      >
        <span className={clsx('font_lg', 'text_bold','font')}>
          검색 결과
          <span className={'primary'}> 24개</span>
        </span>

        <span className={styles.line}> | </span>

        <div
          style={{
            display:'flex',
            gap:'.2rem',
            alignItems:'center'
          }}
        >
          <span className={clsx('font','font_md')}>10개씩 보기</span>
          <ImageWrapper width={16} height={16} src={'/arrow-down.svg'} />
        </div>
      </div>

      <div style={{display:'flex', alignItems:'center', gap:'.8rem'}}>
        <button style={{width:'8rem', padding:'0 1rem', height:'3.2rem'}}>수정</button>
        <button style={{width:'8rem', padding:'0 1rem', height:'3.2rem', background:'#fff'}}>삭제</button>
      </div>
    </div>
  )
}