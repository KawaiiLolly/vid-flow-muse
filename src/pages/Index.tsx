import React, { useState, useMemo } from 'react';
import { Video } from '../types/video';
import { sampleVideos } from '../data/sampleVideos';
import { useVideoHistory } from '../hooks/useVideoHistory';
import { VideoPlayer } from '../components/VideoPlayer';
import { VideoGrid } from '../components/VideoGrid';
import { SearchBar } from '../components/SearchBar';
import { HistoryDrawer } from '../components/HistoryDrawer';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Play, Grid3X3, Menu, ArrowLeft } from 'lucide-react';

const Index = () => {
  const [videos, setVideos] = useState<Video[]>(sampleVideos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [previousVideo, setPreviousVideo] = useState<Video | null>(null);
  const { history, addToHistory, removeFromHistory, clearHistory } = useVideoHistory();

  // Filter videos based on search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    
    return videos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.uploader.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [videos, searchQuery]);

  const handleVideoSelect = (video: Video) => {
    setPreviousVideo(selectedVideo);
    setSelectedVideo(video);
    addToHistory(video);
  };

  const handleBack = () => {
    if (previousVideo) {
      setSelectedVideo(previousVideo);
      setPreviousVideo(null);
    } else {
      setSelectedVideo(null);
    }
  };

  const handleToggleLike = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { 
            ...video, 
            isLiked: !video.isLiked,
            likes: video.isLiked ? (video.likes || 0) - 1 : (video.likes || 0) + 1
          }
        : video
    ));
  };

  const handleToggleWatchLater = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, isWatchLater: !video.isWatchLater }
        : video
    ));
  };

  const handleHomeNavigation = () => {
    setSelectedVideo(null);
    setPreviousVideo(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleHomeNavigation}
                className="p-2"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="bg-hero-gradient rounded-lg p-2 cursor-pointer" onClick={handleHomeNavigation}>
                <Play className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-accent-gradient bg-clip-text text-transparent">
                VideoStream
              </h1>
            </div>
            
            
            {selectedVideo && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            
            <div className="flex items-center gap-4">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search videos..."
              />
              <HistoryDrawer
                history={history}
                onVideoSelect={handleVideoSelect}
                onRemoveFromHistory={removeFromHistory}
                onClearHistory={clearHistory}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {selectedVideo ? (
          /* Hero Video Player */
          <div className="mb-8">
            <VideoPlayer
              video={selectedVideo}
              onBack={handleBack}
              onToggleLike={handleToggleLike}
              onToggleWatchLater={handleToggleWatchLater}
            />
          </div>
        ) : (
          /* Welcome Hero Section */
          <Card className="bg-hero-gradient p-8 mb-8 text-center text-white shadow-hero">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-4">
                Discover Amazing Videos
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Your personal video gallery with a Pinterest-style layout
              </p>
              <div className="flex items-center justify-center gap-2 text-white/80">
                <Grid3X3 className="h-5 w-5" />
                <span>{filteredVideos.length} videos available</span>
              </div>
            </div>
          </Card>
        )}

        {/* Video Grid */}
        {filteredVideos.length > 0 ? (
          <VideoGrid
            videos={filteredVideos}
            onVideoSelect={handleVideoSelect}
            currentVideoId={selectedVideo?.id}
          />
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-lg">
              No videos found matching "{searchQuery}"
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
              className="mt-4"
            >
              Clear Search
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
