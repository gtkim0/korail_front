import styles from './RightSection.module.scss';
import Image from "next/image";
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useRouter} from "next/navigation";
export default function HeaderRightSection () {

  const router = useRouter();

  const handleClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/logout`, {
      method:'post'
    }).then(res=> {
      router.push('/auth/login')
    })
  }

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
          <div onClick={()=> i.onClick?.()} key={i.label} className={styles.item}>
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