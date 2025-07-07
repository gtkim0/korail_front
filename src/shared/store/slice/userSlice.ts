import { StateCreator } from 'zustand';

export interface UserSlice {
  username: string;
  setUsername: (name: string) => void;
}

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/immer', never]],
  [],
  UserSlice
> = (set) => ({
  username: '',
  setUsername: (name) => set((state) => {
    state.username = name;
  }),
});