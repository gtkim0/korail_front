'use client';

import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import {createMenuSlice, MenuSlice} from './slice/menuSlice';
import {createUserSlice, UserSlice} from './slice/userSlice';
import {createRouteSlice, RouteSlice} from './slice/routeSlice';
import {createCommonCodeSlice, CommonCodeSlice} from "@/shared/store/slice/commonCodeSlice";

import {StoreApi} from 'zustand';

type GlobalStore = MenuSlice & UserSlice & RouteSlice & CommonCodeSlice;

export const useGlobalStore = create<GlobalStore>()(
  immer((set, get, store) => ({
    ...createMenuSlice(
      set as StoreApi<MenuSlice>['setState'],
      get as StoreApi<MenuSlice>['getState'],
      store as StoreApi<MenuSlice>
    ),
    ...createUserSlice(
      set as StoreApi<UserSlice>['setState'],
      get as StoreApi<UserSlice>['getState'],
      store as StoreApi<UserSlice>
    ),
    ...createRouteSlice(
      set as StoreApi<RouteSlice>['setState'],
      get as StoreApi<RouteSlice>['getState'],
      store as StoreApi<RouteSlice>
    ),
    ...createCommonCodeSlice(
      set as StoreApi<CommonCodeSlice>['setState'],
      get as StoreApi<CommonCodeSlice>['getState'],
      store as StoreApi<CommonCodeSlice>
    )
  }))
);