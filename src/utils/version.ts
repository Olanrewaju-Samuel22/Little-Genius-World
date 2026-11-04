/**
 * Little Genius World - Application Version Management
 * Dynamically generated build metadata and server version detection
 */

export interface VersionInfo {
  version: string;
  buildId: string;
  buildTimestamp: number;
  releaseDate?: string;
  description?: string;
}

// Global build constants injected by Vite build
export const APP_VERSION: string = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.2.0';
export const BUILD_ID: string = typeof __BUILD_ID__ !== 'undefined' ? __BUILD_ID__ : 'dev';
export const BUILD_TIMESTAMP: number = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : Date.now();

export const CURRENT_VERSION_INFO: VersionInfo = {
  version: APP_VERSION,
  buildId: BUILD_ID,
  buildTimestamp: BUILD_TIMESTAMP,
  releaseDate: new Date(BUILD_TIMESTAMP).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
};

export function getFullVersionString(): string {
  return `Little Genius World v${APP_VERSION} (${BUILD_ID})`;
}

/**
 * Checks the server for a newer deployed version by fetching version.json
 * with cache-busting headers to bypass intermediate proxy/browser caches.
 */
export async function fetchServerVersion(): Promise<VersionInfo | null> {
  try {
    const cacheBuster = `_t=${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const response = await fetch(`/version.json?${cacheBuster}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data as VersionInfo;
  } catch {
    // Offline or network error - fail silently and preserve current app
    return null;
  }
}

/**
 * Compares current client build with remote server version
 */
export function isNewerVersion(serverInfo: VersionInfo | null): boolean {
  if (!serverInfo) return false;

  // Compare build timestamp first if available
  if (serverInfo.buildTimestamp && BUILD_TIMESTAMP) {
    if (serverInfo.buildTimestamp > BUILD_TIMESTAMP) {
      return true;
    }
  }

  // Compare build IDs
  if (serverInfo.buildId && BUILD_ID && serverInfo.buildId !== BUILD_ID && BUILD_ID !== 'dev') {
    return true;
  }

  // Compare semver version string (e.g. 1.2.1 vs 1.2.0)
  if (serverInfo.version && APP_VERSION && serverInfo.version !== APP_VERSION) {
    return true;
  }

  return false;
}
