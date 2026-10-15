const fs = require('fs');
const path = require('path');

const slugsPath = path.join(__dirname, '../src/i18n/slugs.ts');
let content = fs.readFileSync(slugsPath, 'utf8');

const SLUG_CANDIDATES_REMOVE = {
  en: 'remove-audio-metadata',
  id: 'hapus-metadata-audio',
  es: 'eliminar-metadatos-audio',
  fr: 'supprimer-metadonnees-audio',
  de: 'audio-metadaten-entfernen',
  it: 'rimuovi-metadati-audio',
  pt: 'remover-metadados-audio',
  nl: 'audio-metadata-verwijderen',
  pl: 'usun-metadane-audio',
  ru: 'udalit-metadannye-audio',
  ja: 'onsei-metadeta-sakujo',
  ko: 'odieo-metadeiteo-sakje',
  zh: 'shanchu-yinpin-yuanshuju',
  'zh-TW': 'shanchu-yinpin-yuanshuju',
  tr: 'ses-meta-verilerini-kaldir',
  vi: 'xoa-metadata-audio',
  th: 'lop-khomun-metadeta-siang',
  ar: 'hazf-bayanat-wasf-alsawt',
  hi: 'audio-metadata-hataayein',
  sv: 'ta-bort-audiometadata',
  no: 'fjern-audiometadata',
  da: 'fjern-audiometadata',
  fi: 'poista-audion-metatiedot',
  cs: 'odstranit-metadata-audia',
  hu: 'audio-metaadatok-eltavolitasa',
  el: 'afairesi-metadedomenon-ichou',
  ro: 'sterge-metadate-audio',
  uk: 'vydalyty-metadani-audio',
  ms: 'buang-metadata-audio',
  tl: 'alisin-ang-metadata-ng-audio',
  he: 'hasarat-metadatan-audio',
  sk: 'odstranit-metadata-audia'
};

const SLUG_CANDIDATES_EDIT = {
  en: 'edit-audio-metadata',
  id: 'edit-metadata-audio',
  es: 'editar-metadatos-audio',
  fr: 'modifier-metadonnees-audio',
  de: 'audio-metadaten-bearbeiten',
  it: 'modifica-metadati-audio',
  pt: 'editar-metadados-audio',
  nl: 'audio-metadata-bewerken',
  pl: 'edytuj-metadane-audio',
  ru: 'redaktirovat-metadannye-audio',
  ja: 'onsei-metadeta-henshu',
  ko: 'odieo-metadeiteo-pyeonjip',
  zh: 'bianji-yinpin-yuanshuju',
  'zh-TW': 'bianji-yinpin-yuanshuju',
  tr: 'ses-meta-verilerini-duzenle',
  vi: 'chinh-sua-metadata-audio',
  th: 'kaekhai-khomun-metadeta-siang',
  ar: 'tahrir-bayanat-wasf-alsawt',
  hi: 'audio-metadata-edit-karein',
  sv: 'redigera-audiometadata',
  no: 'rediger-audiometadata',
  da: 'rediger-audiometadata',
  fi: 'muokkaa-audion-metatietoja',
  cs: 'upravit-metadata-audia',
  hu: 'audio-metaadatok-szerkesztese',
  el: 'epexergasia-metadedomenon-ichou',
  ro: 'editeaza-metadate-audio',
  uk: 'redaguvaty-metadani-audio',
  ms: 'edit-metadata-audio',
  tl: 'i-edit-ang-metadata-ng-audio',
  he: 'arichat-metadatan-audio',
  sk: 'upravit-metadata-audia'
};

const mapMatch = content.match(/export const SLUGS_MAP: Record<string, Record<string, string>> = (\{[\s\S]*?\});\s*\n\s*export const getLocalizedSlug/);

if (mapMatch) {
  let mapObj = eval('(' + mapMatch[1] + ')');
  for (const lang of Object.keys(SLUG_CANDIDATES_REMOVE)) {
    if (!mapObj[lang]) mapObj[lang] = {};
    mapObj[lang]['remove-audio-metadata'] = SLUG_CANDIDATES_REMOVE[lang];
    mapObj[lang]['edit-audio-metadata'] = SLUG_CANDIDATES_EDIT[lang];
  }
  
  const newMapStr = 'export const SLUGS_MAP: Record<string, Record<string, string>> = ' + JSON.stringify(mapObj, null, 2) + ';\n\nexport const getLocalizedSlug';
  content = content.replace(/export const SLUGS_MAP: Record<string, Record<string, string>> = (\{[\s\S]*?\});\s*\n\s*export const getLocalizedSlug/, newMapStr);
  fs.writeFileSync(slugsPath, content, 'utf8');
  console.log('✅ Updated SLUGS_MAP for Audio Metadata in src/i18n/slugs.ts successfully!');
} else {
  console.error('Could not match SLUGS_MAP');
}
