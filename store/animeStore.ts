import { create } from 'zustand';
import { Anime, WatchHistory, Notification } from '@/types';
import { localStorage, StorageKeys } from '@/utils/storage';

interface AnimeState {
  favorites: Anime[];
  watchHistory: WatchHistory[];
  notifications: Notification[];
  continueWatching: Anime[];
  newThisWeek: Anime[];

  addFavorite: (anime: Anime) => void;
  removeFavorite: (animeId: string) => void;
  markEpisodeWatched: (animeId: string, episodeId: string) => void;
  updateProgress: (animeId: string, episodeId: string, progress: number) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (notificationId: string) => void;
  loadData: () => void;
}

// Mock data for demonstration
const mockAnime: Anime[] = [
  {
    id: '1',
    title: 'Attack on Titan: Final Season',
    titleEnglish: 'Attack on Titan: Final Season',
    titleJapanese: '進撃の巨人 The Final Season',
    description: 'The war for Paradis zeroes in on Shiganshina just as Jaegerists have seized control. After taking a huge blow from a surprise attack, Marley swiftly acts to return the favor.',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx139-vfwMxhd2IK91.jpg',
    status: 'finished',
    format: 'TV',
    episodes: 28,
    duration: 23,
    genres: ['Action', 'Drama', 'Fantasy', 'Mystery'],
    score: 9.1,
    popularity: 98500,
  },
  {
    id: '2',
    title: 'Jujutsu Kaisen',
    titleEnglish: 'Jujutsu Kaisen',
    titleJapanese: '呪術廻戦',
    description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself. He enters a shaman\'s school to be able to locate the demon\'s other body parts and thus exorcise himself.',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-bbBWj4pEFseh.jpg',
    status: 'airing',
    format: 'TV',
    episodes: 24,
    duration: 24,
    genres: ['Action', 'Fantasy', 'Supernatural'],
    score: 8.7,
    popularity: 85200,
  },
  {
    id: '3',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    titleEnglish: 'Demon Slayer: Kimetsu no Yaiba',
    titleJapanese: '鬼滅の刃',
    description: 'It is the Taisho Period in Japan. Tanjiro, a kindhearted boy who sells charcoal for a living, finds his family slaughtered by a demon.',
    coverImage: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-PEn1CTc93blC.jpg',
    status: 'finished',
    format: 'TV',
    episodes: 26,
    duration: 24,
    genres: ['Action', 'Fantasy', 'Supernatural'],
    score: 8.6,
    popularity: 92300,
  },
];

export const useAnimeStore = create<AnimeState>((set, get) => ({
  favorites: [],
  watchHistory: [],
  notifications: [],
  continueWatching: mockAnime.slice(0, 2),
  newThisWeek: mockAnime,

  addFavorite: (anime: Anime) => {
    set((state) => {
      const favorites = [...state.favorites, anime];
      localStorage.setItem(StorageKeys.FAVORITES, favorites);
      return { favorites };
    });
  },

  removeFavorite: (animeId: string) => {
    set((state) => {
      const favorites = state.favorites.filter((a) => a.id !== animeId);
      localStorage.setItem(StorageKeys.FAVORITES, favorites);
      return { favorites };
    });
  },

  markEpisodeWatched: (animeId: string, episodeId: string) => {
    const history: WatchHistory = {
      id: Date.now().toString(),
      userId: '1',
      animeId,
      episodeId,
      watchedAt: new Date().toISOString(),
      progress: 100,
      completed: true,
    };

    set((state) => {
      const watchHistory = [...state.watchHistory, history];
      localStorage.setItem(StorageKeys.WATCH_HISTORY, watchHistory);
      return { watchHistory };
    });
  },

  updateProgress: (animeId: string, episodeId: string, progress: number) => {
    set((state) => {
      const existing = state.watchHistory.find(
        (h) => h.episodeId === episodeId
      );

      if (existing) {
        const updated = state.watchHistory.map((h) =>
          h.episodeId === episodeId ? { ...h, progress } : h
        );
        localStorage.setItem(StorageKeys.WATCH_HISTORY, updated);
        return { watchHistory: updated };
      }

      const history: WatchHistory = {
        id: Date.now().toString(),
        userId: '1',
        animeId,
        episodeId,
        watchedAt: new Date().toISOString(),
        progress,
        completed: progress === 100,
      };

      const watchHistory = [...state.watchHistory, history];
      localStorage.setItem(StorageKeys.WATCH_HISTORY, watchHistory);
      return { watchHistory };
    });
  },

  addNotification: (notification: Notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },

  markNotificationRead: (notificationId: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
    }));
  },

  loadData: () => {
    const favorites = localStorage.getItem(StorageKeys.FAVORITES) || [];
    const watchHistory = localStorage.getItem(StorageKeys.WATCH_HISTORY) || [];

    set({ favorites, watchHistory });
  },
}));
