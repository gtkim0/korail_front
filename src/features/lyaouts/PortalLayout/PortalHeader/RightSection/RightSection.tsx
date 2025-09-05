import styles from './RightSection.module.scss';
import {ImageWrapper} from "@/shared/components/ImageWrapper/ImageWrapper";
import {useRouter} from "next/navigation";
import useModal from "@/shared/hooks/useModal";
import BaseModal from "@/shared/components/modal/BaseModal/BaseModal";
import {useGlobalStore} from "@/shared/store/globalStore";
import {BaseMenu} from "@/types/menu";
import Sitemap from "@/shared/components/sitemap/Sitemap";
import {useResponsive} from "@/shared/hooks/useResponsive";

type MenuNode = BaseMenu & { children?: MenuNode[] };

const convertStruct = (flatData: BaseMenu[]) => {
  const map = new Map<string, MenuNode>();

  flatData.forEach(item => {
    map.set(item.menuId, {...item, children: []});
  });

  const roots: MenuNode[] = [];

  map.forEach(node => {
    if (node.upMenuId && map.has(node.upMenuId)) {
      map.get(node.upMenuId)!.children!.push(node);
    } else {
      roots.push(node);
    }
  });

  const toStructured = (node: MenuNode): any => ({
    name: node.menuNm,
    link: node.lnkgUrlAddrCn,
    children: node.children && node.children.length
      ? node.children.map(toStructured)
      : undefined,
  });

  return roots.map(toStructured);
};


export default function HeaderRightSection() {

  const router = useRouter();
  const {isOpen, open, close} = useModal();
  const {isMobile} = useResponsive();

  const menus = useGlobalStore(state => state.routeMenu);

  const handleClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/logout`, {
      method: 'post'
    }).then(res => {
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
      onClick: open
    },
  ]

  const dataMenus = convertStruct(menus);

  console.log(dataMenus);

  return (
    <div className={styles.container}>
      {
        !isMobile ?
          rightMenu.map(i => (
            <div onClick={() => i.onClick?.()} key={i.label} className={styles.item}>
              <div className={styles.logo}>
                <ImageWrapper src={i.src} alt={'logo'} width={20} height={20}/>
              </div>
              <span className={styles.label}>{i.label}</span>
            </div>
          ))
          :
          rightMenu.filter(i => i.label === '전체메뉴').map(i => (
            <div onClick={() => i.onClick?.()} key={i.label} className={styles.item}>
              <div className={styles.logo}>
                <ImageWrapper src={i.src} alt={'logo'} width={20} height={20}/>
              </div>
              <span className={styles.label}>{i.label}</span>
            </div>
          ))
      }
      <BaseModal
        isOpen={isOpen}
        onCloseAction={close}
        title={'사이트맵'}
        maxWidth={'xxl'}
      >
        <Sitemap close={close} dataMenus={dataMenus}/>
      </BaseModal>
    </div>
  )
}
