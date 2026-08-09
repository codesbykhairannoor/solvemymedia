import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

// Import all tools
import { CompressVideo } from '../pages/CompressVideo';
import { CompressAudio } from '../pages/CompressAudio';
import { ConvertVideo } from '../pages/ConvertVideo';
import { ConvertAudio } from '../pages/ConvertAudio';
import { ConvertVideoToAudio } from '../pages/ConvertVideoToAudio';
import { TranscribeMedia } from '../pages/TranscribeMedia';
import { StudioRecorder } from '../pages/StudioRecorder';
import { CreateGif } from '../pages/CreateGif';
import { ChangeVideoSpeed } from '../pages/ChangeVideoSpeed';
import { CropVideo } from '../pages/CropVideo';
import { MuteVideo } from '../pages/MuteVideo';
import { WatermarkVideo } from '../pages/WatermarkVideo';
import { MergeAudio } from '../pages/MergeAudio';

const TOOL_COMPONENTS: Record<string, React.FC> = {
  'compress-video': CompressVideo,
  'compress-audio': CompressAudio,
  'convert-video': ConvertVideo,
  'convert-audio': ConvertAudio,
  'video-to-audio': ConvertVideoToAudio,
  'transcribe': TranscribeMedia,
  'recorder': StudioRecorder,
  'create-gif': CreateGif,
  'video-speed': ChangeVideoSpeed,
  'crop-video': CropVideo,
  'mute-video': MuteVideo,
  'watermark-video': WatermarkVideo,
  'merge-audio': MergeAudio
};

export const DynamicToolRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !TOOL_COMPONENTS[slug]) {
    return <Navigate to="/" replace />;
  }

  const Component = TOOL_COMPONENTS[slug];
  return <Component />;
};

