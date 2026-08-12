const fs = require('fs');
let c = fs.readFileSync('src/pages/CompressVideo.tsx', 'utf8');

c = c.replace(/import \{ DualColumnWorkspace \} from '\.\.\/components\/workspaces\/DualColumnWorkspace';/, "import { DualColumnWorkspace } from '../components/workspaces/DualColumnWorkspace';\nimport { useLanguage } from '../hooks/useLanguage';");

c = c.replace(/const \{ processing, progress, engine, processMedia \} = useUniversalCompressor\(\);/, "const { processing, progress, engine, processMedia } = useUniversalCompressor();\n  const { t: trans } = useLanguage();");

c = c.replace(/const t = \{[\s\S]*?\};/, `const t = {
    settings: trans('cvSettings') || "Compression Settings",
    desc: trans('cvSettingsDesc') || "Choose compression target. Lower quality means smaller file size.",
    extreme: trans('cvExtreme') || "Extreme Size",
    balanced: trans('cvBalanced') || "Balanced",
    high: trans('cvHigh') || "High Quality"
  };`);

c = c.replace(/title="Compress Video Files without Losing Quality"/, `title={trans('cvTitle') || "Compress Video Files without Losing Quality"}`);
c = c.replace(/description="Shrink massive video files down to manageable sizes in seconds\. Advanced local compression keeps visual quality high and file size low\."/, `description={trans('cvDesc') || "Shrink massive video files down to manageable sizes in seconds. Advanced local compression keeps visual quality high and file size low."}`);
c = c.replace(/processActionText="Compress Video"/, `processActionText={trans('cvAction') || "Compress Video"}`);

fs.writeFileSync('src/pages/CompressVideo.tsx', c);
console.log('Updated CompressVideo.tsx');
