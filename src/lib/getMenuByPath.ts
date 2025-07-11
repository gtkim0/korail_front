import {BaseMenu} from "@/types/menu";

export async function getMenuByPath (path: string, menus: BaseMenu[]) {
  return menus.find(i=> i.url === path)
}