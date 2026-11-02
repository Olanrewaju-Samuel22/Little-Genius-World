export type AgeGroup = '0-1' | '1-2' | '2-3' | '3-4' | '4-5';

export type LanguageCode = 'en' | 'yo' | 'ha' | 'ig';

export type WorldId = 
  | 'abc-adventure'
  | 'number-kingdom'
  | 'animal-world'
  | 'colour-garden'
  | 'puzzle-planet'
  | 'creative-corner'
  | 'story-castle'
  | 'music-village'
  | 'everyday-heroes';

export interface ChildProfile {
  id: string;
  name: string;
  ageGroup: AgeGroup;
  avatar: string; // e.g. 'lion' | 'penguin' | 'bunny' | 'owl' | 'zebra' | 'star'
  stars: number;
  completedActivities: string[];
  totalPlayTimeSeconds: number;
  createdAt: string;
  savedArtworks: string[]; // data URLs or artwork identifiers
}

export interface ParentSettings {
  screenTimeLimitMinutes: number; // 0 = unlimited, 15, 30, 45, 60
  soundEffectsVolume: number; // 0 to 1
  musicVolume: number; // 0 to 1
  narrationVolume: number; // 0 to 1
  isMuted: boolean;
  reducedMotion: boolean;
  language: LanguageCode;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export interface AchievementBadge {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  unlockedAt?: string;
  requiredStars: number;
  category: 'alphabet' | 'numbers' | 'animals' | 'colors' | 'music' | 'hygiene' | 'art' | 'puzzles';
}
