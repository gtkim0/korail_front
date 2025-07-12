import { StateCreator } from 'zustand';
import { BaseMenu } from "@/types/menu";

export interface RouteSlice {
  routeMenu: BaseMenu[];
  selectedRouteMenu: BaseMenu | null;
  expandedMenuId: string | null;

  setRouteMenu: (menu: BaseMenu[]) => void;
  setSelectedRouteMenu: (menu: BaseMenu | null) => void;
  setExpandedMenuId: (id: string | null) => void;
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
  expandedMenuId: null,

  setRouteMenu: (menu) => set(state => {
    state.routeMenu = menu;
  }),

  setSelectedRouteMenu: (menu) => set(state => {
    state.selectedRouteMenu = menu;
  }),

  setExpandedMenuId: (id) => set(state => {
    state.expandedMenuId = id;
  }),

  resetExpandedMenus: () => set(state => {
    state.expandedMenuId = null;
  }),
});