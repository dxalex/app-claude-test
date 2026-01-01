export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  timezone: string;
  trackingSource?: 'manual' | 'myanimelist' | 'anilist';
  externalId?: string;
}

export interface UserSettings {
  spoilerProtection: boolean;
  blurThumbnails: boolean;
  releaseAlerts: boolean;
  episodeDensity: 'compact' | 'comfortable' | 'spacious';
}

export interface Anime {
  id: string;
  externalId?: string;
  title: string;
  titleEnglish?: string;
  titleJapanese?: string;
  description?: string;
  coverImage?: string;
  bannerImage?: string;
  status: 'airing' | 'finished' | 'upcoming';
  format?: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
  episodes?: number;
  duration?: number;
  startDate?: string;
  endDate?: string;
  genres?: string[];
  score?: number;
  popularity?: number;
  seasons?: Season[];
}

export interface Season {
  id: string;
  animeId: string;
  seasonNumber: number;
  title?: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  seasonId: string;
  episodeNumber: number;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  airDate?: string;
  watched?: boolean;
  progress?: number;
}

export interface WatchHistory {
  id: string;
  userId: string;
  animeId: string;
  episodeId?: string;
  watchedAt: string;
  progress: number;
  completed: boolean;
}

export interface Notification {
  id: string;
  type: 'release' | 'spoiler_alert' | 'recommendation';
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Release {
  id: string;
  animeId: string;
  episodeNumber: number;
  airDate: string;
  title?: string;
  spoilerLevel: 'low' | 'medium' | 'high';
}
