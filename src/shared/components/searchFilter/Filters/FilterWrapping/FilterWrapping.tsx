import {ReactNode} from "react";
import styles from './FilterWrapping.module.css'

type Props = {
  title: string;
  children: ReactNode;
}

export default function FilterWrapping ({ title, children}: Props) {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
      <span style={{fontSize:'1.4rem', fontWeight:'bold'}}>{title}</span>
      <div
        style={{
          display:'flex',
          gap:'1rem',
          alignItems:'center'
        }}
      >
        { children }
      </div>
    </div>
  )
}