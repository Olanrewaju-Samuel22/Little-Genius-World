import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../utils/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-emerald-600/95 backdrop-blur-xs px-4 py-2 text-xs font-semibold text-white shadow-lg border border-emerald-400">
      <WifiOff className="w-4 h-4 text-emerald-200 animate-pulse" />
      <span>Offline Adventure Mode — All games ready!</span>
    </div>
  );
};
