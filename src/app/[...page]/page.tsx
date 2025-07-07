import {getMenuByPath} from "@/lib/getMenuByPath";
import {getMenus} from "@/lib/menu/getMenus";
import Main from "@/app/pages/Main";
import Menu from "@/app/pages/Menu";
import PortalLayout from "@/features/lyaouts/PortalLayout/PortalLayout";

export default async function PageMapper({ params }: { params: Promise<{page: string[]}> }) {

  // const { page } = await params;
  //
  // if (page?.[0] === '.well-known') {
  //   return <div>Not Found</div>;
  // }
  //
  // const path = "/" + (page?.join("/") ?? "");
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

  let Component;
  try {
    Component = (await import(`@/app/pages/Menu`)).default;
  } catch {
    Component = () => <Menu />
  }

  return <PortalLayout><Component /></PortalLayout>
}