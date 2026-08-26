import { Mp4ToMp3Hero, Mp4ToMp3Benefits, Mp4ToMp3Privacy, Mp4ToMp3Performance } from './sections/Mp4ToMp3';
import { MovToMp4Hero, MovToMp4Benefits, MovToMp4Privacy, MovToMp4Performance } from './sections/MovToMp4';
import { MkvToMp4Hero, MkvToMp4Benefits, MkvToMp4Privacy, MkvToMp4Performance } from './sections/MkvToMp4';
import { WebmToMp4Hero, WebmToMp4Benefits, WebmToMp4Privacy, WebmToMp4Performance } from './sections/WebmToMp4';
import { AviToMp4Hero, AviToMp4Benefits, AviToMp4Privacy, AviToMp4Performance } from './sections/AviToMp4';
import { WavToMp3Hero, WavToMp3Benefits, WavToMp3Privacy, WavToMp3Performance } from './sections/WavToMp3';
import { M4aToMp3Hero, M4aToMp3Benefits, M4aToMp3Privacy, M4aToMp3Performance } from './sections/M4aToMp3';
import { FlacToMp3Hero, FlacToMp3Benefits, FlacToMp3Privacy, FlacToMp3Performance } from './sections/FlacToMp3';
import { OggToMp3Hero, OggToMp3Benefits, OggToMp3Privacy, OggToMp3Performance } from './sections/OggToMp3';
import { CompressMp4Hero, CompressMp4Benefits, CompressMp4Privacy, CompressMp4Performance } from './sections/CompressMp4';

import { CompressMovHero, CompressMovBenefits, CompressMovPrivacy, CompressMovPerformance } from './sections/CompressMov';
import { CompressWebmHero, CompressWebmBenefits, CompressWebmPrivacy, CompressWebmPerformance } from './sections/CompressWebm';
import { Mp4ToGifHero, Mp4ToGifBenefits, Mp4ToGifPrivacy, Mp4ToGifPerformance } from './sections/Mp4ToGif';
import { MovToGifHero, MovToGifBenefits, MovToGifPrivacy, MovToGifPerformance } from './sections/MovToGif';
import { CompressMp3Hero, CompressMp3Benefits, CompressMp3Privacy, CompressMp3Performance } from './sections/CompressMp3';
import { CompressWavHero, CompressWavBenefits, CompressWavPrivacy, CompressWavPerformance } from './sections/CompressWav';
import { TranscribeMp3Hero, TranscribeMp3Benefits, TranscribeMp3Privacy, TranscribeMp3Performance } from './sections/TranscribeMp3';
import { TranscribeMp4Hero, TranscribeMp4Benefits, TranscribeMp4Privacy, TranscribeMp4Performance } from './sections/TranscribeMp4';
import { ScreenRecorderHero, ScreenRecorderBenefits, ScreenRecorderPrivacy, ScreenRecorderPerformance } from './sections/ScreenRecorder';
import { AudioRecorderHero, AudioRecorderBenefits, AudioRecorderPrivacy, AudioRecorderPerformance } from './sections/AudioRecorder';
import { SpeedUpMp4Hero, SpeedUpMp4Benefits, SpeedUpMp4Privacy, SpeedUpMp4Performance } from './sections/SpeedUpMp4';
import { SlowDownMp4Hero, SlowDownMp4Benefits, SlowDownMp4Privacy, SlowDownMp4Performance } from './sections/SlowDownMp4';
import { CropMp4Hero, CropMp4Benefits, CropMp4Privacy, CropMp4Performance } from './sections/CropMp4';
import { ResizeVideoForTiktokHero, ResizeVideoForTiktokBenefits, ResizeVideoForTiktokPrivacy, ResizeVideoForTiktokPerformance } from './sections/ResizeVideoForTiktok';
import { MuteMp4Hero, MuteMp4Benefits, MuteMp4Privacy, MuteMp4Performance } from './sections/MuteMp4';
import { RemoveAudioFromVideoHero, RemoveAudioFromVideoBenefits, RemoveAudioFromVideoPrivacy, RemoveAudioFromVideoPerformance } from './sections/RemoveAudioFromVideo';
import { AddWatermarkToMp4Hero, AddWatermarkToMp4Benefits, AddWatermarkToMp4Privacy, AddWatermarkToMp4Performance } from './sections/AddWatermarkToMp4';
import { JoinAudioFilesHero, JoinAudioFilesBenefits, JoinAudioFilesPrivacy, JoinAudioFilesPerformance } from './sections/JoinAudioFiles';
import { MergeMp3Hero, MergeMp3Benefits, MergeMp3Privacy, MergeMp3Performance } from './sections/MergeMp3';
import { Mp4ToWavHero, Mp4ToWavBenefits, Mp4ToWavPrivacy, Mp4ToWavPerformance } from './sections/Mp4ToWav';

export const SHORT_TAIL_REGISTRY: Record<string, { sections: any[] }> = {
  '/mp4-to-mp3': { sections: [Mp4ToMp3Hero, Mp4ToMp3Benefits, Mp4ToMp3Privacy, Mp4ToMp3Performance] },
  '/mov-to-mp4': { sections: [MovToMp4Hero, MovToMp4Benefits, MovToMp4Privacy, MovToMp4Performance] },
  '/mkv-to-mp4': { sections: [MkvToMp4Hero, MkvToMp4Benefits, MkvToMp4Privacy, MkvToMp4Performance] },
  '/webm-to-mp4': { sections: [WebmToMp4Hero, WebmToMp4Benefits, WebmToMp4Privacy, WebmToMp4Performance] },
  '/avi-to-mp4': { sections: [AviToMp4Hero, AviToMp4Benefits, AviToMp4Privacy, AviToMp4Performance] },
  '/wav-to-mp3': { sections: [WavToMp3Hero, WavToMp3Benefits, WavToMp3Privacy, WavToMp3Performance] },
  '/m4a-to-mp3': { sections: [M4aToMp3Hero, M4aToMp3Benefits, M4aToMp3Privacy, M4aToMp3Performance] },
  '/flac-to-mp3': { sections: [FlacToMp3Hero, FlacToMp3Benefits, FlacToMp3Privacy, FlacToMp3Performance] },
  '/ogg-to-mp3': { sections: [OggToMp3Hero, OggToMp3Benefits, OggToMp3Privacy, OggToMp3Performance] },
  '/compress-mp4': { sections: [CompressMp4Hero, CompressMp4Benefits, CompressMp4Privacy, CompressMp4Performance] },
  '/compress-mov': { sections: [CompressMovHero, CompressMovBenefits, CompressMovPrivacy, CompressMovPerformance] },
  '/compress-webm': { sections: [CompressWebmHero, CompressWebmBenefits, CompressWebmPrivacy, CompressWebmPerformance] },
  '/mp4-to-gif': { sections: [Mp4ToGifHero, Mp4ToGifBenefits, Mp4ToGifPrivacy, Mp4ToGifPerformance] },
  '/mov-to-gif': { sections: [MovToGifHero, MovToGifBenefits, MovToGifPrivacy, MovToGifPerformance] },
  '/compress-mp3': { sections: [CompressMp3Hero, CompressMp3Benefits, CompressMp3Privacy, CompressMp3Performance] },
  '/compress-wav': { sections: [CompressWavHero, CompressWavBenefits, CompressWavPrivacy, CompressWavPerformance] },
  '/transcribe-mp3': { sections: [TranscribeMp3Hero, TranscribeMp3Benefits, TranscribeMp3Privacy, TranscribeMp3Performance] },
  '/transcribe-mp4': { sections: [TranscribeMp4Hero, TranscribeMp4Benefits, TranscribeMp4Privacy, TranscribeMp4Performance] },
  '/screen-recorder': { sections: [ScreenRecorderHero, ScreenRecorderBenefits, ScreenRecorderPrivacy, ScreenRecorderPerformance] },
  '/audio-recorder': { sections: [AudioRecorderHero, AudioRecorderBenefits, AudioRecorderPrivacy, AudioRecorderPerformance] },
  '/speed-up-mp4': { sections: [SpeedUpMp4Hero, SpeedUpMp4Benefits, SpeedUpMp4Privacy, SpeedUpMp4Performance] },
  '/slow-down-mp4': { sections: [SlowDownMp4Hero, SlowDownMp4Benefits, SlowDownMp4Privacy, SlowDownMp4Performance] },
  '/crop-mp4': { sections: [CropMp4Hero, CropMp4Benefits, CropMp4Privacy, CropMp4Performance] },
  '/resize-video-for-tiktok': { sections: [ResizeVideoForTiktokHero, ResizeVideoForTiktokBenefits, ResizeVideoForTiktokPrivacy, ResizeVideoForTiktokPerformance] },
  '/mute-mp4': { sections: [MuteMp4Hero, MuteMp4Benefits, MuteMp4Privacy, MuteMp4Performance] },
  '/remove-audio-from-video': { sections: [RemoveAudioFromVideoHero, RemoveAudioFromVideoBenefits, RemoveAudioFromVideoPrivacy, RemoveAudioFromVideoPerformance] },
  '/add-watermark-to-mp4': { sections: [AddWatermarkToMp4Hero, AddWatermarkToMp4Benefits, AddWatermarkToMp4Privacy, AddWatermarkToMp4Performance] },
  '/join-audio-files': { sections: [JoinAudioFilesHero, JoinAudioFilesBenefits, JoinAudioFilesPrivacy, JoinAudioFilesPerformance] },
  '/merge-mp3': { sections: [MergeMp3Hero, MergeMp3Benefits, MergeMp3Privacy, MergeMp3Performance] },
  '/mp4-to-wav': { sections: [Mp4ToWavHero, Mp4ToWavBenefits, Mp4ToWavPrivacy, Mp4ToWavPerformance] }
};
