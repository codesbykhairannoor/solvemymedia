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
  aiProvider?: string;
  aiDetails?: string;
  cleanTitleSuggestion?: string;
  rawTags: Record<string, string>;
}

export interface DetectedAudioMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: string;
  genre?: string;
  comment?: string;
  composer?: string;
  trackNumber?: string;
  copyright?: string;
  encoder?: string;
  creationTime?: string;
  durationFormatted?: string;
  durationSeconds?: number;
  channels?: string;
  sampleRate?: string;
  bitrate?: string;
  hasId3: boolean;
  hasAlbumArt: boolean;
  hasC2pa: boolean;
  c2paIssuer?: string;
  aiGenerated: boolean;
  aiProvider?: string;
  aiDetails?: string;
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
 * Scan audio element natively in the browser for duration in < 10ms
 */
export const scanAudioElement = (file: File): Promise<{ duration: number }> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return resolve({ duration: 0 });
    }
    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    const objectUrl = URL.createObjectURL(file);
    audio.src = objectUrl;

    const cleanup = () => {
      URL.revokeObjectURL(objectUrl);
      audio.removeAttribute('src');
      audio.load();
    };

    audio.onloadedmetadata = () => {
      const d = audio.duration || 0;
      cleanup();
      resolve({ duration: d });
    };

    audio.onerror = () => {
      cleanup();
      resolve({ duration: 0 });
    };

    setTimeout(() => {
      cleanup();
      resolve({ duration: 0 });
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

  // Remove resolution and technical markers
  let cleaned = base
    .replace(/[._-](1080p|720p|480p|4k|2160p|uhd|fhd|hd|320kbps|256kbps|128kbps|flac|wav|mp3)\b/gi, '')
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
 * Universal AI Scanner: Detects AI Provenance across Video & Audio
 * (Google SynthID/C2PA, Adobe, OpenAI, Suno, Udio, ElevenLabs, Meta, Midjourney, Kling, Runway, Pika, Luma, Stable Diffusion, ByteDance)
 */
export const detectAiSignatures = (
  textSample: string,
  target: {
    hasC2pa?: boolean;
    c2paIssuer?: string;
    aiGenerated?: boolean;
    aiProvider?: string;
    aiDetails?: string;
    encoder?: string;
    rawTags: Record<string, string>;
  }
) => {
  const lower = textSample.toLowerCase();

  // 1. Google SynthID / C2PA / Lyria / MusicLM
  if (
    textSample.includes('SynthID') ||
    lower.includes('synthid') ||
    lower.includes('trainedalgorithmicmedia') ||
    (lower.includes('c2pa') && lower.includes('google')) ||
    lower.includes('google c2pa')
  ) {
    target.hasC2pa = true;
    target.aiGenerated = true;
    target.aiProvider = 'Google AI (SynthID / C2PA)';
    target.c2paIssuer = 'Google LLC (Google C2PA Media Services / SynthID Provenance)';
    target.aiDetails = 'Contains Google C2PA manifest & imperceptible SynthID watermark (trainedAlgorithmicMedia).';
    target.rawTags['c2pa'] = target.c2paIssuer;
    target.rawTags['ai_watermark'] = 'Google SynthID';
    if (!target.encoder) target.encoder = 'Google AI';
    return;
  }

  // 2. Suno AI Music
  if (lower.includes('suno') || lower.includes('suno.ai') || lower.includes('suno inc') || lower.includes('major_model_version')) {
    target.aiGenerated = true;
    target.aiProvider = 'Suno AI';
    target.aiDetails = 'Synthesized audio generated by Suno AI music generation model.';
    target.rawTags['ai_generator'] = 'Suno AI';
    if (!target.encoder) target.encoder = 'Suno AI';
    return;
  }

  // 3. Udio AI Music
  if (lower.includes('udio') || lower.includes('udio.com')) {
    target.aiGenerated = true;
    target.aiProvider = 'Udio AI';
    target.aiDetails = 'Audio generated via Udio generative music platform.';
    target.rawTags['ai_generator'] = 'Udio AI';
    if (!target.encoder) target.encoder = 'Udio AI';
    return;
  }

  // 4. ElevenLabs Voice AI
  if (lower.includes('elevenlabs') || lower.includes('11labs')) {
    target.aiGenerated = true;
    target.aiProvider = 'ElevenLabs';
    target.aiDetails = 'High-fidelity synthetic speech synthesized by ElevenLabs Voice AI.';
    target.rawTags['ai_generator'] = 'ElevenLabs';
    if (!target.encoder) target.encoder = 'ElevenLabs';
    return;
  }

  // 5. OpenAI (Sora, Voice Engine, DALL-E, ChatGPT)
  if (lower.includes('openai') || lower.includes('sora') || lower.includes('voice engine')) {
    target.aiGenerated = true;
    target.aiProvider = 'OpenAI (Sora / C2PA)';
    target.c2paIssuer = 'OpenAI Content Credentials';
    target.aiDetails = 'Generated with OpenAI generative AI models with digital provenance.';
    target.rawTags['ai_generator'] = 'OpenAI';
    if (lower.includes('c2pa')) target.hasC2pa = true;
    if (!target.encoder) target.encoder = 'OpenAI';
    return;
  }

  // 6. Adobe Content Credentials / Firefly
  if (lower.includes('adobe') && (lower.includes('c2pa') || lower.includes('content credentials') || lower.includes('firefly'))) {
    target.hasC2pa = true;
    target.aiGenerated = true;
    target.aiProvider = 'Adobe Firefly / Content Credentials';
    target.c2paIssuer = 'Adobe (C2PA Content Credentials)';
    target.aiDetails = 'Verified Adobe Content Credentials provenance manifest.';
    target.rawTags['c2pa'] = target.c2paIssuer;
    if (!target.encoder) target.encoder = 'Adobe Firefly';
    return;
  }

  // 7. Kling AI (Kuaishou)
  if (lower.includes('kling') || lower.includes('klingai') || lower.includes('kuaishou')) {
    target.aiGenerated = true;
    target.aiProvider = 'Kling AI';
    target.aiDetails = 'AI video synthesized with Kling AI generative video model.';
    target.rawTags['ai_generator'] = 'Kling AI';
    if (!target.encoder) target.encoder = 'Kling AI';
    return;
  }

  // 8. Runway (Gen-2 / Gen-3)
  if (lower.includes('runway') || lower.includes('runwayml') || lower.includes('gen-2') || lower.includes('gen-3')) {
    target.aiGenerated = true;
    target.aiProvider = 'Runway';
    target.aiDetails = 'Generative media rendered with Runway Gen-2 / Gen-3.';
    target.rawTags['ai_generator'] = 'RunwayML';
    if (!target.encoder) target.encoder = 'Runway';
    return;
  }

  // 9. Luma Dream Machine
  if (lower.includes('luma') || lower.includes('dream machine') || lower.includes('lumalabs')) {
    target.aiGenerated = true;
    target.aiProvider = 'Luma Dream Machine';
    target.aiDetails = 'Cinematic AI video generated with Luma Dream Machine.';
    target.rawTags['ai_generator'] = 'Luma AI';
    if (!target.encoder) target.encoder = 'Luma Dream Machine';
    return;
  }

  // 10. Pika Labs
  if (lower.includes('pika') || lower.includes('pika labs') || lower.includes('pika.art')) {
    target.aiGenerated = true;
    target.aiProvider = 'Pika Labs';
    target.aiDetails = 'AI animation generated with Pika.';
    target.rawTags['ai_generator'] = 'Pika Labs';
    if (!target.encoder) target.encoder = 'Pika';
    return;
  }

  // 11. Meta AudioCraft / MusicGen / Imagine
  if (lower.includes('audiocraft') || lower.includes('musicgen') || lower.includes('audiogen') || (lower.includes('meta') && lower.includes('imagine'))) {
    target.aiGenerated = true;
    target.aiProvider = 'Meta AI (AudioCraft / Imagine)';
    target.aiDetails = 'Audio synthesized by Meta AudioCraft / MusicGen foundation models.';
    target.rawTags['ai_generator'] = 'Meta AI';
    if (!target.encoder) target.encoder = 'Meta AI';
    return;
  }

  // 12. Midjourney
  if (lower.includes('midjourney')) {
    target.aiGenerated = true;
    target.aiProvider = 'Midjourney';
    target.aiDetails = 'Media synthesized via Midjourney AI.';
    target.rawTags['ai_generator'] = 'Midjourney';
    if (!target.encoder) target.encoder = 'Midjourney';
    return;
  }

  // 13. Stable Diffusion / Stability AI
  if (lower.includes('stable diffusion') || lower.includes('stability ai') || lower.includes('stable video')) {
    target.aiGenerated = true;
    target.aiProvider = 'Stability AI';
    target.aiDetails = 'Media rendered via Stability AI diffusion models.';
    target.rawTags['ai_generator'] = 'Stability AI';
    if (!target.encoder) target.encoder = 'Stability AI';
    return;
  }

  // 14. ByteDance / CapCut AI
  if (lower.includes('bytedance') || lower.includes('jimeng') || lower.includes('capcut ai') || lower.includes('seedance')) {
    target.aiGenerated = true;
    target.aiProvider = 'ByteDance AI';
    target.aiDetails = 'Generated with ByteDance AI / CapCut generative models.';
    target.rawTags['ai_generator'] = 'ByteDance AI';
    if (!target.encoder) target.encoder = 'ByteDance';
    return;
  }

  // 15. General C2PA / JUMBF Manifest
  if (textSample.includes('c2pa') || textSample.includes('jumb') || textSample.includes('c2cs') || textSample.includes('c2ma')) {
    target.hasC2pa = true;
    target.aiGenerated = true;
    target.aiProvider = 'C2PA Provenance';
    target.c2paIssuer = 'C2PA Content Credentials Manifest Store';
    target.aiDetails = 'Embedded cryptographic C2PA / JUMBF provenance metadata detected.';
    target.rawTags['c2pa'] = target.c2paIssuer;
    if (!target.encoder) target.encoder = 'C2PA Manifest';
  }
};

/**
 * Decode ID3 text frame based on first encoding byte
 */
const decodeId3FrameText = (bytes: Uint8Array): string => {
  if (!bytes || bytes.length <= 1) return '';
  const encoding = bytes[0];
  const data = bytes.subarray(1);

  if (encoding === 0) {
    // ISO-8859-1 (Latin1)
    let s = '';
    for (let i = 0; i < data.length; i++) {
      if (data[i] === 0) break;
      s += String.fromCharCode(data[i]);
    }
    return s.trim();
  } else if (encoding === 1) {
    // UTF-16 with BOM
    const hasBomLE = data.length >= 2 && data[0] === 0xFF && data[1] === 0xFE;
    const hasBomBE = data.length >= 2 && data[0] === 0xFE && data[1] === 0xFF;
    const start = (hasBomLE || hasBomBE) ? 2 : 0;
    const isLE = !hasBomBE;
    let s = '';
    for (let i = start; i + 1 < data.length; i += 2) {
      const code = isLE ? (data[i] | (data[i + 1] << 8)) : ((data[i] << 8) | data[i + 1]);
      if (code === 0) break;
      s += String.fromCharCode(code);
    }
    return s.trim();
  } else if (encoding === 2) {
    // UTF-16BE without BOM
    let s = '';
    for (let i = 0; i + 1 < data.length; i += 2) {
      const code = (data[i] << 8) | data[i + 1];
      if (code === 0) break;
      s += String.fromCharCode(code);
    }
    return s.trim();
  } else if (encoding === 3) {
    // UTF-8
    try {
      const text = new TextDecoder('utf-8', { fatal: false }).decode(data);
      return text.replace(/\0.*$/, '').trim();
    } catch {
      return '';
    }
  }

  // Fallback to latin1
  let s = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 0) break;
    s += String.fromCharCode(data[i]);
  }
  return s.trim();
};

/**
 * Decode ID3 COMM (Comment) frame
 */
const decodeId3Comment = (bytes: Uint8Array): string => {
  if (!bytes || bytes.length <= 4) return '';
  const encoding = bytes[0];
  // bytes 1-3 is 3-byte language code e.g. "eng"
  const rest = bytes.subarray(4);

  // Skip short content description up to null terminator
  let textStart = 0;
  if (encoding === 1 || encoding === 2) {
    for (let i = 0; i + 1 < rest.length; i += 2) {
      if (rest[i] === 0 && rest[i + 1] === 0) {
        textStart = i + 2;
        break;
      }
    }
  } else {
    for (let i = 0; i < rest.length; i++) {
      if (rest[i] === 0) {
        textStart = i + 1;
        break;
      }
    }
  }

  const commentBytes = new Uint8Array(1 + rest.length - textStart);
  commentBytes[0] = encoding;
  commentBytes.set(rest.subarray(textStart), 1);
  return decodeId3FrameText(commentBytes);
};

/**
 * Parse ID3v2 (v2.2, v2.3, v2.4) audio tags from Uint8Array
 */
const parseId3v2Tags = (u8: Uint8Array, result: DetectedAudioMetadata) => {
  if (u8.length < 10) return;
  if (u8[0] !== 0x49 || u8[1] !== 0x44 || u8[2] !== 0x33) return; // 'ID3'

  result.hasId3 = true;
  const majorVersion = u8[3];
  const revision = u8[4];
  const tagSize = ((u8[6] & 0x7F) << 21) | ((u8[7] & 0x7F) << 14) | ((u8[8] & 0x7F) << 7) | (u8[9] & 0x7F);

  result.rawTags['id3_version'] = `ID3v2.${majorVersion}.${revision}`;
  result.rawTags['id3_tag_size'] = `${tagSize} bytes`;

  let offset = 10;
  const maxOffset = Math.min(u8.length, 10 + tagSize);

  while (offset + 10 <= maxOffset) {
    let frameId = '';
    for (let i = 0; i < 4; i++) {
      frameId += String.fromCharCode(u8[offset + i]);
    }

    // Stop at padding
    if (frameId.charCodeAt(0) === 0) break;

    let frameSize = 0;
    if (majorVersion === 4) {
      // ID3v2.4 uses synchsafe integers for frame size
      frameSize = ((u8[offset + 4] & 0x7F) << 21) | ((u8[offset + 5] & 0x7F) << 14) | ((u8[offset + 6] & 0x7F) << 7) | (u8[offset + 7] & 0x7F);
    } else {
      // ID3v2.3 uses regular 32-bit big-endian
      frameSize = (u8[offset + 4] << 24) | (u8[offset + 5] << 16) | (u8[offset + 6] << 8) | u8[offset + 7];
    }

    offset += 10;
    if (offset + frameSize > maxOffset || frameSize <= 0) break;

    const frameBytes = u8.subarray(offset, offset + frameSize);

    // Parse specific frames
    if (frameId === 'TIT2' || frameId === 'TT2') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.title = val; result.rawTags['title'] = val; }
    } else if (frameId === 'TPE1' || frameId === 'TP1') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.artist = val; result.rawTags['artist'] = val; }
    } else if (frameId === 'TALB' || frameId === 'TAL') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.album = val; result.rawTags['album'] = val; }
    } else if (frameId === 'TYER' || frameId === 'TDRC' || frameId === 'TYE') {
      const val = decodeId3FrameText(frameBytes);
      if (val) {
        result.year = val.slice(0, 4);
        result.creationTime = val;
        result.rawTags['year'] = val;
      }
    } else if (frameId === 'TCON' || frameId === 'TCO') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.genre = val; result.rawTags['genre'] = val; }
    } else if (frameId === 'COMM' || frameId === 'COM') {
      const val = decodeId3Comment(frameBytes);
      if (val) { result.comment = val; result.rawTags['comment'] = val; }
    } else if (frameId === 'TRCK' || frameId === 'TRK') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.trackNumber = val; result.rawTags['track'] = val; }
    } else if (frameId === 'TCOM' || frameId === 'TCM') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.composer = val; result.rawTags['composer'] = val; }
    } else if (frameId === 'TCOP' || frameId === 'TCR') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.copyright = val; result.rawTags['copyright'] = val; }
    } else if (frameId === 'TSSE' || frameId === 'TENC' || frameId === 'TEN') {
      const val = decodeId3FrameText(frameBytes);
      if (val) { result.encoder = val; result.rawTags['encoder'] = val; }
    } else if (frameId === 'APIC' || frameId === 'PIC') {
      result.hasAlbumArt = true;
      result.rawTags['album_art'] = 'Embedded Album Artwork (APIC)';
    } else if (frameId === 'GEOB') {
      // General Encapsulated Object: Check for C2PA manifest
      let geobText = '';
      const sampleLimit = Math.min(frameBytes.length, 2048);
      for (let i = 0; i < sampleLimit; i++) {
        geobText += String.fromCharCode(frameBytes[i]);
      }
      if (geobText.includes('c2pa') || geobText.includes('application/c2pa') || geobText.includes('SynthID') || geobText.includes('Google')) {
        result.hasC2pa = true;
        result.aiGenerated = true;
        result.rawTags['geob'] = 'C2PA Manifest Store (SynthID Audio Provenance)';
      }
    }

    offset += frameSize;
  }
};

/**
 * Parse RIFF / WAV INFO chunks
 */
const parseRiffWav = (u8: Uint8Array, result: DetectedAudioMetadata) => {
  if (u8.length < 12) return;
  const chunkId = String.fromCharCode(u8[0], u8[1], u8[2], u8[3]);
  const format = String.fromCharCode(u8[8], u8[9], u8[10], u8[11]);
  if (chunkId !== 'RIFF' || format !== 'WAVE') return;

  let offset = 12;
  const max = u8.length;
  while (offset + 8 <= max) {
    const id = String.fromCharCode(u8[offset], u8[offset + 1], u8[offset + 2], u8[offset + 3]);
    const size = u8[offset + 4] | (u8[offset + 5] << 8) | (u8[offset + 6] << 16) | (u8[offset + 7] << 24);
    offset += 8;
    if (offset + size > max || size <= 0) break;

    if (id === 'fmt ' && size >= 16) {
      const channels = u8[offset + 2] | (u8[offset + 3] << 8);
      const sampleRate = u8[offset + 4] | (u8[offset + 5] << 8) | (u8[offset + 6] << 16) | (u8[offset + 7] << 24);
      const byteRate = u8[offset + 8] | (u8[offset + 9] << 8) | (u8[offset + 10] << 16) | (u8[offset + 11] << 24);
      result.channels = channels === 2 ? 'Stereo (2 ch)' : channels === 1 ? 'Mono (1 ch)' : `${channels} ch`;
      result.sampleRate = `${sampleRate} Hz`;
      result.bitrate = `${Math.round((byteRate * 8) / 1000)} kbps`;
      result.rawTags['channels'] = result.channels;
      result.rawTags['sample_rate'] = result.sampleRate;
    } else if (id === 'LIST' && size >= 4) {
      const listType = String.fromCharCode(u8[offset], u8[offset + 1], u8[offset + 2], u8[offset + 3]);
      if (listType === 'INFO') {
        let subOff = offset + 4;
        const listEnd = offset + size;
        while (subOff + 8 <= listEnd) {
          const subId = String.fromCharCode(u8[subOff], u8[subOff + 1], u8[subOff + 2], u8[subOff + 3]);
          const subSize = u8[subOff + 4] | (u8[subOff + 5] << 8) | (u8[subOff + 6] << 16) | (u8[subOff + 7] << 24);
          subOff += 8;
          if (subOff + subSize > listEnd) break;

          let val = '';
          for (let i = 0; i < subSize; i++) {
            if (u8[subOff + i] === 0) break;
            val += String.fromCharCode(u8[subOff + i]);
          }
          val = val.trim();

          if (val) {
            result.rawTags[subId.toLowerCase()] = val;
            if (subId === 'INAM') result.title = val;
            else if (subId === 'IART') result.artist = val;
            else if (subId === 'IPRD') result.album = val;
            else if (subId === 'ICMT') result.comment = val;
            else if (subId === 'IGNR') result.genre = val;
            else if (subId === 'ICOP') result.copyright = val;
            else if (subId === 'ISFT') result.encoder = val;
          }
          subOff += (subSize + (subSize % 2)); // 2-byte word aligned
        }
      }
    }

    offset += (size + (size % 2));
  }
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

  // Check AI Signatures in this chunk
  let textSample = '';
  const checkLen = Math.min(u8.length, 65536);
  for (let i = 0; i < checkLen; i++) {
    textSample += String.fromCharCode(u8[i]);
  }
  detectAiSignatures(textSample, result);

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

  parseBoxesRecursive(0, u8.length);

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
 * Primary Fast Scanner for Video Files: Reads file directly from RAM in <10ms
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
    const nativeInfo = await scanVideoElement(file);
    if (nativeInfo.width > 0 && nativeInfo.height > 0) {
      result.resolution = `${nativeInfo.width}x${nativeInfo.height}`;
    }
    if (nativeInfo.duration > 0) {
      result.durationSeconds = nativeInfo.duration;
      result.durationFormatted = formatDurationSeconds(nativeInfo.duration);
    }

    const firstChunkSize = Math.min(1024 * 1024, file.size);
    const firstBlob = file.slice(0, firstChunkSize);
    const firstBuf = await firstBlob.arrayBuffer();
    const firstU8 = new Uint8Array(firstBuf);

    parseMp4Chunk(firstU8, result);
    parseEbmlChunk(firstU8, result);

    if (file.size > firstChunkSize) {
      const lastChunkSize = Math.min(2 * 1024 * 1024, file.size);
      const lastStart = file.size - lastChunkSize;
      const lastBlob = file.slice(lastStart, file.size);
      const lastBuf = await lastBlob.arrayBuffer();
      const lastU8 = new Uint8Array(lastBuf);

      parseMp4Chunk(lastU8, result);
    }

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
    console.warn('scanFileMetadata notice:', err);
  }

  if (!result.creationTime && filenameDateTime) {
    result.creationTime = filenameDateTime;
  }
  if (!result.year && filenameYear) {
    result.year = filenameYear;
  }
  if (!result.creationTime && result.year) {
    result.creationTime = `${result.year}-01-01 12:00:00`;
  }

  if (!result.title && cleanTitle) {
    result.cleanTitleSuggestion = cleanTitle;
  }
  if (!result.artist) {
    if (result.hasC2pa && result.c2paIssuer?.includes('Google')) {
      result.artist = 'Google AI';
    } else if (result.aiProvider) {
      result.artist = result.aiProvider;
    } else if (result.encoder) {
      result.artist = result.encoder;
    }
  }

  result.hasGps = Boolean(result.location);
  result.hasDeviceInfo = Boolean(result.deviceMake || result.deviceModel);
  result.hasAuthorInfo = Boolean(result.title || result.artist || result.copyright);
  result.hasCreationDate = Boolean(result.creationTime || result.year);

  return result;
};

/**
 * Dedicated Fast Scanner for Audio Files (MP3, WAV, FLAC, AAC, M4A, OGG, OPUS)
 * Extracts ID3v2, RIFF WAV INFO, Vorbis comments, and deep AI Provenance
 */
export const scanAudioMetadata = async (file: File): Promise<DetectedAudioMetadata> => {
  const { title: cleanTitle, year: filenameYear, dateTime: filenameDateTime } = cleanFilenameToTitle(file.name);

  const result: DetectedAudioMetadata = {
    hasId3: false,
    hasAlbumArt: false,
    hasC2pa: false,
    aiGenerated: false,
    cleanTitleSuggestion: cleanTitle,
    rawTags: {}
  };

  try {
    // 1. Native duration probe
    const nativeAudio = await scanAudioElement(file);
    if (nativeAudio.duration > 0) {
      result.durationSeconds = nativeAudio.duration;
      result.durationFormatted = formatDurationSeconds(nativeAudio.duration);
    }

    // 2. Read first 512KB for headers
    const readSize = Math.min(512 * 1024, file.size);
    const blob = file.slice(0, readSize);
    const buf = await blob.arrayBuffer();
    const u8 = new Uint8Array(buf);

    // AI Check across binary sample
    let textSample = '';
    const sampleLimit = Math.min(u8.length, 65536);
    for (let i = 0; i < sampleLimit; i++) {
      textSample += String.fromCharCode(u8[i]);
    }
    detectAiSignatures(textSample, result);

    // Format specific parsers
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (ext === 'mp3' || (u8[0] === 0x49 && u8[1] === 0x44 && u8[2] === 0x33)) {
      parseId3v2Tags(u8, result);
    } else if (ext === 'wav' || (u8[0] === 0x52 && u8[1] === 0x49 && u8[2] === 0x46 && u8[3] === 0x46)) {
      parseRiffWav(u8, result);
    }

    // Check last 128 bytes for ID3v1 if no title/artist found yet
    if ((!result.title || !result.artist) && file.size > 128) {
      const v1Blob = file.slice(file.size - 128, file.size);
      const v1Buf = await v1Blob.arrayBuffer();
      const v1U8 = new Uint8Array(v1Buf);
      if (v1U8[0] === 0x54 && v1U8[1] === 0x41 && v1U8[2] === 0x47) { // 'TAG'
        const decodeAscii = (off: number, len: number) => {
          let s = '';
          for (let i = 0; i < len; i++) {
            if (v1U8[off + i] === 0) break;
            s += String.fromCharCode(v1U8[off + i]);
          }
          return s.trim();
        };
        const v1Title = decodeAscii(3, 30);
        const v1Artist = decodeAscii(33, 30);
        const v1Album = decodeAscii(63, 30);
        const v1Year = decodeAscii(93, 4);
        if (!result.title && v1Title) result.title = v1Title;
        if (!result.artist && v1Artist) result.artist = v1Artist;
        if (!result.album && v1Album) result.album = v1Album;
        if (!result.year && v1Year) result.year = v1Year;
        result.rawTags['id3v1'] = 'Present at EOF';
      }
    }
  } catch (err) {
    console.warn('scanAudioMetadata notice:', err);
  }

  // Date & Time defaults
  if (!result.creationTime && filenameDateTime) {
    result.creationTime = filenameDateTime;
  }
  if (!result.year && filenameYear) {
    result.year = filenameYear;
  }
  if (!result.creationTime && result.year) {
    result.creationTime = `${result.year}-01-01 12:00:00`;
  }

  // Smart suggestions
  if (!result.title && cleanTitle) {
    result.title = cleanTitle;
    result.cleanTitleSuggestion = cleanTitle;
  }
  if (!result.artist) {
    if (result.hasC2pa && result.c2paIssuer?.includes('Google')) {
      result.artist = 'Google AI';
    } else if (result.aiProvider) {
      result.artist = result.aiProvider;
    } else if (result.encoder) {
      result.artist = result.encoder;
    }
  }

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
