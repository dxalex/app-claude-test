import { create } from 'zustand';
import { User, UserSettings } from '@/types';
import { localStorage, secureStorage, StorageKeys } from '@/utils/storage';

interface AuthState {
  user: User | null;
  settings: UserSettings;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => void;
  loadUser: () => Promise<void>;
}

const defaultSettings: UserSettings = {
  spoilerProtection: true,
  blurThumbnails: true,
  releaseAlerts: true,
  episodeDensity: 'comfortable',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  settings: defaultSettings,
  isAuthenticated: false,
  isLoading: true,

  login: async (email: string, password: string) => {
    try {
      // Mock authentication - replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        timezone: 'UTC',
      };

      await secureStorage.setItem(StorageKeys.USER_TOKEN, 'mock-token');
      localStorage.setItem(StorageKeys.USER_DATA, mockUser);

      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name,
        timezone: 'UTC',
      };

      await secureStorage.setItem(StorageKeys.USER_TOKEN, 'mock-token');
      localStorage.setItem(StorageKeys.USER_DATA, mockUser);

      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    await secureStorage.removeItem(StorageKeys.USER_TOKEN);
    localStorage.removeItem(StorageKeys.USER_DATA);
    set({ user: null, isAuthenticated: false });
  },

  updateSettings: (newSettings: Partial<UserSettings>) => {
    set((state) => {
      const updatedSettings = { ...state.settings, ...newSettings };
      localStorage.setItem(StorageKeys.SETTINGS, updatedSettings);
      return { settings: updatedSettings };
    });
  },

  loadUser: async () => {
    try {
      const token = await secureStorage.getItem(StorageKeys.USER_TOKEN);
      const userData = localStorage.getItem(StorageKeys.USER_DATA);
      const savedSettings = localStorage.getItem(StorageKeys.SETTINGS);

      if (token && userData) {
        set({
          user: userData,
          settings: savedSettings || defaultSettings,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Load user error:', error);
      set({ isLoading: false });
    }
  },
}));
