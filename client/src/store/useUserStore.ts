import { IUserData } from '@/interfaces/IUserData';
import { api } from '@/lib/axios';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  token: string;
  userData: IUserData;
  setToken: (token: string) => void;
  setUserData: (userData: IUserData) => void;
  reset: () => void;
}

const initialState = {
  token: '',
  userData: {
    id: 0,
    name: '',
    email: '',
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,
      setToken: (token: string) => set({ token }),
      setUserData: (userData: IUserData) => set({ userData }),
      reset: () => {
        set(initialState);
        delete api.defaults.headers.Authorization;
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
