import {StateCreator} from 'zustand';
import {BaseMenu, SettingMenu} from "@/types/menu";
import {generateTempId} from "@/shared/utils/generateTempId";
import {current} from "immer";

export interface MenuSlice {
  menu: SettingMenu[];
  selectedMenu: SettingMenu;
  setSelectMenu: (menu: SettingMenu) => void;
  setMenu: (menu: SettingMenu[]) => void;
  addMenu: () => void;
  delMenu: () => void;
  upMenu: () => void;
  downMenu: () => void;
}

const eqItem = (a: SettingMenu, b: SettingMenu) =>
  (a?.cid && b?.cid) ? a.cid === b.cid : a.menuId === b.menuId;

const sameParent = (node: SettingMenu, selected: SettingMenu) => {
  if (selected.upMenuId) return node.upMenuId === selected.upMenuId;
  if (selected.upCid) return node.upCid === selected.upCid;
  return false;
};

export const createMenuSlice: StateCreator<
  MenuSlice,
  [['zustand/immer', never]],
  [],
  MenuSlice
> = (set) => ({
  menu: [],
  selectedMenu: {} as BaseMenu,
  setSelectMenu: (menu) => set((state) => {
    state.selectedMenu = menu
  }),
  setMenu: (menu) => set((state) => {
    state.menu = menu;
  }),
  addMenu: () => set((state) => {
    if (!state.selectedMenu || state.selectedMenu.depth === 3) return;

    const lastOrder = state.menu.filter(i => i.upMenuId === state.selectedMenu.menuId).length + 1;

    const addItem = {
      // menuId: generateTempId(),
      cid: generateTempId(),
      upCid: state.selectedMenu.cid ?? null,
      menuId: '',
      upMenuId: state.selectedMenu.menuId,
      lnkgUrlAddrCn: '',
      menuSortSn: lastOrder,
      menuNm: '새 메뉴',
      depth: state.selectedMenu.depth + 1,
      menuExplnCn: '',
      insdPrgrmIdntfNm: ''
    }

    state.menu = [...state.menu, addItem]
    state.selectedMenu = addItem
  }),
  delMenu: () => set((state) => {
    if (!state.selectedMenu) return;

    state.menu = state.menu.filter(i => !eqItem(i, state.selectedMenu));
  }),

  upMenu: () => set((state) => {
    if (!state.selectedMenu) return;

    const siblings = state.menu
      .filter(i => sameParent(i, state.selectedMenu))
      .sort((a, b) => a.menuSortSn - b.menuSortSn);

    const index = siblings.findIndex(i => eqItem(i, state.selectedMenu));
    if (index <= 0) return;

    const prevMenu = siblings[index - 1];

    state.menu = state.menu.map(i => {
      if (eqItem(i, state.selectedMenu)) return {...i, menuSortSn: prevMenu.menuSortSn};
      if (eqItem(i, prevMenu)) return {...i, menuSortSn: state.selectedMenu.menuSortSn};
      return i;
    });

    state.selectedMenu = {...state.selectedMenu, menuSortSn: prevMenu.menuSortSn};
  }),

  downMenu: () => set((state) => {
    if (!state.selectedMenu) return;

    const siblings = state.menu
      .filter(i => sameParent(i, state.selectedMenu))
      .sort((a, b) => a.menuSortSn - b.menuSortSn);

    const index = siblings.findIndex(i => eqItem(i, state.selectedMenu));
    if (index === -1 || index === siblings.length - 1) return;

    const nextMenu = siblings[index + 1];

    state.menu = state.menu.map(i => {
      if (eqItem(i, state.selectedMenu)) return {...i, menuSortSn: nextMenu.menuSortSn};
      if (eqItem(i, nextMenu)) return {...i, menuSortSn: state.selectedMenu.menuSortSn};
      return i;
    });

    state.selectedMenu = {...state.selectedMenu, menuSortSn: nextMenu.menuSortSn};
  }),
});