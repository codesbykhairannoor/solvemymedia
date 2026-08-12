const fs = require('fs');

// ConvertVideo.tsx
let cv = fs.readFileSync('src/pages/ConvertVideo.tsx', 'utf8');

cv = cv.replace(/import \{ CenteredActionWorkspace \} from '\.\.\/components\/workspaces\/CenteredActionWorkspace';/, "import { CenteredActionWorkspace } from '../components/workspaces/CenteredActionWorkspace';\nimport { useLanguage } from '../hooks/useLanguage';");

cv = cv.replace(/const \{ processing, progress, engine, processMedia \} = useUniversalCompressor\(\);/, "const { processing, progress, engine, processMedia } = useUniversalCompressor();\n  const { t: trans } = useLanguage();");

cv = cv.replace(/const ui = \{ target_format: "Target Format", select_format: "Select the format you want to convert this video into.", convert_mp4: "Convert to MP4" \};/, `const ui = { 
    target_format: trans('convVSettings') || "Target Format", 
    select_format: trans('convVTargetDesc') || "Select the format you want to convert this video into.", 
    convert_mp4: trans('convVAction') || "Convert to MP4" 
  };`);

cv = cv.replace(/title="Convert Video Formats Fast"/, `title={trans('convVTitle') || "Convert Video Formats Instantly"}`);
cv = cv.replace(/description="Seamlessly convert your video files into MP4, WebM, MOV, and AVI formats right from your browser\. 100% private and ultra-fast\."/, `description={trans('convVDesc') || "Change your video from MP4 to WebM, MKV to AVI, and more. Processing runs directly in your browser without waiting for server uploads."}`);

fs.writeFileSync('src/pages/ConvertVideo.tsx', cv);
console.log('Updated ConvertVideo.tsx');

// ChangeVideoSpeed.tsx
let sp = fs.readFileSync('src/pages/ChangeVideoSpeed.tsx', 'utf8');

sp = sp.replace(/import \{ DualColumnWorkspace \} from '\.\.\/components\/workspaces\/DualColumnWorkspace';/, "import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';\nimport { useLanguage } from '../hooks/useLanguage';");

sp = sp.replace(/const \{ processing, progress, runCustomFFmpeg \} = useFFmpeg\(\);/, "const { processing, progress, runCustomFFmpeg } = useFFmpeg();\n  const { t: trans } = useLanguage();");

sp = sp.replace(/const t = \{[\s\S]*?\};/, `const t = {
    factor: trans('speedVSettings') || "Speed Factor",
    desc: trans('speedVTargetDesc') || "Change video playback speed without distorting audio pitch.",
    slow: trans('speedVSlow') || "Slow (0.5x)",
    norm: trans('speedVNorm') || "Normal (1.0x)",
    fast: trans('speedVFast') || "Fast (2.0x)",
    change: trans('speedVAction') || "Change Speed"
  };`);

sp = sp.replace(/title="Change Video Speed Offline"/, `title={trans('speedVTitle') || "Change Video Speed Offline"}`);
sp = sp.replace(/description="Speed up or slow down your videos without uploading\. Create slow-motion or fast timelapses without leaving your browser\."/, `description={trans('speedVDesc') || "Speed up or slow down your videos without uploading. Create slow-motion or fast timelapses without leaving your browser."}`);
sp = sp.replace(/processActionText="Change Speed"/, `processActionText={t.change}`);

fs.writeFileSync('src/pages/ChangeVideoSpeed.tsx', sp);
console.log('Updated ChangeVideoSpeed.tsx');
