import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'host' | 'affiliate';
  membership?: 'basic' | 'premium' | 'vip';
  joinedAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithTelegram: () => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Mock login - replace with actual API call
          const mockUser: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            role: 'user',
            membership: 'basic',
            joinedAt: new Date(),
          };
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      loginWithGoogle: async () => {
        set({ isLoading: true });
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },
      
      loginWithFacebook: async () => {
        set({ isLoading: true });
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },
      
      loginWithTelegram: async () => {
        set({ isLoading: true });
        // Mock implementation
        await new Promise(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);