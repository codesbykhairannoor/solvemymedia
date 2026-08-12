const fs = require('fs');
let c = fs.readFileSync('src/pages/Home.tsx', 'utf8');

c = c.replace(
  /\{ id: 'compress-video', icon: Video, name: 'Compress Video', desc: 'Reduce video file size locally without losing quality.', color: '#3b82f6' \}/,
  "{ id: 'compress-video', icon: Video, name: t('navbarCompressVideo') || 'Compress Video', desc: t('toolCompressVideoDesc') || 'Reduce video file size locally without losing quality.', color: '#3b82f6' }"
);

c = c.replace(
  /\{ id: 'compress-audio', icon: Music, name: 'Compress Audio', desc: 'Optimize audio files for web and sharing instantly.', color: '#10b981' \}/,
  "{ id: 'compress-audio', icon: Music, name: t('navbarCompressAudio') || 'Compress Audio', desc: t('toolCompressAudioDesc') || 'Optimize audio files for web and sharing instantly.', color: '#10b981' }"
);

c = c.replace(
  /\{ id: 'convert-video', icon: Video, name: 'Convert Video', desc: 'Change video formats locally in your browser.', color: '#f59e0b' \}/,
  "{ id: 'convert-video', icon: Video, name: t('toolConvertVideoName') || 'Convert Video', desc: t('toolConvertVideoDesc') || 'Change video formats locally in your browser.', color: '#f59e0b' }"
);

c = c.replace(
  /\{ id: 'video-to-audio', icon: FileAudio, name: 'Video to Audio', desc: 'Extract high-quality audio tracks from video files.', color: '#ec4899' \}/,
  "{ id: 'video-to-audio', icon: FileAudio, name: t('navbarVideoToAudio') || 'Video to Audio', desc: t('toolVideoToAudioDesc') || 'Extract high-quality audio tracks from video files.', color: '#ec4899' }"
);

c = c.replace(
  /\{ id: 'merge-audio', icon: Scissors, name: 'Merge Audio', desc: 'Combine multiple audio tracks into a single file.', color: '#8b5cf6' \}/,
  "{ id: 'merge-audio', icon: Scissors, name: t('toolMergeAudioName') || 'Merge Audio', desc: t('toolMergeAudioDesc') || 'Combine multiple audio tracks into a single file.', color: '#8b5cf6' }"
);

c = c.replace(
  /\{ id: 'watermark-video', icon: Image, name: 'Watermark Video', desc: 'Protect videos with custom text or image watermarks.', color: '#6366f1' \}/,
  "{ id: 'watermark-video', icon: Image, name: t('toolWatermarkVideoName') || 'Watermark Video', desc: t('toolWatermarkVideoDesc') || 'Protect videos with custom text or image watermarks.', color: '#6366f1' }"
);

fs.writeFileSync('src/pages/Home.tsx', c);
console.log('Updated Home.tsx tool cards');
