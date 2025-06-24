import { create } from 'zustand';

export const useAuthStore = create(set => ({
  token: 'lively-secret-token',
  setToken: (token: string) => set({ token }),
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
