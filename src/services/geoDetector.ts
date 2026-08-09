// src/services/geoDetector.ts
const BOT_USER_AGENTS_REGEX = /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|ia_archiver|gptbot|chatgpt-user|perplexitybot|claudebot|applebot|facebookexternalhit|twitterbot|linkedinbot|embedly|quora|pinterest|slackbot|vkShare|w3c_validator|validator|cf\.client\.bot/i;

export function isBot(): boolean {
  if (typeof window === 'undefined' || !window.navigator) {
    return true; 
  }
  const ua = window.navigator.userAgent || '';
  return BOT_USER_AGENTS_REGEX.test(ua);
}

const TIMEZONE_TO_LANG: Record<string, string> = {
  'Asia/Jakarta': 'id',
  'Asia/Makassar': 'id',
  'Asia/Jayapura': 'id',
  'Asia/Seoul': 'ko',
  'Asia/Tokyo': 'ja',
  'Asia/Shanghai': 'zh',
  'Asia/Hong_Kong': 'zh',
  'Asia/Taipei': 'zh-TW',
  'Asia/Kolkata': 'hi',
  'Asia/Riyadh': 'ar',
  'Asia/Dubai': 'ar',
  'Asia/Bangkok': 'th',
  'Asia/Ho_Chi_Minh': 'vi',
  'Asia/Manila': 'tl',
  'Asia/Kuala_Lumpur': 'ms',
  'Europe/Moscow': 'ru',
  'Europe/Madrid': 'es',
  'Europe/Paris': 'fr',
  'Europe/Berlin': 'de',
  'Europe/Rome': 'it',
  'Europe/Istanbul': 'tr',
  'Europe/Warsaw': 'pl',
  'Europe/Amsterdam': 'nl',
  'Europe/Stockholm': 'sv',
  'Europe/Kiev': 'uk',
  'Europe/Bucharest': 'ro',
  'Europe/Athens': 'el',
  'Europe/Prague': 'cs',
  'Europe/Budapest': 'hu',
  'Europe/Copenhagen': 'da',
  'Europe/Helsinki': 'fi',
  'Europe/Oslo': 'no',
  'Asia/Jerusalem': 'he',
  'America/Sao_Paulo': 'pt',
  'America/Mexico_City': 'es',
  'America/Buenos_Aires': 'es',
  'America/Bogota': 'es'
};

export function getPreferredLanguage(supportedCodes: string[], defaultLang = 'en'): string {
  if (typeof window === 'undefined' || !window.navigator) {
    return defaultLang;
  }

  const browserLangs = window.navigator.languages || [window.navigator.language];
  for (const langStr of browserLangs) {
    if (!langStr) continue;
    const code = langStr.toLowerCase().split('-')[0];
    if (supportedCodes.includes(code)) {
      return code;
    }
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz && TIMEZONE_TO_LANG[tz] && supportedCodes.includes(TIMEZONE_TO_LANG[tz])) {
      return TIMEZONE_TO_LANG[tz];
    }
  } catch (e) {
    console.warn('Timezone detection failed:', e);
  }

  return defaultLang;
}

export function shouldAutoRedirectToLang(currentPathname: string, supportedCodes: string[]): string | null {
  if (isBot()) {
    return null;
  }

  if (currentPathname === '/' || currentPathname === '') {
    const prefLang = getPreferredLanguage(supportedCodes, 'en');
    if (prefLang === 'en') return null; // Default route for EN is /
    return `/${prefLang}`;
  }

  return null;
}
