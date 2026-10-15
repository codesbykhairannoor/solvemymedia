export interface DetectedVideoMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
  genre?: string;
  comment?: string;
  copyright?: string;
  location?: string;
  deviceMake?: string;
  deviceModel?: string;
  encoder?: string;
  creationTime?: string;
  durationFormatted?: string;
  durationSeconds?: number;
  resolution?: string;
  hasGps: boolean;
  hasDeviceInfo: boolean;
  hasAuthorInfo: boolean;
  hasCreationDate: boolean;
  rawTags: Record<string, string>;
}

/**
 * Scan video element natively in the browser for width, height, and duration in < 10ms
 */
export const scanVideoElement = (file: File): Promise<{ width: number; height: number; duration: number }> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return resolve({ width: 0, height: 0, duration: 0 });
    }
    const video = document.createElement('video');
    video.preload = 'metadata';
    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      video.removeAttribute('src');
      video.load();
    };

    video.onloadedmetadata = () => {
      const w = video.videoWidth || 0;
      const h = video.videoHeight || 0;
      const d = video.duration || 0;
      cleanup();
      resolve({ width: w, height: h, duration: d });
    };

    video.onerror = () => {
      cleanup();
      resolve({ width: 0, height: 0, duration: 0 });
    };

    // Safety timeout after 2.5 seconds
    setTimeout(() => {
      cleanup();
      resolve({ width: 0, height: 0, duration: 0 });
    }, 2500);
  });
};

/**
 * Parse INI formatted ffmetadata export
 */
export const parseFfmetadata = (content: string): Record<string, string> => {
  const result: Record<string, string> = {};
  if (!content) return result;

  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(';') || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim().toLowerCase();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (val && !result[key]) {
        result[key] = val;
      }
    }
  }
  return result;
};

/**
 * Parse FFmpeg probe log output lines
 */
export const parseFfmpegLogs = (logs: string[]): {
  tags: Record<string, string>;
  duration?: string;
  resolution?: string;
} => {
  const tags: Record<string, string> = {};
  let inMetadata = false;
  let duration: string | undefined;
  let resolution: string | undefined;

  for (const rawLine of logs) {
    const line = rawLine.replace(/\r/g, '');

    // Check Duration
    const durMatch = line.match(/Duration:\s*([0-9:.]+)/i);
    if (durMatch && !duration) {
      duration = durMatch[1].split('.')[0]; // e.g. 00:01:23
    }

    // Check Resolution from Video Stream line
    const resMatch = line.match(/Stream.*Video:.*,\s*(\d{2,5}x\d{2,5})\b/i);
    if (resMatch && !resolution) {
      resolution = resMatch[1]; // e.g. 1920x1080
    }

    // Detect Metadata section start
    if (/^\s*Metadata:\s*$/i.test(line)) {
      inMetadata = true;
      continue;
    }

    // If another main section starts (e.g. Duration or Stream), metadata block ends
    if (inMetadata && /^\s*(Duration:|Stream #|Program|Chapter #)/i.test(line)) {
      inMetadata = false;
      continue;
    }

    // Parse metadata key-value
    if (inMetadata) {
      const match = line.match(/^\s*([a-zA-Z0-9_\-]+)\s*:\s*(.+)$/);
      if (match) {
        const key = match[1].trim().toLowerCase();
        const val = match[2].trim();
        if (val && !tags[key]) {
          tags[key] = val;
        }
      }
    }
  }

  return { tags, duration, resolution };
};

/**
 * Format seconds into HH:MM:SS or MM:SS
 */
export const formatDurationSeconds = (sec: number): string => {
  if (!sec || isNaN(sec) || sec <= 0) return '00:00';
  const total = Math.floor(sec);
  const m = Math.floor(total / 60);
  const s = total % 60;
  const h = Math.floor(m / 60);
  const remainingM = m % 60;

  if (h > 0) {
    return `${h.toString().padStart(2, '0')}:${remainingM.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${remainingM.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

/**
 * Merge and normalize detected metadata from all sources
 */
export const buildDetectedMetadata = (
  ffmetadataText?: string,
  ffmpegLogs?: string[],
  nativeMeta?: { width?: number; height?: number; duration?: number }
): DetectedVideoMetadata => {
  const iniTags = ffmetadataText ? parseFfmetadata(ffmetadataText) : {};
  const { tags: logTags, duration: logDur, resolution: logRes } = ffmpegLogs ? parseFfmpegLogs(ffmpegLogs) : { tags: {} };

  // Combine tags (iniTags priority, then logTags)
  const all: Record<string, string> = { ...logTags, ...iniTags };

  // Title
  const title = all['title'] || all['titl'] || all['name'];

  // Artist / Creator
  const artist = all['artist'] || all['author'] || all['composer'] || all['performer'] || all['album_artist'];

  // Album / Series
  const album = all['album'] || all['series'] || all['show'];

  // Date / Year
  const rawDate = all['date'] || all['year'] || all['creation_time'];
  let year: string | undefined;
  if (rawDate) {
    const yMatch = rawDate.match(/\b(19\d{2}|20\d{2})\b/);
    year = yMatch ? yMatch[1] : rawDate;
  }

  // Genre
  const genre = all['genre'];

  // Comment / Description
  const comment = all['comment'] || all['description'] || all['desc'];

  // Copyright
  const copyright = all['copyright'] || all['cprt'] || all['license'];

  // Location / GPS
  const location = all['location'] || all['location-eng'] || all['xyz'] || all['gps'] || all['coordinates'];

  // Device Info
  const deviceMake = all['make'] || all['manufacturer'];
  const deviceModel = all['model'] || all['camera'];

  // Encoder / Software
  const encoder = all['encoder'] || all['software'] || all['writing_application'] || all['compatible_brands'];

  // Creation Time
  const creationTime = all['creation_time'];

  // Resolution
  let resolution = logRes;
  if (!resolution && nativeMeta?.width && nativeMeta?.height) {
    resolution = `${nativeMeta.width}x${nativeMeta.height}`;
  }

  // Duration
  let durationFormatted = logDur;
  let durationSeconds = nativeMeta?.duration;
  if (!durationFormatted && durationSeconds) {
    durationFormatted = formatDurationSeconds(durationSeconds);
  }

  const hasGps = Boolean(location);
  const hasDeviceInfo = Boolean(deviceMake || deviceModel);
  const hasAuthorInfo = Boolean(title || artist || copyright);
  const hasCreationDate = Boolean(creationTime || year);

  return {
    title,
    artist,
    album,
    year,
    genre,
    comment,
    copyright,
    location,
    deviceMake,
    deviceModel,
    encoder,
    creationTime,
    durationFormatted,
    durationSeconds,
    resolution,
    hasGps,
    hasDeviceInfo,
    hasAuthorInfo,
    hasCreationDate,
    rawTags: all
  };
};
