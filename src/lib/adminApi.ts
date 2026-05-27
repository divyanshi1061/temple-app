// ==========================================
// Admin API Helper Utility
// ==========================================

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper to construct asset URLs (handling local server vs proxy routes)
export const getAssetUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it starts with /uploads, prepend the backend host (without double /api)
  if (url.startsWith('/uploads')) {
    const host = API_BASE.replace('/api', '');
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

  // Add cache buster query parameter to GET requests to prevent caching
  let url = `${API_BASE}${endpoint}`;
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
