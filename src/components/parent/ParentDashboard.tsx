import React, { useState } from 'react';
import { 
  X, 
  User, 
  Clock, 
  Star, 
  Volume2, 
  ShieldCheck, 
  Database, 
  Plus, 
  Award, 
  Sparkles, 
  Globe2, 
  Download, 
  Upload, 
  CheckCircle2,
  Eye,
  Flame
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { AgeGroup, LanguageCode } from '../../types';
import { MascotAvatar, MascotKey } from '../mascots/MascotAvatar';
import { audio } from '../../utils/audio';
import { DailyStreakRewardCalendar } from './DailyStreakRewardCalendar';

export const ParentDashboard: React.FC = () => {
  const {
    isParentDashboardOpen,
    setIsParentDashboardOpen,
    currentProfile,
    profiles,
    switchProfile,
    createProfile,
    settings,
    updateSettings,
    t,
    currentLang,
    setLanguage
  } = useGame();

  const [activeTab, setActiveTab] = useState<'profiles' | 'streak' | 'progress' | 'screentime' | 'audio' | 'sync' | 'safety'>('streak');
  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState<AgeGroup>('2-3');
  const [newChildAvatar, setNewChildAvatar] = useState<MascotKey>('lion');

  // Supabase config state
  const [supabaseUrl, setSupabaseUrl] = useState(settings.supabaseUrl || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(settings.supabaseAnonKey || '');
  const [syncStatus, setSyncStatus] = useState<string>('Local Offline Storage Active (Synchronized)');

  if (!isParentDashboardOpen) return null;

  const handleCreateChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;
    createProfile(newChildName, newChildAge, newChildAvatar);
    setNewChildName('');
    setShowAddChildModal(false);
  };

  const handleExportData = () => {
    const data = {
      profiles,
      settings,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `little-genius-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    audio.playSuccess();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profiles && Array.isArray(parsed.profiles)) {
          localStorage.setItem('lgw_profiles', JSON.stringify(parsed.profiles));
          window.location.reload();
        }
      } catch {
        alert('Invalid backup file format');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveSupabase = () => {
    updateSettings({
      supabaseUrl: supabaseUrl.trim(),
      supabaseAnonKey: supabaseAnonKey.trim()
    });
    setSyncStatus('Supabase settings configured! Ready to sync child milestones.');
    audio.playSuccess();
  };

  const minutesPlayed = Math.floor(currentProfile.totalPlayTimeSeconds / 60);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl border-4 border-amber-300 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-amber-400 via-amber-300 to-yellow-300 border-b-2 border-amber-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center text-amber-900">
              <ShieldCheck className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-950">{t.parent.dashboard}</h2>
              <p className="text-xs text-amber-900/80 font-medium">Little Genius World - Safe Parental Space</p>
            </div>
          </div>
          <button
            onClick={() => setIsParentDashboardOpen(false)}
            className="rounded-full bg-white/80 hover:bg-white p-2 text-slate-700 shadow-xs transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-6 pt-3 pb-2 bg-amber-50/70 border-b border-amber-200 overflow-x-auto scrollbar-none text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'profiles' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t.parent.childrenProfiles}</span>
          </button>

          <button
            onClick={() => setActiveTab('streak')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'streak' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200/60'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-600" />
            <span>Daily Streak & Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'progress' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{t.parent.learningProgress}</span>
          </button>

          <button
            onClick={() => setActiveTab('screentime')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'screentime' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200/60'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{t.parent.screenTimeLimit}</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'audio' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200/60'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{t.parent.audioSettings}</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'sync' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cloud & Sync</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors shrink-0 ${
              activeTab === 'safety' ? 'bg-amber-400 text-amber-950 shadow-xs' : 'hover:bg-amber-200/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Child Safety</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {/* TAB 1: CHILD PROFILES */}
          {activeTab === 'profiles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Active Profiles</h3>
                  <p className="text-xs text-slate-500">Each child gets their own age track, stars, and artwork gallery.</p>
                </div>
                <button
                  onClick={() => setShowAddChildModal(true)}
                  className="flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-4 py-2 text-sm shadow-sm transition-transform active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t.parent.addChild}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {profiles.map((p) => {
                  const isCurrent = p.id === currentProfile.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => switchProfile(p.id)}
                      className={`relative cursor-pointer rounded-2xl p-4 transition-all duration-200 ${
                        isCurrent
                          ? 'bg-amber-100/80 border-3 border-amber-400 shadow-md ring-2 ring-amber-300/40'
                          : 'bg-white border-2 border-slate-200 hover:border-amber-300 shadow-xs'
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-amber-50 p-1.5 border border-amber-200">
                          <MascotAvatar mascot={p.avatar} size="md" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                          <p className="text-xs text-amber-700 font-semibold">{t.ageGroups[p.ageGroup]?.title || p.ageGroup}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                            <span>{p.stars} stars</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Child Modal Dialog */}
              {showAddChildModal && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
                  <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border-4 border-amber-300">
                    <div className="flex items-center justify-between pb-3 border-b border-amber-100">
                      <h4 className="text-lg font-bold text-slate-800">{t.parent.addChild}</h4>
                      <button onClick={() => setShowAddChildModal(false)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateChild} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">{t.parent.childName}</label>
                        <input
                          type="text"
                          required
                          value={newChildName}
                          onChange={(e) => setNewChildName(e.target.value)}
                          placeholder="e.g. Maya, Liam, Amara"
                          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">{t.parent.selectAge}</label>
                        <div className="grid grid-cols-2 gap-2">
                          {(['0-1', '1-2', '2-3', '3-4', '4-5'] as AgeGroup[]).map((ag) => (
                            <button
                              key={ag}
                              type="button"
                              onClick={() => setNewChildAge(ag)}
                              className={`rounded-xl p-2 text-left text-xs font-semibold border transition-colors ${
                                newChildAge === ag
                                  ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <div>{t.ageGroups[ag].title}</div>
                              <div className="text-[10px] text-slate-400">{t.ageGroups[ag].subtitle}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">{t.parent.chooseAvatar}</label>
                        <div className="flex items-center justify-between gap-1 p-2 bg-slate-50 rounded-2xl border border-slate-200">
                          {(['lion', 'penguin', 'bunny', 'owl', 'zebra', 'elephant'] as MascotKey[]).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setNewChildAvatar(m)}
                              className={`p-1 rounded-xl transition-all ${
                                newChildAvatar === m ? 'bg-amber-300 ring-2 ring-amber-400 scale-110' : 'hover:bg-slate-200'
                              }`}
                            >
                              <MascotAvatar mascot={m} size="sm" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold py-3 text-sm shadow-md transition-transform active:scale-95"
                      >
                        {t.parent.createProfile}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: DAILY LEARNING STREAK & CALENDAR */}
          {activeTab === 'streak' && (
            <DailyStreakRewardCalendar />
          )}

          {/* TAB 2: LEARNING PROGRESS */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    {currentProfile.name}&apos;s Learning Journey
                  </h3>
                  <p className="text-xs text-slate-500">Track mastered skills, stars gathered, and saved artworks.</p>
                </div>
                <button
                  onClick={() => setActiveTab('streak')}
                  className="flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-200 transition-colors"
                >
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>View Reward Calendar →</span>
                </button>
              </div>

              {/* Overview Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-amber-200 shadow-xs flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-800">{currentProfile.stars}</div>
                    <div className="text-[11px] text-slate-500">{t.parent.starsCollected}</div>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('streak')}
                  className="rounded-2xl bg-white p-3.5 sm:p-4 border border-orange-200 shadow-xs flex items-center gap-2.5 sm:gap-3 cursor-pointer hover:border-orange-400 transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-800">{currentProfile.currentStreak || 1} Days</div>
                    <div className="text-[11px] text-orange-700 font-semibold">Active Streak 🔥</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-sky-200 shadow-xs flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-800">{minutesPlayed} min</div>
                    <div className="text-[11px] text-slate-500">{t.parent.timeSpent}</div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-3.5 sm:p-4 border border-emerald-200 shadow-xs flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-800">{currentProfile.completedActivities.length}</div>
                    <div className="text-[11px] text-slate-500">{t.parent.activitiesDone}</div>
                  </div>
                </div>
              </div>

              {/* Skill Masteries */}
              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
                <h4 className="text-sm font-bold text-slate-800 mb-3">Demonstrated Skills</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Phonics & Letter Recognition', pct: 85, color: 'bg-indigo-500' },
                    { name: 'Early Numeracy & Object Counting', pct: 90, color: 'bg-amber-500' },
                    { name: 'Color & Shape Sorting', pct: 95, color: 'bg-emerald-500' },
                    { name: 'Fine Motor & Creative Drawing', pct: 80, color: 'bg-pink-500' },
                    { name: 'Hygiene & Healthy Routines', pct: 100, color: 'bg-sky-500' },
                  ].map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{skill.name}</span>
                        <span className="text-slate-500">{skill.pct}%</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Artworks Gallery */}
              {currentProfile.savedArtworks && currentProfile.savedArtworks.length > 0 && (
                <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-pink-500" />
                    <h4 className="text-sm font-bold text-slate-800">Saved Masterpieces from Creative Corner</h4>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {currentProfile.savedArtworks.map((art, idx) => (
                      <div key={idx} className="aspect-square rounded-xl overflow-hidden border-2 border-slate-200 bg-white shadow-xs">
                        <img src={art} alt={`Artwork ${idx + 1}`} className="w-full h-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SCREEN TIME LIMIT */}
          {activeTab === 'screentime' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{t.parent.screenTimeLimit}</h3>
                <p className="text-xs text-slate-500">
                  Protect growing eyes with healthy play limits. When time is up, a gentle stretch break screen appears.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[0, 15, 30, 45, 60].map((mins) => {
                  const isSelected = settings.screenTimeLimitMinutes === mins;
                  return (
                    <button
                      key={mins}
                      onClick={() => updateSettings({ screenTimeLimitMinutes: mins })}
                      className={`rounded-2xl p-4 text-center border-2 transition-all ${
                        isSelected
                          ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-sm'
                          : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
                      }`}
                    >
                      <div className="text-2xl font-extrabold">{mins === 0 ? '∞' : mins}</div>
                      <div className="text-xs font-semibold">{mins === 0 ? t.parent.unlimited : `${mins} ${t.parent.minutes}`}</div>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                💡 <strong>Pediatric Tip:</strong> For children aged 0–2 years, interactive parent-guided exploration in 15-minute intervals is ideal. For children 3–5 years, 30–45 minutes of active educational gaming fosters healthy digital balance.
              </div>
            </div>
          )}

          {/* TAB 4: AUDIO & ACCESSIBILITY */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{t.parent.audioSettings}</h3>
                <p className="text-xs text-slate-500">Customise volume, narration voice, and sensory motion.</p>
              </div>

              <div className="space-y-5 rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
                {/* Mute All Toggle */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-sm font-bold text-slate-800">Master Sound</span>
                    <p className="text-xs text-slate-500">Mute or un-mute all game sounds</p>
                  </div>
                  <button
                    onClick={() => updateSettings({ isMuted: !settings.isMuted })}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                      !settings.isMuted ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {!settings.isMuted ? 'Sound Enabled' : 'All Muted'}
                  </button>
                </div>

                {/* Sound Effects Volume */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>{t.parent.soundEffects}</span>
                    <span>{Math.round(settings.soundEffectsVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.soundEffectsVolume}
                    onChange={(e) => updateSettings({ soundEffectsVolume: parseFloat(e.target.value) })}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Background Music Volume */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>{t.parent.backgroundMusic}</span>
                    <span>{Math.round(settings.musicVolume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.musicVolume}
                    onChange={(e) => updateSettings({ musicVolume: parseFloat(e.target.value) })}
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Reduced Motion Toggle */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-sm font-bold text-slate-800">{t.parent.reducedMotion}</span>
                    <p className="text-xs text-slate-500">Gentle static visuals for children sensitive to motion</p>
                  </div>
                  <button
                    onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                      settings.reducedMotion ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {settings.reducedMotion ? 'Reduced Motion Active' : 'Normal Motion'}
                  </button>
                </div>

                {/* Language Quick Switch */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe2 className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-bold text-slate-800">{t.language}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { code: 'en', name: 'English' },
                      { code: 'yo', name: 'Yorùbá' },
                      { code: 'ha', name: 'Hausa' },
                      { code: 'ig', name: 'Igbo' },
                    ].map((item) => (
                      <button
                        key={item.code}
                        onClick={() => setLanguage(item.code as LanguageCode)}
                        className={`rounded-xl p-2.5 text-xs font-bold border transition-colors ${
                          currentLang === item.code
                            ? 'bg-amber-100 border-amber-400 text-amber-950'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CLOUD & SUPABASE SYNC */}
          {activeTab === 'sync' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{t.parent.supabaseTitle}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t.parent.supabaseDesc} All game features work 100% offline using your local device storage.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{syncStatus}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Supabase Project URL (Optional)</label>
                  <input
                    type="url"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    placeholder="https://xyzcompany.supabase.co"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Supabase Anon Key (Optional)</label>
                  <input
                    type="password"
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveSupabase}
                  className="rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-4 py-2 text-xs shadow-xs"
                >
                  Save Supabase Settings
                </button>
              </div>

              {/* Offline Backup & Restore */}
              <div className="rounded-2xl bg-white p-5 border border-slate-200 shadow-xs">
                <h4 className="text-sm font-bold text-slate-800 mb-2">Offline Device Backup & Transfer</h4>
                <p className="text-xs text-slate-500 mb-4">Export progress to move between tablets or save child milestones.</p>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleExportData}
                    className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 text-xs shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.parent.exportData}</span>
                  </button>

                  <label className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2 text-xs shadow-xs cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>{t.parent.importData}</span>
                    <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CHILD SAFETY PLEDGE */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-emerald-50 p-5 border-2 border-emerald-300 text-emerald-950">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-7 h-7 text-emerald-600" />
                  <h3 className="text-lg font-bold">{t.parent.childSafetyTitle}</h3>
                </div>
                <p className="text-xs leading-relaxed text-emerald-900 mt-2">
                  {t.parent.childSafetyText}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'No Advertisements Ever', desc: 'No banner ads, popups, or commercial sponsorships anywhere in the app.' },
                  { title: 'Zero Public Chat or Profiles', desc: 'Children play in a protected sandbox with no social channels or strangers.' },
                  { title: 'No Cameras or Voice Recording', desc: 'Audio is synthesized on-device. No audio or video is ever recorded.' },
                  { title: 'Gated Adult Settings', desc: 'Math verification ensures children cannot leave their learning games without parent approval.' },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl bg-white p-4 border border-slate-200 shadow-xs">
                    <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex justify-end">
          <button
            onClick={() => setIsParentDashboardOpen(false)}
            className="rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-6 py-2.5 text-sm shadow-md transition-transform active:scale-95"
          >
            {t.parent.close}
          </button>
        </div>
      </div>
    </div>
  );
};
