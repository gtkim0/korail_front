import MenuView from "@/features/menu/MenuView/page";
import {headers} from 'next/headers'
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {dummyMenu} from "@/data/dummyMenu";
import {BaseMenu} from "@/types/menu";

export default async function Menu({path, menus}: { path: string, menus: BaseMenu[] }) {

  return (
    <PortalContentLayout path={path} menus={menus}>
      <MenuView initialMenus={dummyMenu}/>
    </PortalContentLayout>
  )
}