import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    email: string;
    instrument: string;
  };
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
