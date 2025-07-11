import styles from './RightSection.module.scss';
import Image from "next/image";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
export default function HeaderRightSection () {

  const handleClick = () => {}

  const rightMenu = [
  {
    label: '로그아웃',
    src: '/logout.svg',
    onClick: handleClick
  },
  {
    label: '마이페이지',
    src: '/myInfo.svg',
    link: '/myPage'
  },
  {
    label: '전체메뉴',
    src: '/menu.svg',
    link: ''
  },
]


  return (
    <div className={styles.container}>
      {
        rightMenu.map(i=> (
          <div key={i.label} className={styles.item}>
            <div className={styles.logo}>
              <ImageWrapper src={i.src} alt={'logo'} width={20} height={20} />
            </div>
            <span className={styles.label}>{i.label}</span>
          </div>
        ))
      }
    </div>
  )
}