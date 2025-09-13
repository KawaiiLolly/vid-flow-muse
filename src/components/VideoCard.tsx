import React, { useState } from 'react';
import { Video } from '../types/video';
import { Card, CardContent } from './ui/card';
import { Play, Heart, Clock } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  isHistory?: boolean;
  onRemove?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onClick,
  isHistory = false,
  onRemove,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className="bg-card-gradient border-border shadow-card hover:shadow-glow-primary transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        {!imageError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Play className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Play className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>

        {/* Like & Watch Later Indicators */}
        <div className="absolute top-2 right-2 flex gap-1">
          {video.isLiked && (
            <div className="bg-red-500/80 backdrop-blur-sm rounded-full p-1">
              <Heart className="h-3 w-3 text-white fill-current" />
            </div>
          )}
          {video.isWatchLater && (
            <div className="bg-yellow-500/80 backdrop-blur-sm rounded-full p-1">
              <Clock className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-3">
        <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
      </CardContent>
    </Card>
  );
};