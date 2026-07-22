// ==========================================
// Admin API Helper Utility
// ==========================================

// Dynamically resolve API base URL at runtime so the admin panel works
// from any device on the network (not just the build machine's IP).
// NEXT_PUBLIC_API_URL is only used when it looks like a real production URL
// (i.e., contains a domain name, not a local/private IP like 192.168.x.x).
// Exported so call sites can invoke it at runtime (inside useEffect / event
// handlers) where window is always available, avoiding the stale module-level
// constant problem that occurs during Next.js SSR pre-rendering.
export const getApiBase = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;

  // If an env URL is set AND it's a real production URL (not a local IP), use it
  if (envUrl) {
    const isLocalIp = /^https?:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.|127\.|localhost)/i.test(envUrl);
    if (!isLocalIp) {
      return envUrl;
    }
  }

  // Otherwise, dynamically resolve from the current browser location
  if (typeof window !== 'undefined') {
    // If it's a local/development host, use port 5000
    const isLocalHost = /^(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2\d|3[01]))/i.test(window.location.hostname);
    if (isLocalHost) {
      return `${window.location.protocol}//${window.location.hostname}:5000/api`;
    }
    // Otherwise in production, route through the standard reverse proxy (/api)
    return `${window.location.protocol}//${window.location.hostname}/api`;
  }

  return 'http://localhost:5000/api';
};

// Kept for import compatibility, but prefer calling getApiBase() at runtime
// inside useEffect/event handlers to avoid stale SSR values.
export const API_BASE = getApiBase();

// Helper to construct asset URLs (handling local server vs proxy routes)
export const getAssetUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const parsed = new URL(url);
      const isLocalIp = /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.|127\.|localhost)/i.test(parsed.hostname);
      if (isLocalIp) {
        // Determine the target hostname, protocol, and port
        let targetHost = 'localhost';
        let targetProtocol = 'http:';
        let targetPort = parsed.port || '5000';

        if (typeof window !== 'undefined') {
          targetHost = window.location.hostname;
          targetProtocol = window.location.protocol;
          // If accessing via port 3000, the backend is likely on 5000
          targetPort = window.location.port === '3000' ? '5000' : (window.location.port || parsed.port || '5000');
        } else if (process.env.NEXT_PUBLIC_API_URL) {
          try {
            const apiParsed = new URL(process.env.NEXT_PUBLIC_API_URL);
            targetHost = apiParsed.hostname;
            targetProtocol = apiParsed.protocol;
            targetPort = apiParsed.port || '5000';
          } catch {
            // Use defaults
          }
        }
        
        // Rewrite the URL if protocol, hostname, or port differs
        if (parsed.hostname !== targetHost || parsed.port !== targetPort || parsed.protocol !== targetProtocol) {
          const portPart = targetPort ? `:${targetPort}` : '';
          return `${targetProtocol}//${targetHost}${portPart}${parsed.pathname}`;
        }
      }
    } catch {
      // Invalid URL, return as-is
    }
    return url;
  }
  // If it starts with /uploads, prepend the backend host (without double /api)
  if (url.startsWith('/uploads')) {
    const host = getApiBase().replace('/api', '');
    return `${host}${url}`;
  }
  return url;
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
  }
};

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {};
  
  // Set up Authorization Header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If it's not a FormData upload, default to JSON content type
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Merge external headers
  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  // Resolve the API base at call-time so production URLs are always correct
  // even when the module was first loaded during SSR (where window is undefined).
  let url = `${getApiBase()}${endpoint}`;
  if (!options.method || options.method.toUpperCase() === 'GET') {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}t=${Date.now()}`;
  }

  const response = await fetch(url, {
    cache: 'no-store',
    ...options,
    headers,
  });

  // Handle unauthorized/expired token
  if (response.status === 401 || response.status === 403) {
    removeAuthToken();
    if (typeof window !== 'undefined') {
      // Redirect to login if on admin route and not already there
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
  }

  return response;
};
