import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { AgeGroup, ChildProfile, LanguageCode, ParentSettings, WorldId } from '../types';
import { audio } from '../utils/audio';
import { translations } from '../utils/translations';

interface GameContextType {
  currentProfile: ChildProfile;
  profiles: ChildProfile[];
  setProfiles: React.Dispatch<React.SetStateAction<ChildProfile[]>>;
  switchProfile: (profileId: string) => void;
  createProfile: (name: string, ageGroup: AgeGroup, avatar: string) => void;
  updateProfileAge: (ageGroup: AgeGroup) => void;
  saveArtworkToProfile: (dataUrl: string) => void;
  
  // Game & World Navigation
  currentWorld: WorldId | null;
  setCurrentWorld: (world: WorldId | null) => void;
  
  // Rewards & Encouragement
  addStar: (amount?: number) => void;
  celebrate: () => void;
  playPositiveFeedback: () => void;
  
  // Parent & Settings
  settings: ParentSettings;
  updateSettings: (newSettings: Partial<ParentSettings>) => void;
  isParentGateOpen: boolean;
  setIsParentGateOpen: (open: boolean) => void;
  isParentDashboardOpen: boolean;
  setIsParentDashboardOpen: (open: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
  
  // Screen Time & Break
  isScreenTimeLocked: boolean;
  screenTimeLeftSeconds: number | null;
  unlockScreenTime: () => void;

  // Language & Audio
  currentLang: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof translations['en'];
  speakText: (text: string) => void;
}

const DEFAULT_PROFILE: ChildProfile = {
  id: 'guest-genius-1',
  name: 'Little Genius',
  ageGroup: '2-3',
  avatar: 'lion',
  stars: 12,
  completedActivities: ['abc-intro', 'count-stars', 'animal-peek'],
  totalPlayTimeSeconds: 420,
  createdAt: new Date().toISOString(),
  savedArtworks: []
};

const DEFAULT_SETTINGS: ParentSettings = {
  screenTimeLimitMinutes: 0, // unlimited by default
  soundEffectsVolume: 0.8,
  musicVolume: 0.35,
  narrationVolume: 0.9,
  isMuted: false,
  reducedMotion: false,
  language: 'en'
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profiles
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => {
    try {
      const stored = localStorage.getItem('lgw_profiles');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [DEFAULT_PROFILE];
  });

  const [currentProfileId, setCurrentProfileId] = useState<string>(() => {
    return profiles[0]?.id || DEFAULT_PROFILE.id;
  });

  // Settings
  const [settings, setSettings] = useState<ParentSettings>(() => {
    try {
      const stored = localStorage.getItem('lgw_settings');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  // Current World navigation
  const [currentWorld, setCurrentWorld] = useState<WorldId | null>(null);

  // Parent UI states
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);
  const [isParentDashboardOpen, setIsParentDashboardOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Screen time tracking
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isScreenTimeLocked, setIsScreenTimeLocked] = useState(false);

  const currentProfile = profiles.find(p => p.id === currentProfileId) || profiles[0] || DEFAULT_PROFILE;

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('lgw_profiles', JSON.stringify(profiles));
    } catch {
      // storage error
    }
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem('lgw_settings', JSON.stringify(settings));
    } catch {
      // storage error
    }
    audio.setVolumes(settings.soundEffectsVolume, settings.musicVolume, settings.isMuted);
  }, [settings]);

  // Screen time interval
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds(prev => {
        const next = prev + 1;
        // Check screen time limit
        if (settings.screenTimeLimitMinutes > 0) {
          const limitSeconds = settings.screenTimeLimitMinutes * 60;
          if (next >= limitSeconds) {
            setIsScreenTimeLocked(true);
          }
        }
        return next;
      });

      // Update current profile play time
      setProfiles(prevProfiles =>
        prevProfiles.map(p =>
          p.id === currentProfile.id
            ? { ...p, totalPlayTimeSeconds: p.totalPlayTimeSeconds + 1 }
            : p
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.screenTimeLimitMinutes, currentProfile.id]);

  const screenTimeLeftSeconds = settings.screenTimeLimitMinutes > 0
    ? Math.max(0, settings.screenTimeLimitMinutes * 60 - sessionSeconds)
    : null;

  const unlockScreenTime = useCallback(() => {
    setIsScreenTimeLocked(false);
    setSessionSeconds(0);
  }, []);

  const switchProfile = useCallback((profileId: string) => {
    setCurrentProfileId(profileId);
    audio.playPop(1.1);
  }, []);

  const createProfile = useCallback((name: string, ageGroup: AgeGroup, avatar: string) => {
    const newProf: ChildProfile = {
      id: 'child-' + Date.now(),
      name: name.trim() || 'Little Star',
      ageGroup,
      avatar,
      stars: 5,
      completedActivities: [],
      totalPlayTimeSeconds: 0,
      createdAt: new Date().toISOString(),
      savedArtworks: []
    };
    setProfiles(prev => [...prev, newProf]);
    setCurrentProfileId(newProf.id);
    audio.playSuccess();
  }, []);

  const updateProfileAge = useCallback((ageGroup: AgeGroup) => {
    setProfiles(prev =>
      prev.map(p => (p.id === currentProfile.id ? { ...p, ageGroup } : p))
    );
    audio.playPop(1.2);
  }, [currentProfile.id]);

  const saveArtworkToProfile = useCallback((dataUrl: string) => {
    setProfiles(prev =>
      prev.map(p =>
        p.id === currentProfile.id
          ? { ...p, savedArtworks: [dataUrl, ...(p.savedArtworks || [])].slice(0, 15) }
          : p
      )
    );
  }, [currentProfile.id]);

  const updateSettings = useCallback((newSettings: Partial<ParentSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const addStar = useCallback((amount = 1) => {
    setProfiles(prev =>
      prev.map(p => (p.id === currentProfile.id ? { ...p, stars: p.stars + amount } : p))
    );
    audio.playStarDing();
  }, [currentProfile.id]);

  const celebrate = useCallback(() => {
    audio.playSuccess();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#38BDF8', '#10B981', '#EC4899', '#8B5CF6'],
        disableForReducedMotion: settings.reducedMotion
      });
    } catch {
      // confetti fallback
    }
  }, [settings.reducedMotion]);

  const playPositiveFeedback = useCallback(() => {
    const tCurrent = translations[settings.language] || translations.en;
    const praises = [tCurrent.greatJob, tCurrent.wonderful, tCurrent.fantastic, tCurrent.youDidIt];
    const praise = praises[Math.floor(Math.random() * praises.length)];
    audio.playChime();
    audio.speak(praise, settings.language);
  }, [settings.language]);

  const setLanguage = useCallback((lang: LanguageCode) => {
    updateSettings({ language: lang });
    audio.playPop(1.0);
  }, [updateSettings]);

  const speakText = useCallback((text: string) => {
    audio.speak(text, settings.language);
  }, [settings.language]);

  const t = translations[settings.language] || translations.en;

  return (
    <GameContext.Provider
      value={{
        currentProfile,
        profiles,
        setProfiles,
        switchProfile,
        createProfile,
        updateProfileAge,
        saveArtworkToProfile,
        currentWorld,
        setCurrentWorld,
        addStar,
        celebrate,
        playPositiveFeedback,
        settings,
        updateSettings,
        isParentGateOpen,
        setIsParentGateOpen,
        isParentDashboardOpen,
        setIsParentDashboardOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isScreenTimeLocked,
        screenTimeLeftSeconds,
        unlockScreenTime,
        currentLang: settings.language,
        setLanguage,
        t,
        speakText
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
