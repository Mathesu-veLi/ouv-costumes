import { IUserData } from '@/interfaces/IUserData';
import { create } from 'zustand';

interface UserState {
  token: string;
  userData: IUserData;
  setToken: (token: string) => void;
  setUserData: (userData: IUserData) => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: '',
  userData: {
    id: 0,
    name: '',
    email: '',
  },
  setToken: (token: string) => set({ token }),
  setUserData: (userData: IUserData) => set({ userData }),
}));
