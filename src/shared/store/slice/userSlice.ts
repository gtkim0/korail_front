import { StateCreator } from 'zustand';

interface User {
  id: number;
  username: string;
}

export interface UserSlice {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: ()=> void;
}

export const createUserSlice: StateCreator<
  UserSlice,
  [['zustand/immer', never]],
  [],
  UserSlice
> = (set) => ({
  username: '',
  setUser: (user) => set((state) => {
    state.user = user;
  }),
  clearUser: () => set({ user: null })
});