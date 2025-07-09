import { StateCreator } from 'zustand';
import {BaseMenu} from "@/types/menu";
import {generateTempId} from "@/shared/utils/generateTempId";

export interface MenuSlice {
  menu: BaseMenu[];
  selectedMenu: BaseMenu;
  setSelectMenu: (menu: BaseMenu) => void;
  setMenu: (menu: BaseMenu[]) => void;
  addMenu: () => void;
  delMenu: () => void;
  upMenu: () => void;
  downMenu: ()=> void;
}

export const createMenuSlice: StateCreator<
  MenuSlice,
  [['zustand/immer', never]],
  [],
  MenuSlice
> = (set) => ({
  menu: [],
  selectedMenu: {} as BaseMenu,
  setSelectMenu: (menu) => set((state)=> {
    state.selectedMenu = menu
  }),
  setMenu: (menu) => set((state) => {
    state.menu = menu;
  }),
  addMenu: () => set((state) => {
    if(!state.selectedMenu || state.selectedMenu.depth === 3) return ;

    const lastOrder = state.menu.filter(i=> i.pid === state.selectedMenu.id).length + 1;

    const addItem = {
      id: generateTempId(),
      pid: state.selectedMenu.id,
      url: '',
      component: '',
      order: lastOrder,
      name: '새 메뉴',
      depth: state.selectedMenu.depth + 1,
      description: '',
    }

    state.menu = [...state.menu, addItem]
  }),
  delMenu: () => set((state)=> {
    if(!state.selectedMenu) return ;
    state.menu = [...state.menu.filter(i=> i.id !== state.selectedMenu.id)]
  }),
  upMenu: () => set((state)=> {

    if(!state.selectedMenu || state.selectedMenu.order === 1) return;

    const siblings =
      state.menu
        .filter(i=> i.pid === state.selectedMenu.pid)
        .sort((a,b)=> a.order - b.order)

    const index = siblings.findIndex(i=> i.id === state.selectedMenu.id);

    if(index <= 0) return state.menu;

    const prevMenu = siblings[index - 1];

    const updated = state.menu.map(i=> {
      if(i.id === state.selectedMenu.id) return { ...i, order: prevMenu.order};
      if(i.id === prevMenu.id) return { ...i, order: state.selectedMenu.order};
      return i
    })

    state.selectedMenu = {
      ...state.selectedMenu,
      order: prevMenu.order
    }

    state.menu = updated
  }),
  downMenu: ()=> set((state)=> {
    if(!state.selectedMenu) return;

    const siblings =
      state.menu
        .filter(i=> i.pid === state.selectedMenu.pid)
        .sort((a,b)=> a.order - b.order)

    const index = siblings.findIndex(i => i.id === state.selectedMenu.id);
    if (index === -1 || index === siblings.length - 1) return state.menu;

    const nextMenu = siblings[index + 1];
    if (!nextMenu) return state.menu;

    const updated = state.menu.map(i => {
      if (i.id === state.selectedMenu.id) return { ...i, order: nextMenu.order };
      if (i.id === nextMenu.id) return { ...i, order: state.selectedMenu.order };
      return i;
    });

    state.selectedMenu = {
      ...state.selectedMenu,
      order: nextMenu.order
    }

    state.menu = updated
  })
});