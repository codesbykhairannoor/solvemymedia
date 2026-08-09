import translate from 'google-translate-api-x';

async function test() {
  const res = await translate("Compress Video", { to: 'ko' });
  console.log("Text:", res.text);
  console.log("Pronunciation:", res.pronunciation);

  const resJa = await translate("Compress Video", { to: 'ja' });
  console.log("JA Text:", resJa.text);
  console.log("JA Pronunciation:", resJa.pronunciation);

  const resAr = await translate("Compress Video", { to: 'ar' });
  console.log("AR Text:", resAr.text);
  console.log("AR Pronunciation:", resAr.pronunciation);
  
  const resRu = await translate("Compress Video", { to: 'ru' });
  console.log("RU Text:", resRu.text);
  console.log("RU Pronunciation:", resRu.pronunciation);
}
test();
