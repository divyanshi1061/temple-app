// ==========================================
// Server-Side File Validation
// ==========================================
// Provides real MIME sniffing (magic bytes) and size limits.

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

export async function validateImageFile(file: File): Promise<{ valid: boolean; error?: string }> {
  if (file.size > MAX_IMAGE_SIZE) {
    return { valid: false, error: 'Image file size exceeds the 5MB limit.' };
  }

  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

  // Check magic bytes
  const isJPEG = hex.startsWith('FFD8FF');
  const isPNG = hex.startsWith('89504E470D0A1A0A');
  const isGIF = hex.startsWith('47494638'); // GIF8
  // WebP starts with RIFF, then 4 bytes of file size, then WEBP
  const isWebP = hex.startsWith('52494646') && hex.substring(16, 24) === '57454250';

  if (!isJPEG && !isPNG && !isGIF && !isWebP) {
    return { valid: false, error: 'Invalid image format. Only JPEG, PNG, GIF, and WebP are allowed.' };
  }

  return { valid: true };
}

export async function validateVideoFile(file: File): Promise<{ valid: boolean; error?: string }> {
  if (file.size > MAX_VIDEO_SIZE) {
    return { valid: false, error: 'Video file size exceeds the 50MB limit.' };
  }

  const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

  // MP4 files start with 4 bytes size, then "ftyp" (66747970)
  const isMP4 = hex.substring(8, 16) === '66747970';
  // WebM starts with 1A45DFA3
  const isWebM = hex.startsWith('1A45DFA3');

  if (!isMP4 && !isWebM) {
    return { valid: false, error: 'Invalid video format. Only MP4 and WebM are allowed.' };
  }

  return { valid: true };
}

// Regex for YouTube URLs
export function isAllowedYouTubeUrl(url: string): boolean {
  if (!url) return false;
  // Basic validation that it is a youtube domain
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    return host === 'youtube.com' || host === 'www.youtube.com' || host === 'youtu.be';
  } catch {
    return false; // Invalid URL
  }
}
