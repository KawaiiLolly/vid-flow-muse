import React from 'react';
import { VideoHistory } from '../types/video';
import { VideoCard } from './VideoCard';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { History, Trash2, X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface HistoryDrawerProps {
  history: VideoHistory[];
  onVideoSelect: (video: any) => void;
  onRemoveFromHistory: (videoId: string) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onVideoSelect,
  onRemoveFromHistory,
  onClearHistory,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <History className="h-4 w-4" />
          History ({history.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96 bg-card border-border">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-foreground">Watch History</SheetTitle>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearHistory}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <History className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No videos in your history yet</p>
          </div>
        ) : (
          <ScrollArea className="h-full mt-6">
            <div className="space-y-4">
              {history.map((item) => (
                <div key={`${item.video.id}-${item.watchedAt}`} className="relative group">
                  <VideoCard
                    video={item.video}
                    onClick={() => onVideoSelect(item.video)}
                    isHistory
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromHistory(item.video.id);
                    }}
                    className="absolute top-2 left-2 bg-black/50 text-white hover:bg-red-500/80 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <div className="text-xs text-muted-foreground mt-1">
                    Watched {new Date(item.watchedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
};