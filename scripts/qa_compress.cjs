const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');
const path = require('path');

const TEST_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4';
const TEST_VIDEO_PATH = path.join(__dirname, 'test_video.mp4');
const APP_URL = 'http://localhost:3201/compress-video';

async function downloadTestVideo() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(TEST_VIDEO_PATH)) {
      return resolve();
    }
    console.log('Downloading test video...');
    const file = fs.createWriteStream(TEST_VIDEO_PATH);
    https.get(TEST_VIDEO_URL, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(TEST_VIDEO_PATH, () => {});
      reject(err);
    });
  });
}

const DEVICES = [
  { name: 'Desktop (1920x1080)', width: 1920, height: 1080, isMobile: false },
  { name: 'iPhone 13 Pro (390x844)', width: 390, height: 844, isMobile: true }
];

async function runQA() {
  console.log('--- STARTING QA TEST FOR COMPRESS VIDEO ---');
  await downloadTestVideo();
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-features=SharedArrayBuffer'
    ]
  });

  for (const device of DEVICES) {
    console.log(`\nTesting on: ${device.name}`);
    const page = await browser.newPage();
    
    // Set Viewport
    await page.setViewport({
      width: device.width,
      height: device.height,
      isMobile: device.isMobile,
      hasTouch: device.isMobile,
      deviceScaleFactor: device.isMobile ? 3 : 1,
    });

    try {
      console.log('1. Navigating to /compress-video...');
      await page.goto(APP_URL, { waitUntil: 'networkidle2' });
      
      console.log('2. Uploading test video...');
      const fileInput = await page.$('input[type="file"]');
      if (!fileInput) throw new Error('File input not found!');
      
      await fileInput.uploadFile(TEST_VIDEO_PATH);
      
      console.log('3. Waiting for video to load in UI...');
      // Usually there's a "Compress Video" button once loaded
      await page.waitForFunction(() => {
        return Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Compress'));
      }, { timeout: 10000 });
      
      console.log('4. Clicking "Compress" button...');
      const buttons = await page.$$('button');
      let compressBtn;
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text.includes('Compress') && !text.includes('Level')) {
          compressBtn = btn;
          break;
        }
      }
      
      if (!compressBtn) throw new Error('Compress button not found!');
      await compressBtn.click();
      
      console.log('5. Waiting for compression to finish (this may take up to 2 minutes)...');
      // Look for a download button or success message
      await page.waitForFunction(() => {
        return Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Download') || b.textContent.includes('Save'));
      }, { timeout: 120000 });
      
      console.log(`✅ SUCCESS on ${device.name}: Compression finished successfully and Download button appeared.`);
      
    } catch (err) {
      console.error(`❌ FAILED on ${device.name}: ${err.message}`);
      await page.screenshot({ path: `qa_error_${device.name.replace(/[^a-zA-Z0-9]/g, '_')}.png` });
      console.log(`Screenshot saved for debugging.`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n--- QA TEST FINISHED ---');
}

runQA().catch(console.error);
