// ==========================================
// Admin API Helper — Vercel / Next.js Routes
// ==========================================
// All API calls go to /api/* on the same origin.
// No separate Express backend required.

export const getApiBase = (): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api`;
  }
  return process.env.NEXT_PUBLIC_API_URL || '/api';
};

// Kept for import compatibility — prefer calling getApiBase() inside
// useEffect / event handlers to avoid stale SSR values.
export const API_BASE = typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api';

// Asset URLs are now stored as data URIs (base64) or public static paths.
// No URL rewriting needed.
export const getAssetUrl = (url: string): string => {
  if (!url) return '';
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
  const headers: Record<string, string> = {};

  // Default to JSON unless sending FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  // Build URL using runtime origin (ensures correct host in all environments)
  const base = typeof window !== 'undefined' ? `${window.location.origin}/api` : '/api';
  let url = `${base}${endpoint}`;

  // Cache-bust GET requests
  if (!options.method || options.method.toUpperCase() === 'GET') {
    const separator = url.includes('?') ? '&' : '?';
    url = `${url}${separator}t=${Date.now()}`;
  }

  const response = await fetch(url, {
    cache: 'no-store',
    credentials: 'same-origin',
    ...options,
    headers,
  });

  // Handle expired / invalid token — redirect to login
  if (response.status === 401 || response.status === 403) {
    removeAuthToken();
    if (typeof window !== 'undefined' && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }

  return response;
};
