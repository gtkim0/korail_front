import { StateCreator } from 'zustand';
import {BaseMenu} from "@/types/menu";

export interface RouteSlice {
  routeMenu: BaseMenu[];
  selectedRouteMenu: BaseMenu | null;
  expandedMenuIds: string[];

  setRouteMenu: (menu: BaseMenu[]) => void;
  setSelectedRouteMenu: (menu: BaseMenu | null) => void;
  expandMenu: (id: string) => void;
  collapseMenu: (id: string) => void;
  resetExpandedMenus: () => void;
}

export const createRouteSlice: StateCreator<
  RouteSlice,
  [['zustand/immer', never]],
  [],
  RouteSlice
> = (set) => ({
  routeMenu: [],
  selectedRouteMenu: null,
  expandedMenuIds: [],

  setRouteMenu: (menu)=> set(state=> {
    state.routeMenu = menu;
  }),

  setSelectedRouteMenu: (menu) => set(state => {
    state.selectedRouteMenu = menu;
  }),

  expandMenu: (id) => set(state => {
    if (!state.expandedMenuIds.includes(id)) {
      state.expandedMenuIds.push(id);
    }
  }),
  collapseMenu: (id) => set(state => {
    state.expandedMenuIds = state.expandedMenuIds.filter(item => item !== id);
  }),
  resetExpandedMenus: () => set(state => {
    state.expandedMenuIds = [];
  }),
});