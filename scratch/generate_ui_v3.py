import os
import random

TOOLS = [
    # The first 10 tools
    ("Mp4ToMp3", "/mp4-to-mp3"),
    ("MovToMp4", "/mov-to-mp4"),
    ("MkvToMp4", "/mkv-to-mp4"),
    ("WebmToMp4", "/webm-to-mp4"),
    ("AviToMp4", "/avi-to-mp4"),
    ("WavToMp3", "/wav-to-mp3"),
    ("M4aToMp3", "/m4a-to-mp3"),
    ("FlacToMp3", "/flac-to-mp3"),
    ("OggToMp3", "/ogg-to-mp3"),
    ("CompressMp4", "/compress-mp4"),
    
    # The remaining 20 tools
    ("CompressMov", "/compress-mov"),
    ("CompressWebm", "/compress-webm"),
    ("Mp4ToGif", "/mp4-to-gif"),
    ("MovToGif", "/mov-to-gif"),
    ("CompressMp3", "/compress-mp3"),
    ("CompressWav", "/compress-wav"),
    ("TranscribeMp3", "/transcribe-mp3"),
    ("TranscribeMp4", "/transcribe-mp4"),
    ("ScreenRecorder", "/screen-recorder"),
    ("AudioRecorder", "/audio-recorder"),
    ("SpeedUpMp4", "/speed-up-mp4"),
    ("SlowDownMp4", "/slow-down-mp4"),
    ("CropMp4", "/crop-mp4"),
    ("ResizeVideoForTiktok", "/resize-video-for-tiktok"),
    ("MuteMp4", "/mute-mp4"),
    ("RemoveAudioFromVideo", "/remove-audio-from-video"),
    ("AddWatermarkToMp4", "/add-watermark-to-mp4"),
    ("JoinAudioFiles", "/join-audio-files"),
    ("MergeMp3", "/merge-mp3"),
    ("Mp4ToWav", "/mp4-to-wav")
]

GRADIENTS = [
    "linear-gradient(135deg, #1e1e2f 0%, #2a2a40 100%)",
    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    "linear-gradient(180deg, #111827 0%, #1f2937 100%)",
    "linear-gradient(90deg, #18181b 0%, #27272a 100%)",
    "linear-gradient(135deg, #171717 0%, #262626 100%)",
    "radial-gradient(circle at top left, #1e293b, #0f172a)",
    "radial-gradient(circle at center, #27272a, #18181b)",
    "linear-gradient(145deg, #1a202c 0%, #2d3748 100%)",
    "linear-gradient(120deg, #121212 0%, #1f1f1f 100%)",
    "linear-gradient(to right, #24243e, #302b63, #0f0c29)"
]

COLORS = [
    "#facc15", "#38bdf8", "#4ade80", "#f87171", "#c084fc", "#fb923c", "#2dd4bf", "#f472b6", "#a78bfa"
]

ICONS_SET = [
    ("Zap", "Shield", "Activity"),
    ("CheckCircle", "Lock", "Cpu"),
    ("Star", "EyeOff", "HardDrive"),
    ("TrendingUp", "Key", "Server"),
    ("Award", "Briefcase", "Monitor")
]

def generate_hero(prefix, tool_path, gradient, accent, icon1):
    return f"""import React from 'react';
import {{ Box, Typography, Button, Container }} from '@mui/material';
import {{ {icon1} }} from 'lucide-react';
import {{ useLanguage }} from '../../../../../hooks/useLanguage';

export const {prefix}Hero: React.FC<{{ data: any }}> = ({{ data }}) => {{
  const {{ t }} = useLanguage();
  return (
    <Box sx={{{{
      background: '{gradient}',
      color: 'white',
      py: {{ xs: 8, md: 12 }},
      px: 3,
      textAlign: 'center',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden'
    }}}}>
      <Container maxWidth="lg" sx={{{{ position: 'relative', zIndex: 2 }}}}>
        <Box sx={{{{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3, px: 2, py: 0.5, borderRadius: '50px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}}}>
          <{icon1} size={{16}} color="{accent}" />
          <Typography variant="body2" sx={{{{ fontWeight: 600, color: '{accent}' }}}}>
            {{data.bespokeData?.heroTags?.[0] || 'Premium Tool'}}
          </Typography>
        </Box>
        <Typography component="h1" sx={{{{ 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          fontWeight: 900, 
          lineHeight: 1.1,
          mb: 3,
          background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.7))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}}}>
          {{data.h1}}
        </Typography>
        <Typography sx={{{{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'rgba(255,255,255,0.8)', mb: 5, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}}}>
          {{data.description}}
        </Typography>
        <Button variant="contained" size="large" sx={{{{
          background: '{accent}',
          color: '#000',
          fontWeight: 800,
          px: 5,
          py: 2,
          fontSize: '1.2rem',
          borderRadius: '12px',
          textTransform: 'none',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          '&:hover': {{ background: '#fff', transform: 'translateY(-2px)' }},
          transition: 'all 0.2s'
        }}}}>
          Start Converting Now
        </Button>
      </Container>
    </Box>
  );
}};
"""

def generate_benefits(prefix, icon2, align, bg_color):
    is_rev = align == 'reverse'
    
    # We use a CSS grid approach to avoid @mui/material Grid issues
    grid_template = "'1fr' if is_rev else '1fr'" # just placeholder
    # Actually for reverse we can just use flex-direction
    return f"""import React from 'react';
import {{ Box, Typography, Container }} from '@mui/material';
import {{ {icon2} }} from 'lucide-react';

export const {prefix}Benefits: React.FC<{{ data: any }}> = ({{ data }}) => {{
  return (
    <Box sx={{{{ background: '{bg_color}', py: 10, mb: '80px' }}}}>
      <Container maxWidth="lg">
        <Box sx={{{{ 
          display: 'flex', 
          flexDirection: {{ xs: 'column', md: '{'row-reverse' if is_rev else 'row'}' }},
          gap: 8,
          alignItems: 'center'
        }}}}>
          <Box sx={{{{ flex: 1, width: '100%' }}}}>
            <Box sx={{{{ 
              p: 4, 
              background: 'rgba(0,0,0,0.03)', 
              borderRadius: '24px', 
              border: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px'
            }}}}>
              <{icon2} size={{100}} strokeWidth={{1}} color="var(--primary-main)" />
            </Box>
          </Box>
          <Box sx={{{{ flex: 1, width: '100%' }}}}>
            <Typography component="h2" sx={{{{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, mb: 3 }}}}>
              {{data.bespokeData?.benefitsTitle}}
            </Typography>
            <Typography sx={{{{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', mb: 4 }}}}>
              {{data.bespokeData?.benefitsDesc}}
            </Typography>
            <Box sx={{{{ display: 'flex', flexDirection: 'column', gap: 2 }}}}>
              {{data.bespokeData?.benefitsItems?.map((item: string, idx: number) => (
                <Box key={{idx}} sx={{{{ display: 'flex', alignItems: 'center', gap: 2 }}}}>
                  <Box sx={{{{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary-main)' }}}} />
                  <Typography sx={{{{ fontSize: '1.05rem', fontWeight: 600 }}}}>{{item}}</Typography>
                </Box>
              ))}}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}};
"""

def generate_privacy(prefix, icon3, bg_color, accent):
    return f"""import React from 'react';
import {{ Box, Typography, Container }} from '@mui/material';
import {{ {icon3} }} from 'lucide-react';

export const {prefix}Privacy: React.FC<{{ data: any }}> = ({{ data }}) => {{
  return (
    <Box sx={{{{ py: 12, background: '{bg_color}', color: 'white', mb: '80px', borderRadius: '40px', mx: {{ xs: 2, lg: 4 }} }}}}>
      <Container maxWidth="md" sx={{{{ textAlign: 'center' }}}}>
        <Box sx={{{{ 
          width: 80, 
          height: 80, 
          borderRadius: '20px', 
          background: 'rgba(255,255,255,0.1)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          mx: 'auto',
          mb: 4
        }}}}>
          <{icon3} size={{40}} color="{accent}" />
        </Box>
        <Typography component="h2" sx={{{{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, mb: 3 }}}}>
          {{data.bespokeData?.privacyTitle}}
        </Typography>
        <Typography sx={{{{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}}}>
          {{data.bespokeData?.privacyDesc}}
        </Typography>
      </Container>
    </Box>
  );
}};
"""

def generate_performance(prefix, icon4, bg_color):
    return f"""import React from 'react';
import {{ Box, Typography, Container }} from '@mui/material';
import {{ {icon4} }} from 'lucide-react';

export const {prefix}Performance: React.FC<{{ data: any }}> = ({{ data }}) => {{
  return (
    <Box sx={{{{ py: 10, background: '{bg_color}', mb: '80px' }}}}>
      <Container maxWidth="lg">
        <Box sx={{{{ textAlign: 'center', mb: 8 }}}}>
          <Typography component="h2" sx={{{{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, mb: 3 }}}}>
            {{data.bespokeData?.performanceTitle}}
          </Typography>
          <Typography sx={{{{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '700px', mx: 'auto' }}}}>
            {{data.bespokeData?.performanceDesc}}
          </Typography>
        </Box>
        <Box sx={{{{ 
          display: 'grid', 
          gridTemplateColumns: {{ xs: '1fr', md: 'repeat(3, 1fr)' }}, 
          gap: 4 
        }}}}>
          {{data.bespokeData?.performanceItems?.map((item: string, idx: number) => (
            <Box key={{idx}} sx={{{{ 
              p: 4, 
              border: '1px solid rgba(0,0,0,0.1)', 
              borderRadius: '16px',
              background: '#fff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}}}>
              <Box sx={{{{ p: 2, background: 'var(--primary-main)', color: 'white', borderRadius: '12px', mb: 3 }}}}>
                <{icon4} size={{24}} />
              </Box>
              <Typography sx={{{{ fontSize: '1.2rem', fontWeight: 700 }}}}>
                {{item}}
              </Typography>
            </Box>
          ))}}
        </Box>
      </Container>
    </Box>
  );
}};
"""

def generate_index(prefix):
    return f"""export * from './{prefix}Hero';
export * from './{prefix}Benefits';
export * from './{prefix}Privacy';
export * from './{prefix}Performance';
"""

out_dir = "src/components/pseo/short-tail/sections"
os.makedirs(out_dir, exist_ok=True)

registry_imports = []
registry_entries = []

for prefix, path in TOOLS:
    folder = os.path.join(out_dir, prefix)
    os.makedirs(folder, exist_ok=True)
    
    gradient = random.choice(GRADIENTS)
    accent = random.choice(COLORS)
    icons = random.choice(ICONS_SET)
    align = random.choice(['normal', 'reverse'])
    
    b_bg = random.choice(["#ffffff", "#f8fafc", "#ffffff"])
    p_bg = random.choice(["#111827", "#0f172a", "#18181b"])
    perf_bg = random.choice(["#ffffff", "#f1f5f9"])
    
    with open(os.path.join(folder, f"{prefix}Hero.tsx"), "w", encoding="utf-8") as f:
        f.write(generate_hero(prefix, path, gradient, accent, icons[0]))
    with open(os.path.join(folder, f"{prefix}Benefits.tsx"), "w", encoding="utf-8") as f:
        f.write(generate_benefits(prefix, icons[1], align, b_bg))
    with open(os.path.join(folder, f"{prefix}Privacy.tsx"), "w", encoding="utf-8") as f:
        f.write(generate_privacy(prefix, icons[1], p_bg, accent))
    with open(os.path.join(folder, f"{prefix}Performance.tsx"), "w", encoding="utf-8") as f:
        f.write(generate_performance(prefix, icons[2], perf_bg))
    with open(os.path.join(folder, "index.ts"), "w", encoding="utf-8") as f:
        f.write(generate_index(prefix))

print(f"Generated 30 UI component sets in {out_dir}")
