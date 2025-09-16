import {BaseMenu, SettingMenu} from "@/types/menu";

export default function isDescendant(menuList: SettingMenu[], parentId: string, childId: string): boolean {
  let current = menuList.find(m => m.menuId === childId);
  while (current) {
    if (current.upMenuId === parentId) return true;
    current = menuList.find(m => m.menuId === current?.upMenuId);
  }
  return false;
}