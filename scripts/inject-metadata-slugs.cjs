const fs = require('fs');
const path = require('path');

const slugsPath = path.join(__dirname, '../src/i18n/slugs.ts');
let content = fs.readFileSync(slugsPath, 'utf8');

const SLUG_CANDIDATES_REMOVE = {
  en: 'remove-video-metadata',
  id: 'hapus-metadata-video',
  es: 'eliminar-metadatos-video',
  fr: 'supprimer-metadonnees-video',
  de: 'video-metadaten-entfernen',
  it: 'rimuovi-metadati-video',
  pt: 'remover-metadados-video',
  nl: 'video-metadata-verwijderen',
  pl: 'usun-metadane-wideo',
  ru: 'udalit-metadannye-video',
  ja: 'douga-metadeta-sakujo',
  ko: 'dongyeongsang-metadeiteo-sakje',
  zh: 'shanchu-shipin-yuanshuju',
  'zh-TW': 'shanchu-yingpian-yuanshuju',
  tr: 'video-meta-verilerini-kaldir',
  vi: 'xoa-metadata-video',
  th: 'lop-khomun-metadeta-widi-o',
  ar: 'hazf-bayanat-wasf-alvideo',
  hi: 'video-metadata-hataayein',
  sv: 'ta-bort-videometadata',
  no: 'fjern-videometadata',
  da: 'fjern-videometadata',
  fi: 'poista-videon-metatiedot',
  cs: 'odstranit-metadata-videa',
  hu: 'video-metaadatok-eltavolitasa',
  el: 'afairesi-metadedomenon-vinteo',
  ro: 'sterge-metadate-video',
  uk: 'vydalyty-metadani-video',
  ms: 'buang-metadata-video',
  tl: 'alisin-ang-metadata-ng-video',
  he: 'hasarat-metadatan-video',
  sk: 'odstranit-metadata-videa'
};

const SLUG_CANDIDATES_EDIT = {
  en: 'edit-video-metadata',
  id: 'edit-metadata-video',
  es: 'editar-metadatos-video',
  fr: 'modifier-metadonnees-video',
  de: 'video-metadaten-bearbeiten',
  it: 'modifica-metadati-video',
  pt: 'editar-metadados-video',
  nl: 'video-metadata-bewerken',
  pl: 'edytuj-metadane-wideo',
  ru: 'redaktirovat-metadannye-video',
  ja: 'douga-metadeta-henshu',
  ko: 'dongyeongsang-metadeiteo-pyeonjip',
  zh: 'bianji-shipin-yuanshuju',
  'zh-TW': 'bianji-yingpian-yuanshuju',
  tr: 'video-meta-verilerini-duzenle',
  vi: 'chinh-sua-metadata-video',
  th: 'kaekhai-khomun-metadeta-widi-o',
  ar: 'tahrir-bayanat-wasf-alvideo',
  hi: 'video-metadata-edit-karein',
  sv: 'redigera-videometadata',
  no: 'rediger-videometadata',
  da: 'rediger-videometadata',
  fi: 'muokkaa-videon-metatietoja',
  cs: 'upravit-metadata-videa',
  hu: 'video-metaadatok-szerkesztese',
  el: 'epexergasia-metadedomenon-vinteo',
  ro: 'editeaza-metadate-video',
  uk: 'redaguvaty-metadani-video',
  ms: 'edit-metadata-video',
  tl: 'i-edit-ang-metadata-ng-video',
  he: 'arichat-metadatan-video',
  sk: 'upravit-metadata-videa'
};

// Check if SLUGS_MAP object can be parsed and modified accurately
const mapMatch = content.match(/export const SLUGS_MAP: Record<string, Record<string, string>> = (\{[\s\S]*?\});\s*\n\s*export const getLocalizedSlug/);

if (mapMatch) {
  let mapObj = eval('(' + mapMatch[1] + ')');
  for (const lang of Object.keys(SLUG_CANDIDATES_REMOVE)) {
    if (!mapObj[lang]) mapObj[lang] = {};
    mapObj[lang]['remove-video-metadata'] = SLUG_CANDIDATES_REMOVE[lang];
    mapObj[lang]['edit-video-metadata'] = SLUG_CANDIDATES_EDIT[lang];
  }
  
  const newMapStr = 'export const SLUGS_MAP: Record<string, Record<string, string>> = ' + JSON.stringify(mapObj, null, 2) + ';\n\nexport const getLocalizedSlug';
  content = content.replace(/export const SLUGS_MAP: Record<string, Record<string, string>> = (\{[\s\S]*?\});\s*\n\s*export const getLocalizedSlug/, newMapStr);
  fs.writeFileSync(slugsPath, content, 'utf8');
  console.log('✅ Updated SLUGS_MAP in src/i18n/slugs.ts successfully!');
} else {
  console.error('Could not match SLUGS_MAP');
}
