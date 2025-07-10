import MenuView from "@/features/menu/MenuView/page";
import {headers} from 'next/headers'
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {dummyMenu} from "@/data/dummyMenu";

export default async function Menu({path}: { path: string }) {
  // const data = await fetch('')

  // const headerList = await headers();
  // const fullUrl = headerList.get('x-url') ?? headerList.get('referer')

  return (
    <PortalContentLayout path={path} menus={dummyMenu}>
      <MenuView initialMenus={dummyMenu}/>
    </PortalContentLayout>
  )
}