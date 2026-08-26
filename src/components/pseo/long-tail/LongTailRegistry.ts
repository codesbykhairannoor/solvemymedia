// @ts-nocheck
/**
 * LongTailRegistry — maps each long-tail path to its bespoke section components.
 * Each entry is an ordered array of React FC keys to render for that path.
 */

import {
  EmailCompressHero,
  EmailCompressHowTo,
  EmailCompressBenefits,
  EmailCompressPrivacy,
  EmailCompressPerformance,
} from './sections/EmailCompress';

import {
  WhatsappCompressHero,
  WhatsappCompressHowTo,
  WhatsappCompressBenefits,
  WhatsappCompressPrivacy,
  WhatsappCompressPerformance,
} from './sections/WhatsappCompress';

import {
  MovToMp4Hero,
  MovToMp4HowTo,
  MovToMp4Benefits,
  MovToMp4Privacy,
  MovToMp4Performance,
} from './sections/MovToMp4';

import {
  PodcastExtractHero,
  PodcastExtractHowTo,
  PodcastExtractBenefits,
  PodcastExtractPrivacy,
  PodcastExtractPerformance,
} from './sections/PodcastExtract';

import {
  LosslessCompressHero,
  LosslessCompressHowTo,
  LosslessCompressBenefits,
  LosslessCompressPrivacy,
  LosslessCompressPerformance,
} from './sections/LosslessCompress';

import {
  MuteVideoHero,
  MuteVideoHowTo,
  MuteVideoBenefits,
  MuteVideoPrivacy,
  MuteVideoPerformance,
} from './sections/MuteVideoSection';

import {
  TiktokSpeedHero,
  TiktokSpeedHowTo,
  TiktokSpeedBenefits,
  TiktokSpeedPrivacy,
  TiktokSpeedPerformance,
} from './sections/TiktokSpeed';

import {
  InstagramCropHero,
  InstagramCropHowTo,
  InstagramCropBenefits,
  InstagramCropPrivacy,
  InstagramCropPerformance,
} from './sections/InstagramCrop';

import {
  MergeVoiceMemosHero,
  MergeVoiceMemosHowTo,
  MergeVoiceMemosBenefits,
  MergeVoiceMemosPrivacy,
  MergeVoiceMemosPerformance,
} from './sections/MergeVoiceMemos';

import {
  ZoomTranscribeHero,
  ZoomTranscribeHowTo,
  ZoomTranscribeBenefits,
  ZoomTranscribePrivacy,
  ZoomTranscribePerformance,
} from './sections/ZoomTranscribe';

export type SectionFC = React.FC<{ data: any }>;

export interface LongTailEntry {
  sections: SectionFC[];
}

export const LONG_TAIL_REGISTRY: Record<string, LongTailEntry> = {
  '/reduce-mp4-video-size-for-email': {
    sections: [
      EmailCompressHero,
      EmailCompressHowTo,
      EmailCompressBenefits,
      EmailCompressPrivacy,
      EmailCompressPerformance,
    ],
  },
  '/compress-large-video-for-whatsapp': {
    sections: [
      WhatsappCompressHero,
      WhatsappCompressHowTo,
      WhatsappCompressBenefits,
      WhatsappCompressPrivacy,
      WhatsappCompressPerformance,
    ],
  },
  '/convert-mov-to-mp4-for-android': {
    sections: [
      MovToMp4Hero,
      MovToMp4HowTo,
      MovToMp4Benefits,
      MovToMp4Privacy,
      MovToMp4Performance,
    ],
  },
  '/extract-audio-from-video-for-podcast': {
    sections: [
      PodcastExtractHero,
      PodcastExtractHowTo,
      PodcastExtractBenefits,
      PodcastExtractPrivacy,
      PodcastExtractPerformance,
    ],
  },
  '/make-video-smaller-without-losing-quality': {
    sections: [
      LosslessCompressHero,
      LosslessCompressHowTo,
      LosslessCompressBenefits,
      LosslessCompressPrivacy,
      LosslessCompressPerformance,
    ],
  },
  '/remove-sound-from-video-completely': {
    sections: [
      MuteVideoHero,
      MuteVideoHowTo,
      MuteVideoBenefits,
      MuteVideoPrivacy,
      MuteVideoPerformance,
    ],
  },
  '/speed-up-video-for-tiktok': {
    sections: [
      TiktokSpeedHero,
      TiktokSpeedHowTo,
      TiktokSpeedBenefits,
      TiktokSpeedPrivacy,
      TiktokSpeedPerformance,
    ],
  },
  '/crop-video-for-instagram-story': {
    sections: [
      InstagramCropHero,
      InstagramCropHowTo,
      InstagramCropBenefits,
      InstagramCropPrivacy,
      InstagramCropPerformance,
    ],
  },
  '/combine-multiple-voice-memos-into-one': {
    sections: [
      MergeVoiceMemosHero,
      MergeVoiceMemosHowTo,
      MergeVoiceMemosBenefits,
      MergeVoiceMemosPrivacy,
      MergeVoiceMemosPerformance,
    ],
  },
  '/transcribe-zoom-meeting-recording-to-text': {
    sections: [
      ZoomTranscribeHero,
      ZoomTranscribeHowTo,
      ZoomTranscribeBenefits,
      ZoomTranscribePrivacy,
      ZoomTranscribePerformance,
    ],
  },
};
