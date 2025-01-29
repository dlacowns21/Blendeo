// src/types/video.d.ts

export interface VideoSettings {
  forkedVolume: number;
  recordedVolume: number;
}

export interface VideoMetadata {
  id: string;
  title: string;
  description: string;
  url: string;
}
