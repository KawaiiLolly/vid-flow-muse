import { useState, useEffect } from 'react';
import { Video, VideoHistory } from '../types/video';

const HISTORY_KEY = 'video-gallery-history';
const MAX_HISTORY_ITEMS = 15;

export const useVideoHistory = () => {
  const [history, setHistory] = useState<VideoHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (video: Video) => {
    const newHistoryItem: VideoHistory = {
      video,
      watchedAt: new Date().toISOString(),
    };

    setHistory(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.video.id !== video.id);
      // Add to beginning
      const newHistory = [newHistoryItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeFromHistory = (videoId: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.video.id !== videoId);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
      return filtered;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
};