import { IUserData } from '@/interfaces/IUserData';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  token: string;
  userData: IUserData;
  setToken: (token: string) => void;
  setUserData: (userData: IUserData) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: '',
      userData: {
        id: 0,
        name: '',
        email: '',
      },
      setToken: (token: string) => set({ token }),
      setUserData: (userData: IUserData) => set({ userData }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
