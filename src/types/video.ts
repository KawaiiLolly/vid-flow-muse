export interface Video {
  id: string;
  title: string;
  uploader: string;
  uploadDate: string;
  viewCount: number;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  description?: string;
  tags?: string[];
  likes?: number;
  isLiked?: boolean;
  isWatchLater?: boolean;
}

export interface VideoHistory {
  video: Video;
  watchedAt: string;
}