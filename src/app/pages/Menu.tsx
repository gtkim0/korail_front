import MenuView from "@/features/menu/MenuView/page";
import {headers} from 'next/headers'
import PortalContentLayout from "@/features/lyaouts/PortalContentLayout/PortalContentLayout";
import {dummyMenu} from "@/data/dummyMenu";
import {BaseMenu} from "@/types/menu";
import MenuServer from "@/features/menu/components/MenuView/MenuServer";

export default async function Menu() {

  return (
    // <MenuView />
    <MenuServer/>
  )
}