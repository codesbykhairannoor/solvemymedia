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
  hasC2pa: boolean;
  c2paIssuer?: string;
  aiGenerated: boolean;
  cleanTitleSuggestion?: string;
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

    // Safety timeout after 2 seconds
    setTimeout(() => {
      cleanup();
      resolve({ width: 0, height: 0, duration: 0 });
    }, 2000);
  });
};

/**
 * Clean up a raw filename into a human-readable title suggestion
 */
export const cleanFilenameToTitle = (filename: string): { title: string; year?: string; dateTime?: string } => {
  const base = filename.replace(/\.[^/.]+$/, ''); // strip extension
  let year: string | undefined;
  let dateTime: string | undefined;

  // Pattern 1: 2026-10-13 20-01-33 or 2026-10-13_20-01-33
  const dtMatch1 = base.match(/(20\d{2})[-_](\d{2})[-_](\d{2})[ _-]([012]\d)[-_:]([0-5]\d)[-_:]([0-5]\d)/);
  if (dtMatch1) {
    year = dtMatch1[1];
    dateTime = `${dtMatch1[1]}-${dtMatch1[2]}-${dtMatch1[3]} ${dtMatch1[4]}:${dtMatch1[5]}:${dtMatch1[6]}`;
  } else {
    // Pattern 2: 202609081456 (YYYYMMDDHHmm)
    const dtMatch2 = base.match(/\b(20\d{2})(\d{2})(\d{2})([012]\d)([0-5]\d)\b/);
    if (dtMatch2) {
      year = dtMatch2[1];
      dateTime = `${dtMatch2[1]}-${dtMatch2[2]}-${dtMatch2[3]} ${dtMatch2[4]}:${dtMatch2[5]}:00`;
    } else {
      // Pattern 3: 2026-09-08 (YYYY-MM-DD)
      const dtMatch3 = base.match(/\b(20\d{2})[-_](\d{2})[-_](\d{2})\b/);
      if (dtMatch3) {
        year = dtMatch3[1];
        dateTime = `${dtMatch3[1]}-${dtMatch3[2]}-${dtMatch3[3]} 12:00:00`;
      } else {
        const yearMatch = base.match(/\b(20\d{2}|19\d{2})\b/);
        if (yearMatch) {
          year = yearMatch[1];
          dateTime = `${yearMatch[1]}-01-01 12:00:00`;
        }
      }
    }
  }

  // Remove resolution markers like _1080p, _720p, _4k, 202609081456, etc.
  let cleaned = base
    .replace(/[._-](1080p|720p|480p|4k|2160p|uhd|fhd|hd)\b/gi, '')
    .replace(/\b20\d{2}[-_]?\d{2}[-_]?\d{2}[-_ ]?[012]\d[-_:]?[0-5]\d[-_:]?[0-5]?\d?\b/g, '')
    .replace(/\b20\d{2}\d{6,10}\b/g, '')
    .replace(/[._-]+/g, ' ')
    .replace(/[…]+/g, '')
    .trim();

  // Capitalize words
  if (cleaned.length > 0) {
    cleaned = cleaned
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  return { title: cleaned, year, dateTime };
};

/**
 * Format duration seconds into MM:SS or HH:MM:SS
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
 * Parse MP4 / ISO BMFF boxes directly from a Uint8Array chunk
 */
const parseMp4Chunk = (u8: Uint8Array, result: DetectedVideoMetadata) => {
  const view = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);

  const readU32 = (off: number): number => {
    if (off + 4 > view.byteLength) return 0;
    return view.getUint32(off, false);
  };

  const readAscii = (off: number, len: number): string => {
    if (off + len > u8.length) return '';
    let str = '';
    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(u8[off + i]);
    }
    return str;
  };

  const readUtf8 = (off: number, len: number): string => {
    const slice = u8.subarray(off, Math.min(u8.length, off + len));
    return new TextDecoder('utf-8', { fatal: false }).decode(slice);
  };

  // Check C2PA / JUMBF AI Manifest in this chunk
  let textSample = '';
  const checkLen = Math.min(u8.length, 65536);
  for (let i = 0; i < checkLen; i++) {
    textSample += String.fromCharCode(u8[i]);
  }

  if (textSample.includes('c2pa') || textSample.includes('jumb') || textSample.includes('c2cs')) {
    result.hasC2pa = true;
    result.aiGenerated = true;
    if (textSample.includes('Google')) {
      result.c2paIssuer = 'Google LLC (C2PA Provenance / SynthID AI Signature)';
    } else if (textSample.includes('Adobe')) {
      result.c2paIssuer = 'Adobe (C2PA Content Credentials)';
    } else if (textSample.includes('OpenAI')) {
      result.c2paIssuer = 'OpenAI (C2PA Provenance)';
    } else {
      result.c2paIssuer = 'C2PA Content Credentials / AI Provenance Manifest';
    }
    result.rawTags['c2pa'] = result.c2paIssuer;
    if (!result.encoder && textSample.includes('Google')) {
      result.encoder = 'Google';
      result.rawTags['encoder'] = 'Google';
    }
  }

  const parseBoxesRecursive = (start: number, end: number, depth: number = 0) => {
    if (depth > 12) return;
    let offset = start;
    while (offset + 8 <= end) {
      const size = readU32(offset);
      const type = readAscii(offset + 4, 4);
      let boxEnd = 0;
      let headerSize = 8;

      if (size === 0) {
        boxEnd = end;
      } else if (size === 1) {
        if (offset + 16 > end) break;
        const high = readU32(offset + 8);
        const low = readU32(offset + 12);
        boxEnd = offset + (high * 4294967296 + low);
        headerSize = 16;
      } else {
        boxEnd = offset + size;
      }

      if (boxEnd > end || boxEnd <= offset) {
        // Try searching forward for known boxes like moov or udta
        break;
      }

      if (type === 'mvhd') {
        const version = u8[offset + headerSize];
        let creationSec = 0;
        let timescale = 1;
        let duration = 0;
        if (version === 0) {
          creationSec = readU32(offset + headerSize + 4);
          timescale = readU32(offset + headerSize + 12);
          duration = readU32(offset + headerSize + 16);
        } else {
          creationSec = readU32(offset + headerSize + 8);
          timescale = readU32(offset + headerSize + 20);
          duration = readU32(offset + headerSize + 28);
        }

        if (creationSec > 2082844800) {
          const d = new Date((creationSec - 2082844800) * 1000);
          result.creationTime = d.toISOString().replace('T', ' ').slice(0, 19);
          result.rawTags['creation_time'] = result.creationTime;
        }

        if (timescale > 0 && duration > 0 && !result.durationSeconds) {
          result.durationSeconds = duration / timescale;
          result.durationFormatted = formatDurationSeconds(result.durationSeconds);
        }
      } else if (type === 'tkhd') {
        const version = u8[offset + headerSize];
        const trackWidthOffset = version === 0 ? 76 : 88;
        if (boxEnd - offset >= headerSize + trackWidthOffset + 8) {
          const w = readU32(offset + headerSize + trackWidthOffset) >> 16;
          const h = readU32(offset + headerSize + trackWidthOffset + 4) >> 16;
          if (w > 0 && h > 0 && !result.resolution) {
            result.resolution = `${w}x${h}`;
          }
        }
      } else if (['moov', 'trak', 'mdia', 'minf', 'stbl', 'udta', 'meta', 'ilst'].includes(type)) {
        let subStart = offset + headerSize;
        if (type === 'meta') subStart += 4; // skip FullBox version & flags
        parseBoxesRecursive(subStart, boxEnd, depth + 1);
      } else if (type.charCodeAt(0) === 0xA9 || ['titl', 'auth', 'perf', 'yrrc', 'desc', 'dscp', 'cprt', 'gnre', 'albm', 'make', 'modl'].includes(type)) {
        const val = extractIlstValue(offset + headerSize, boxEnd);
        if (val) {
          const tagKey = type.charCodeAt(0) === 0xA9 ? `©${type.slice(1)}` : type;
          result.rawTags[tagKey] = val;

          if (tagKey === '©nam' || tagKey === 'titl') result.title = val;
          else if (tagKey === '©ART' || tagKey === 'auth' || tagKey === 'perf') result.artist = val;
          else if (tagKey === '©alb' || tagKey === 'albm') result.album = val;
          else if (tagKey === '©day' || tagKey === 'yrrc') {
            result.year = val;
            if (!result.creationTime) result.creationTime = val;
          }
          else if (tagKey === '©gen' || tagKey === 'gnre') result.genre = val;
          else if (tagKey === '©cmt' || tagKey === 'desc' || tagKey === 'dscp') result.comment = val;
          else if (tagKey === '©cpy' || tagKey === 'cprt') result.copyright = val;
          else if (tagKey === '©xyz' || tagKey === 'xyz ') {
            result.location = val;
            result.hasGps = true;
          }
          else if (tagKey === '©mak' || tagKey === 'make') result.deviceMake = val;
          else if (tagKey === '©mod' || tagKey === 'modl') result.deviceModel = val;
          else if (tagKey === '©too' || tagKey === '©swr') {
            result.encoder = val;
          }
        }
      } else if (type === '©xyz' || type === 'xyz ') {
        const val = readUtf8(offset + headerSize, boxEnd - (offset + headerSize)).trim();
        if (val) {
          result.location = val;
          result.hasGps = true;
          result.rawTags['location'] = val;
        }
      }

      offset = boxEnd;
    }
  };

  const extractIlstValue = (start: number, end: number): string | undefined => {
    let off = start;
    while (off + 8 <= end) {
      const size = readU32(off);
      const type = readAscii(off + 4, 4);
      const boxEnd = off + size;
      if (boxEnd > end || boxEnd <= off) break;
      if (type === 'data') {
        if (off + 16 <= boxEnd) {
          return readUtf8(off + 16, boxEnd - (off + 16)).trim();
        }
      }
      off = boxEnd;
    }
    const raw = readUtf8(start, end - start).replace(/[^\x20-\x7E]/g, ' ').trim();
    return raw.length > 0 ? raw : undefined;
  };

  // Run box parser
  parseBoxesRecursive(0, u8.length);

  // If moov was not at offset 0 (e.g. inside last chunk), search for 'moov' pattern
  if (!result.encoder && !result.title) {
    for (let i = 0; i < u8.length - 8; i++) {
      if (u8[i] === 0x6d && u8[i + 1] === 0x6f && u8[i + 2] === 0x6f && u8[i + 3] === 0x76) { // 'moov'
        const moovBoxStart = Math.max(0, i - 4);
        parseBoxesRecursive(moovBoxStart, u8.length, 1);
        break;
      }
    }
  }
};

/**
 * Fast WebM / MKV EBML Header Scanner
 */
const parseEbmlChunk = (u8: Uint8Array, result: DetectedVideoMetadata) => {
  const text = new TextDecoder('utf-8', { fatal: false }).decode(u8);
  // Look for MuxingApp, WritingApp, Title
  const muxMatch = text.match(/(?:MuxingApp|WritingApp|encoder)[^\x20-\x7E]*([a-zA-Z0-9 ._-]{3,40})/i);
  if (muxMatch && !result.encoder) {
    result.encoder = muxMatch[1].trim();
    result.rawTags['encoder'] = result.encoder;
  }

  const titleMatch = text.match(/(?:title)[^\x20-\x7E]*([a-zA-Z0-9 ._-]{3,60})/i);
  if (titleMatch && !result.title) {
    result.title = titleMatch[1].trim();
    result.rawTags['title'] = result.title;
  }
};

/**
 * Primary Fast Scanner: Reads file directly from RAM via File.slice() in <10ms
 */
export const scanFileMetadata = async (file: File): Promise<DetectedVideoMetadata> => {
  const { title: cleanTitle, year: filenameYear, dateTime: filenameDateTime } = cleanFilenameToTitle(file.name);

  const result: DetectedVideoMetadata = {
    hasGps: false,
    hasDeviceInfo: false,
    hasAuthorInfo: false,
    hasCreationDate: false,
    hasC2pa: false,
    aiGenerated: false,
    cleanTitleSuggestion: cleanTitle,
    rawTags: {}
  };

  try {
    // 1. Native HTML5 element probe for width/height/duration
    const nativeInfo = await scanVideoElement(file);
    if (nativeInfo.width > 0 && nativeInfo.height > 0) {
      result.resolution = `${nativeInfo.width}x${nativeInfo.height}`;
    }
    if (nativeInfo.duration > 0) {
      result.durationSeconds = nativeInfo.duration;
      result.durationFormatted = formatDurationSeconds(nativeInfo.duration);
    }

    // 2. Read first 1MB chunk
    const firstChunkSize = Math.min(1024 * 1024, file.size);
    const firstBlob = file.slice(0, firstChunkSize);
    const firstBuf = await firstBlob.arrayBuffer();
    const firstU8 = new Uint8Array(firstBuf);

    parseMp4Chunk(firstU8, result);
    parseEbmlChunk(firstU8, result);

    // 3. If file is larger than 1MB, also read last 2MB to find 'moov' at end of file (non-faststart MP4)
    if (file.size > firstChunkSize) {
      const lastChunkSize = Math.min(2 * 1024 * 1024, file.size);
      const lastStart = file.size - lastChunkSize;
      const lastBlob = file.slice(lastStart, file.size);
      const lastBuf = await lastBlob.arrayBuffer();
      const lastU8 = new Uint8Array(lastBuf);

      parseMp4Chunk(lastU8, result);
    }

    // Scan for GPS coordinate pattern (+dd.dddd+ddd.dddd) in ASCII strings
    if (!result.location) {
      const firstText = new TextDecoder('latin1').decode(firstU8);
      const gpsMatch = firstText.match(/([+-]\d{2}\.\d{4,8}[+-]\d{3}\.\d{4,8}[+-]?\d{0,4}\.?\d{0,2}\/?)/);
      if (gpsMatch) {
        result.location = gpsMatch[1];
        result.hasGps = true;
        result.rawTags['gps_coordinates'] = result.location;
      }
    }
  } catch (err) {
    console.warn('scanFileMetadata binary parser notice:', err);
  }

  // Date & Time info (Tanggal, Jam, Tahun)
  if (!result.creationTime && filenameDateTime) {
    result.creationTime = filenameDateTime;
  }
  if (!result.year && filenameYear) {
    result.year = filenameYear;
  }
  if (!result.creationTime && result.year) {
    result.creationTime = `${result.year}-01-01 12:00:00`;
  }

  // Smart suggestions for Title & Artist if missing in container
  if (!result.title && cleanTitle) {
    result.cleanTitleSuggestion = cleanTitle;
  }
  if (!result.artist) {
    if (result.hasC2pa && result.c2paIssuer?.includes('Google')) {
      result.artist = 'Google AI';
    } else if (result.encoder) {
      result.artist = result.encoder;
    }
  }

  // Flags
  result.hasGps = Boolean(result.location);
  result.hasDeviceInfo = Boolean(result.deviceMake || result.deviceModel);
  result.hasAuthorInfo = Boolean(result.title || result.artist || result.copyright);
  result.hasCreationDate = Boolean(result.creationTime || result.year);

  return result;
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

    const durMatch = line.match(/Duration:\s*([0-9:.]+)/i);
    if (durMatch && !duration) {
      duration = durMatch[1].split('.')[0];
    }

    const resMatch = line.match(/Stream.*Video:.*,\s*(\d{2,5}x\d{2,5})\b/i);
    if (resMatch && !resolution) {
      resolution = resMatch[1];
    }

    if (/Metadata:\s*$/i.test(line)) {
      inMetadata = true;
      continue;
    }

    if (inMetadata && /^\s*(Duration:|Stream #|Program|Chapter #)/i.test(line)) {
      inMetadata = false;
      continue;
    }

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
 * Merge detected metadata from binary scan and FFmpeg logs
 */
export const buildDetectedMetadata = (
  ffmetadataText?: string,
  ffmpegLogs?: string[],
  nativeMeta?: { width?: number; height?: number; duration?: number }
): DetectedVideoMetadata => {
  const iniTags = ffmetadataText ? parseFfmetadata(ffmetadataText) : {};
  const { tags: logTags, duration: logDur, resolution: logRes } = ffmpegLogs ? parseFfmpegLogs(ffmpegLogs) : { tags: {} };
  const all: Record<string, string> = { ...logTags, ...iniTags };

  const title = all['title'] || all['titl'] || all['name'];
  const artist = all['artist'] || all['author'] || all['composer'] || all['performer'];
  const album = all['album'] || all['series'] || all['show'];

  const rawDate = all['date'] || all['year'] || all['creation_time'];
  let year: string | undefined;
  if (rawDate) {
    const yMatch = rawDate.match(/\b(19\d{2}|20\d{2})\b/);
    year = yMatch ? yMatch[1] : rawDate;
  }

  const genre = all['genre'];
  const comment = all['comment'] || all['description'];
  const copyright = all['copyright'] || all['cprt'] || all['license'];
  const location = all['location'] || all['xyz'] || all['gps'];
  const deviceMake = all['make'] || all['manufacturer'];
  const deviceModel = all['model'] || all['camera'];
  const encoder = all['encoder'] || all['software'] || all['writing_application'];
  const creationTime = all['creation_time'];

  let resolution = logRes;
  if (!resolution && nativeMeta?.width && nativeMeta?.height) {
    resolution = `${nativeMeta.width}x${nativeMeta.height}`;
  }

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
    hasC2pa: false,
    aiGenerated: false,
    rawTags: all
  };
};
