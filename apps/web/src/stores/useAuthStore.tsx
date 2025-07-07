import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {TelegramUser} from '../services/api';

export interface AuthState {
  user: TelegramUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: TelegramUser) => void;
  clearSession: () => void;
  updateUser: (updates: Partial<TelegramUser>) => void;
  setLoading: (loading: boolean) => void;
}

const initialState: Omit<
  AuthState,
  'setUser' | 'clearSession' | 'updateUser' | 'setLoading'
> = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user: TelegramUser) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),
      clearSession: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),
      updateUser: (updates: Partial<TelegramUser>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {...currentUser, ...updates},
          });
        }
      },
      setLoading: (loading: boolean) => set({isLoading: loading}),
    }),
    {
      name: 'auth-storage',
      skipHydration: true,
    },
  ),
);
