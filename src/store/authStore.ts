import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { demoCredentials, demoUsers } from '@/data/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        const emailLower = email.toLowerCase().trim();
        const cred = demoCredentials[emailLower];

        if (!cred) {
          return { success: false, error: 'No account found with this email.' };
        }
        if (cred.password !== password) {
          return { success: false, error: 'Incorrect password. Please try again.' };
        }

        const user = demoUsers.find((u) => u.id === cred.userId);
        if (!user) {
          return { success: false, error: 'User account not found. Contact HR.' };
        }

        set({ user, isAuthenticated: true });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'meritsync-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
