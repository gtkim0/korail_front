import {BaseMenu} from "@/types/menu";

export default function isDescendant(menuList: BaseMenu[], parentId: string, childId: string): boolean {
  let current = menuList.find(m => m.id === childId);
  while (current) {
    if (current.pid === parentId) return true;
    current = menuList.find(m => m.id === current?.pid);
  }
  return false;
}