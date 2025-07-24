import PortalLayout from "@/features/lyaouts/PortalLayout/PortalLayout";
import Banner from "@/app/pages/Banner";
import {dummyMenu} from "@/data/dummyMenu";
import {cookies} from "next/headers";
import {menuServerApi} from "@/features/menu/api/server/menuServerApi";
import {BaseMenu} from "@/types/menu";
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {notFound} from "next/navigation";

/** 동적 import 로 routing **/
export default async function PageMapper({ params }: { params: Promise<{page: string[]}> }) {

  const { page } = await params;
  if (page?.[0] === '.well-known') {
    return <div>Not Found</div>;
  }
  const path = "/" + (page?.join("/") ?? "");

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

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')

  // const menus = await menuServerApi.get(token) as BaseMenu[];
  const menus = dummyMenu;

  const currnet = menus.find(i=> i.url === path);

  let Component;
  try {
    Component = (await import(`@/app/pages/${currnet?.component}`)).default;
  } catch {
    throw notFound();
    // Component = () => <Banner />
    // 추후 catch 에서는 404 에러페이지 띄우기.
   }

  return (
    <PortalLayout menus={menus}>
      <PortalContentLayout path={path} menus={menus}>
        <Component />
      </PortalContentLayout>
    </PortalLayout>)
}