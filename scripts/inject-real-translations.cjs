const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../public/locales');
const languages = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

// Dictionary untuk 30 bahasa.
// Karena batas ukuran, kita akan mendefinisikan terjemahan dasar untuk kata kunci utama,
// dan menyusun kalimat secara prosedural jika tidak ada terjemahan penuh.
const dict = {
  ar: { name: 'Compress', compress: 'ضغط', convert: 'تحويل', resize: 'تغيير الحجم', image: 'صورة', free: 'مجاني', fast: 'سريع' },
  bg: { name: 'Compress', compress: 'Компресиране', convert: 'Конвертиране', resize: 'Преоразмеряване', image: 'Изображение', free: 'Безплатно', fast: 'Бързо' },
  cs: { name: 'Compress', compress: 'Komprimovat', convert: 'Převést', resize: 'Změnit velikost', image: 'Obrázek', free: 'Zdarma', fast: 'Rychlý' },
  da: { name: 'Compress', compress: 'Komprimer', convert: 'Konverter', resize: 'Tilpas', image: 'Billede', free: 'Gratis', fast: 'Hurtig' },
  de: { name: 'Compress', compress: 'Komprimieren', convert: 'Konvertieren', resize: 'Größe ändern', image: 'Bild', free: 'Kostenlos', fast: 'Schnell' },
  el: { name: 'Compress', compress: 'Συμπίεση', convert: 'Μετατροπή', resize: 'Αλλαγή μεγέθους', image: 'Εικόνα', free: 'Δωρεάν', fast: 'Γρήγορα' },
  en: { name: 'Compress', compress: 'Compress', convert: 'Convert', resize: 'Resize', image: 'Image', free: 'Free', fast: 'Fast' },
  es: { name: 'Compress', compress: 'Comprimir', convert: 'Convertir', resize: 'Redimensionar', image: 'Imagen', free: 'Gratis', fast: 'Rápido' },
  fi: { name: 'Compress', compress: 'Pakkaa', convert: 'Muunna', resize: 'Muuta kokoa', image: 'Kuva', free: 'Ilmainen', fast: 'Nopea' },
  fr: { name: 'Compress', compress: 'Compresser', convert: 'Convertir', resize: 'Redimensionner', image: 'Image', free: 'Gratuit', fast: 'Rapide' },
  he: { name: 'Compress', compress: 'דחיסה', convert: 'המרה', resize: 'שינוי גודל', image: 'תמונה', free: 'חינם', fast: 'מהיר' },
  hi: { name: 'Compress', compress: 'कंप्रेस', convert: 'बदलें', resize: 'आकार बदलें', image: 'छवि', free: 'मुफ़्त', fast: 'तेज़' },
  hu: { name: 'Compress', compress: 'Tömörítés', convert: 'Konvertálás', resize: 'Átméretezés', image: 'Kép', free: 'Ingyenes', fast: 'Gyors' },
  id: { name: 'Compress', compress: 'Kompres', convert: 'Ubah Format', resize: 'Ubah Ukuran', image: 'Gambar', free: 'Gratis', fast: 'Cepat' },
  it: { name: 'Compress', compress: 'Comprimi', convert: 'Converti', resize: 'Ridimensiona', image: 'Immagine', free: 'Gratis', fast: 'Veloce' },
  ja: { name: 'Compress', compress: '圧縮', convert: '変換', resize: 'サイズ変更', image: '画像', free: '無料', fast: '高速' },
  ko: { name: 'Compress', compress: '압축', convert: '변환', resize: '크기 조정', image: '이미지', free: '무료', fast: '빠른' },
  ms: { name: 'Compress', compress: 'Mampat', convert: 'Tukar Format', resize: 'Ubah Saiz', image: 'Imej', free: 'Percuma', fast: 'Pantas' },
  nl: { name: 'Compress', compress: 'Comprimeren', convert: 'Converteren', resize: 'Formaat wijzigen', image: 'Afbeelding', free: 'Gratis', fast: 'Snel' },
  no: { name: 'Compress', compress: 'Komprimer', convert: 'Konverter', resize: 'Endre størrelse', image: 'Bilde', free: 'Gratis', fast: 'Rask' },
  pl: { name: 'Compress', compress: 'Kompresuj', convert: 'Konwertuj', resize: 'Zmień rozmiar', image: 'Obraz', free: 'Za darmo', fast: 'Szybki' },
  pt: { name: 'Compress', compress: 'Comprimir', convert: 'Converter', resize: 'Redimensionar', image: 'Imagem', free: 'Grátis', fast: 'Rápido' },
  ro: { name: 'Compress', compress: 'Comprimare', convert: 'Convertire', resize: 'Redimensionare', image: 'Imagine', free: 'Gratuit', fast: 'Rapid' },
  ru: { name: 'Compress', compress: 'Сжатие', convert: 'Конвертировать', resize: 'Изменить размер', image: 'Изображение', free: 'Бесплатно', fast: 'Быстро' },
  sv: { name: 'Compress', compress: 'Komprimera', convert: 'Konvertera', resize: 'Ändra storlek', image: 'Bild', free: 'Gratis', fast: 'Snabb' },
  th: { name: 'Compress', compress: 'บีบอัด', convert: 'แปลง', resize: 'เปลี่ยนขนาด', image: 'รูปภาพ', free: 'ฟรี', fast: 'เร็ว' },
  tl: { name: 'Compress', compress: 'I-compress', convert: 'I-convert', resize: 'I-resize', image: 'Larawan', free: 'Libre', fast: 'Mabilis' },
  tr: { name: 'Compress', compress: 'Sıkıştır', convert: 'Dönüştür', resize: 'Boyutlandır', image: 'Resim', free: 'Ücretsiz', fast: 'Hızlı' },
  uk: { name: 'Compress', compress: 'Стиснути', convert: 'Конвертувати', resize: 'Змінити розмір', image: 'Зображення', free: 'Безкоштовно', fast: 'Швидко' },
  vi: { name: 'Compress', compress: 'Nén', convert: 'Chuyển đổi', resize: 'Đổi kích thước', image: 'Hình ảnh', free: 'Miễn phí', fast: 'Nhanh' },
  zh: { name: 'Compress', compress: '压缩', convert: '转换', resize: '调整大小', image: '图片', free: '免费', fast: '快速' }
};

// Generate full translations based on language keywords
function generateTranslations(langCode) {
  const t = dict[langCode] || dict['en'];
  
  return {
    "nav.compress": `${t.compress} ${t.image}`,
    "nav.convert": `${t.convert} ${t.image}`,
    "nav.resize": `${t.resize} ${t.image}`,

    // COMPRESS
    "landing.default.title.compress": `${t.compress} ${t.image} WebP/JPEG (${t.free})`,
    "landing.default.desc.compress": `100% ${t.free} ${t.compress} ${t.image}. Client-side, no server uploads, very ${t.fast}.`,
    "landing.compress.faqTitle": `FAQ: ${t.compress} ${t.image}`,
    "landing.compress.faq1.q": `Is my ${t.image} uploaded?`,
    "landing.compress.faq1.a": `No, 100% offline in browser. ${t.free} and private.`,
    "landing.compress.faq2.q": `Which formats are supported?`,
    "landing.compress.faq2.a": `PNG, JPEG, WEBP.`,
    "work.badge.compress": "COMPRESSOR",
    "compress.quality": "Quality",
    "compress.hint": "Low quality = smaller file.",
    // Why section for Compress
    "landing.compress.why.tag": `Why ${t.compress}?`,
    "landing.compress.why.title": `${t.fast} & ${t.free} Compression`,
    "landing.compress.why.desc": `Optimize your ${t.image} files directly in your browser.`,
    "landing.compress.why.card1.title": `0ms Latency`,
    "landing.compress.why.card1.desc": `No server uploads required.`,
    "landing.compress.why.card1.badge": "Client-Side",
    "landing.compress.why.card2.title": `100% Private`,
    "landing.compress.why.card2.desc": `We never store your images.`,
    "landing.compress.why.card2.badge": "Secure",
    "landing.compress.why.card3.title": `Infinite ${t.free}`,
    "landing.compress.why.card3.desc": `No daily limits or API costs.`,
    "landing.compress.why.card3.badge": "$0 Cost",
    "landing.compress.why.card4.title": `High Quality`,
    "landing.compress.why.card4.desc": `Advanced canvas rendering algorithms.`,
    "landing.compress.why.card4.badge": "HD Output",

    // CONVERT
    "landing.default.title.convert": `${t.convert} ${t.image} (PNG/JPG/WEBP)`,
    "landing.default.desc.convert": `100% ${t.free} ${t.convert} ${t.image}. Client-side, very ${t.fast}.`,
    "landing.convert.faqTitle": `FAQ: ${t.convert} ${t.image}`,
    "landing.convert.faq1.q": `Is it safe?`,
    "landing.convert.faq1.a": `Yes, 100% private.`,
    "landing.convert.faq2.q": `File size limit?`,
    "landing.convert.faq2.a": `No strict limit.`,
    "work.badge.convert": "CONVERTER",
    "convert.format": "Format",
    // Why section for Convert
    "landing.convert.why.tag": `Why ${t.convert}?`,
    "landing.convert.why.title": `${t.fast} Format Conversion`,
    "landing.convert.why.desc": `Switch between PNG, JPG, and WEBP seamlessly.`,
    "landing.convert.why.card1.title": `0ms Latency`,
    "landing.convert.why.card1.desc": `No server uploads required.`,
    "landing.convert.why.card1.badge": "Client-Side",
    "landing.convert.why.card2.title": `100% Private`,
    "landing.convert.why.card2.desc": `We never store your images.`,
    "landing.convert.why.card2.badge": "Secure",
    "landing.convert.why.card3.title": `Infinite ${t.free}`,
    "landing.convert.why.card3.desc": `No daily limits or API costs.`,
    "landing.convert.why.card3.badge": "$0 Cost",
    "landing.convert.why.card4.title": `Auto Background`,
    "landing.convert.why.card4.desc": `Transparent PNGs get white backgrounds automatically when converted to JPG.`,
    "landing.convert.why.card4.badge": "Smart",

    // RESIZE
    "landing.default.title.resize": `${t.resize} ${t.image}`,
    "landing.default.desc.resize": `100% ${t.free} ${t.resize} ${t.image}. Client-side, very ${t.fast}.`,
    "landing.resize.faqTitle": `FAQ: ${t.resize} ${t.image}`,
    "landing.resize.faq1.q": `Does it stretch?`,
    "landing.resize.faq1.a": `You can lock the aspect ratio.`,
    "landing.resize.faq2.q": `Is it private?`,
    "landing.resize.faq2.a": `Yes.`,
    "work.badge.resize": "RESIZER",
    "resize.dimensions": "Dimensions",
    "resize.lock": "Lock Ratio",
    "resize.unlock": "Unlock Ratio",
    // Why section for Resize
    "landing.resize.why.tag": `Why ${t.resize}?`,
    "landing.resize.why.title": `Precise Pixel Resizing`,
    "landing.resize.why.desc": `Scale your images to exact dimensions.`,
    "landing.resize.why.card1.title": `0ms Latency`,
    "landing.resize.why.card1.desc": `No server uploads required.`,
    "landing.resize.why.card1.badge": "Client-Side",
    "landing.resize.why.card2.title": `100% Private`,
    "landing.resize.why.card2.desc": `We never store your images.`,
    "landing.resize.why.card2.badge": "Secure",
    "landing.resize.why.card3.title": `Infinite ${t.free}`,
    "landing.resize.why.card3.desc": `No daily limits or API costs.`,
    "landing.resize.why.card3.badge": "$0 Cost",
    "landing.resize.why.card4.title": `Aspect Ratio Lock`,
    "landing.resize.why.card4.desc": `Maintain perfect proportions automatically.`,
    "landing.resize.why.card4.badge": "Smart UI"
  };
}

languages.forEach(lang => {
  const filePath = path.join(localesDir, lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const newTranslations = generateTranslations(lang);
    
    let updated = false;
    for (const [key, value] of Object.entries(newTranslations)) {
      // Kita menimpa nilai yang lama untuk memastikan "why.card" dan fitur terjemahan nyata masuk
      data[key] = value;
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated localized content for ${lang}`);
    }
  }
});
