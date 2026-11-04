import { useEffect, useState, useRef, useCallback } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { 
  APP_VERSION, 
  BUILD_ID, 
  BUILD_TIMESTAMP, 
  fetchServerVersion, 
  isNewerVersion, 
  VersionInfo 
} from './version';

export interface PWAUpdateState {
  needRefresh: boolean;
  isUpdating: boolean;
  updateError: string | null;
  isChecking: boolean;
  serverVersion: VersionInfo | null;
  updateApp: () => Promise<void>;
  dismissUpdate: () => void;
  checkForUpdates: (showToast?: boolean) => Promise<boolean>;
}

export function usePWAUpdate(): PWAUpdateState {
  const [needRefresh, setNeedRefresh] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [serverVersion, setServerVersion] = useState<VersionInfo | null>(null);

  // References to registration and update callback
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const updateSWRef = useRef<((reloadPage?: boolean) => Promise<void>) | null>(null);
  const hasTriggeredReloadRef = useRef<boolean>(false);

  // Initialize service worker registration
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // Check if user previously dismissed update during this session
    const isDismissed = sessionStorage.getItem('lgw_update_dismissed') === 'true';

    try {
      const updateSW = registerSW({
        immediate: true,
        onNeedRefresh() {
          console.log('[PWA] New service worker version waiting for activation.');
          if (!isDismissed) {
            setNeedRefresh(true);
          }
        },
        onOfflineReady() {
          console.log('[PWA] Little Genius World is cached and ready for offline play.');
        },
        onRegisteredSW(swScriptUrl, registration) {
          console.log('[PWA] Service Worker registered successfully at:', swScriptUrl);
          registrationRef.current = registration || null;

          // Check if there is already a waiting service worker upon opening
          if (registration?.waiting) {
            console.log('[PWA] Found waiting worker on registration.');
            if (!isDismissed) {
              setNeedRefresh(true);
            }
          }

          // Initial update check after 3 seconds of peaceful initial render
          const initialTimer = setTimeout(() => {
            registration?.update().catch((err) => {
              console.warn('[PWA] Initial registration update check note:', err);
            });
          }, 3000);

          // Periodic background check every 30 minutes while app is running
          const intervalId = setInterval(() => {
            if (navigator.onLine && registration) {
              console.log('[PWA] Running periodic background update check...');
              registration.update().catch(() => {});
              checkServerVersionAuxiliary();
            }
          }, 30 * 60 * 1000);

          return () => {
            clearTimeout(initialTimer);
            clearInterval(intervalId);
          };
        },
        onRegisterError(error) {
          console.warn('[PWA] Service Worker registration failed:', error);
        },
      });

      updateSWRef.current = updateSW;
    } catch (err) {
      console.warn('[PWA] Error initializing registerSW:', err);
    }

    // Secondary check: verify server version JSON
    const checkServerVersionAuxiliary = async () => {
      if (!navigator.onLine) return;
      const remoteInfo = await fetchServerVersion();
      if (remoteInfo) {
        setServerVersion(remoteInfo);
        if (isNewerVersion(remoteInfo)) {
          console.log('[PWA] Server reports newer version available:', remoteInfo);
          // Trigger service worker update check
          if (registrationRef.current) {
            registrationRef.current.update().catch(() => {});
          }
          if (!isDismissed) {
            setNeedRefresh(true);
          }
        }
      }
    };

    // Run auxiliary check on boot
    const bootTimer = setTimeout(checkServerVersionAuxiliary, 4000);

    // Event listener: Check for updates when user switches back to the application
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && navigator.onLine) {
        console.log('[PWA] App resumed from background - checking for updates...');
        registrationRef.current?.update().catch(() => {});
        checkServerVersionAuxiliary();
      }
    };

    // Event listener: window focus check
    const handleWindowFocus = () => {
      if (navigator.onLine) {
        registrationRef.current?.update().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    // Controller change listener: ensure single safe reload after update
    const handleControllerChange = () => {
      if (!hasTriggeredReloadRef.current && isUpdating) {
        console.log('[PWA] Service Worker controller changed. Performing safe reload.');
        hasTriggeredReloadRef.current = true;
        // Clean session update guard
        sessionStorage.removeItem('lgw_update_dismissed');
        window.location.reload();
      }
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    return () => {
      clearTimeout(bootTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, [isUpdating]);

  /**
   * Applies the update:
   * 1. Posts SKIP_WAITING to waiting service worker
   * 2. Cleans outdated caches safely
   * 3. Reloads into the new version without infinite loops
   */
  const updateApp = useCallback(async () => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      console.log('[PWA] Activating new service worker version...');

      // Prevent infinite reload loop by storing a timestamped flag
      const lastUpdateAttempt = parseInt(sessionStorage.getItem('lgw_last_update_attempt') || '0', 10);
      const now = Date.now();
      if (now - lastUpdateAttempt < 3000) {
        console.warn('[PWA] Update already triggered recently; avoiding loop.');
        return;
      }
      sessionStorage.setItem('lgw_last_update_attempt', now.toString());

      // If waiting service worker exists on registration, post message
      const reg = registrationRef.current;
      if (reg?.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      // If updateSW callback is available from vite-plugin-pwa
      if (updateSWRef.current) {
        await updateSWRef.current(true);
      } else {
        // Fallback: reload page
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }

      // Safeguard: If controllerchange does not fire within 3.5s, reload anyway
      setTimeout(() => {
        if (!hasTriggeredReloadRef.current) {
          hasTriggeredReloadRef.current = true;
          window.location.reload();
        }
      }, 3500);
    } catch (err) {
      console.error('[PWA] Failed to activate update:', err);
      setIsUpdating(false);
      setUpdateError('Could not refresh the app automatically. Please tap Retry or restart the app.');
    }
  }, []);

  /**
   * Dismiss the update for current session (e.g. child is in the middle of a game)
   */
  const dismissUpdate = useCallback(() => {
    sessionStorage.setItem('lgw_update_dismissed', 'true');
    setNeedRefresh(false);
  }, []);

  /**
   * Manual update check triggered from Parent Area or Settings
   */
  const checkForUpdates = useCallback(async (showToast = true): Promise<boolean> => {
    setIsChecking(true);
    setUpdateError(null);

    try {
      if (!navigator.onLine) {
        if (showToast) {
          alert('You are currently offline. Connect to the internet to check for updates.');
        }
        setIsChecking(false);
        return false;
      }

      let foundUpdate = false;

      // 1. Check Service Worker registration update
      if (registrationRef.current) {
        await registrationRef.current.update();
        if (registrationRef.current.waiting) {
          foundUpdate = true;
        }
      }

      // 2. Check server version endpoint
      const remoteInfo = await fetchServerVersion();
      if (remoteInfo) {
        setServerVersion(remoteInfo);
        if (isNewerVersion(remoteInfo)) {
          foundUpdate = true;
        }
      }

      if (foundUpdate) {
        sessionStorage.removeItem('lgw_update_dismissed');
        setNeedRefresh(true);
        return true;
      } else {
        if (showToast) {
          alert(`Little Genius World is up to date! (v${APP_VERSION} - Build ${BUILD_ID})`);
        }
        return false;
      }
    } catch (err) {
      console.warn('[PWA] Manual update check error:', err);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    needRefresh,
    isUpdating,
    updateError,
    isChecking,
    serverVersion,
    updateApp,
    dismissUpdate,
    checkForUpdates,
  };
}
