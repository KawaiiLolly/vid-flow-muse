import React from 'react';
import { Video } from '../types/video';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
  currentVideoId?: string;
}

export const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  onVideoSelect,
  currentVideoId,
}) => {
  // Filter out the currently playing video
  const gridVideos = videos.filter(video => video.id !== currentVideoId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-max">
      {gridVideos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() => onVideoSelect(video)}
        />
      ))}
    </div>
  );
};