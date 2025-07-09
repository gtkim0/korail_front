import {getMenuByPath} from "@/lib/getMenuByPath";
import {getMenus} from "@/lib/menu/getMenus";
import Main from "@/app/pages/Main";
import Menu, {dummyMenu} from "@/app/pages/Menu";
import PortalLayout from "@/features/lyaouts/PortalLayout/PortalLayout";
import Banner from "@/app/pages/Banner";

export default async function PageMapper({ params }: { params: Promise<{page: string[]}> }) {

  const { page } = await params;
  if (page?.[0] === '.well-known') {
    return <div>Not Found</div>;
  }
  const path = "/" + (page?.join("/") ?? "");

  // @TODO
  // 여기서 메뉴 정보 받아온후 현재 PATH 와 비교해서
  // 브레드 크럼 정보와 , 메뉴 이름 넣어줄수있음
  //

  // const menus = await getMenus();
  // const menu = await getMenuByPath(path, menus); // 함수 내부에서 match
  //
  // let Component;
  // try {
  //   Component = (await import(`@/app/pages/${menu?.component}`)).default;
  // } catch (err) {
  //   Component = () => <Menu />
  // }
  //
  // return <Component />

  const currnet = dummyMenu.find(i=> i.url === path);

  let Component;
  try {
    Component = (await import(`@/app/pages/${currnet?.component}`)).default;
  } catch {
    Component = () => <Banner path={path}/>
  }

  return <PortalLayout><Component path={path}/></PortalLayout>
}