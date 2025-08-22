import {StateCreator} from 'zustand';
import {BaseMenu} from "@/types/menu";

type CommonCodes = {
  codes: any
}

export interface CommonCodeSlice {
  codes: CommonCodes | null;
  setCodes: (c: CommonCodes) => void;
  reset: () => void;
}

export const createCommonCodeSlice: StateCreator<
  CommonCodeSlice,
  [['zustand/immer', never]],
  [],
  CommonCodeSlice
> = (set) => ({
  codes: null,
  setCodes: (c) => set((state) => {
    state.codes = c;
  }),
  reset: () => set((state) => {
    state.codes = null;
  })
});