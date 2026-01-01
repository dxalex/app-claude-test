import * as SecureStore from 'expo-secure-store';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const StorageKeys = {
  USER_TOKEN: 'user_token',
  USER_DATA: 'user_data',
  SETTINGS: 'settings',
  WATCH_HISTORY: 'watch_history',
  FAVORITES: 'favorites',
  ANIME_CACHE: 'anime_cache',
};

export const secureStorage = {
  async setItem(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
  async getItem(key: string) {
    return await SecureStore.getItemAsync(key);
  },
  async removeItem(key: string) {
    await SecureStore.deleteItemAsync(key);
  },
};

export const localStorage = {
  setItem(key: string, value: any) {
    storage.set(key, JSON.stringify(value));
  },
  getItem(key: string) {
    const item = storage.getString(key);
    return item ? JSON.parse(item) : null;
  },
  removeItem(key: string) {
    storage.delete(key);
  },
  clear() {
    storage.clearAll();
  },
};
