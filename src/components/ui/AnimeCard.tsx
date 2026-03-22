'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, CheckCircle, Pause, XCircle, BookOpen } from 'lucide-react';
import type { AnimeSeries, UserProgress, WatchStatus } from '@/types';
import ProgressBar from './ProgressBar';
import Badge from './Badge';

interface AnimeCardProps {
  series: AnimeSeries;
  progress?: UserProgress;
  onClick?: () => void;
}

// Poster images that need custom positioning (portrait posters cropped into landscape cards)
const POSTER_POSITION: Record<string, string> = {
  'one-piece': 'object-center',
  'naruto': 'object-center',
  'naruto-shippuden': 'object-center',
  'bleach': 'object-center',
  'black-clover': 'object-center',
  'attack-on-titan': 'object-center',
};

const statusConfig: Record<WatchStatus, { label: string; variant: 'orange' | 'green' | 'blue' | 'gold' | 'purple' | 'red'; icon: React.ReactNode }> = {
  watching: { label: 'Watching', variant: 'orange', icon: <Play className="w-3 h-3" /> },
  completed: { label: 'Completed', variant: 'green', icon: <CheckCircle className="w-3 h-3" /> },
  on_hold: { label: 'On Hold', variant: 'gold', icon: <Pause className="w-3 h-3" /> },
  dropped: { label: 'Dropped', variant: 'red', icon: <XCircle className="w-3 h-3" /> },
  plan_to_watch: { label: 'Plan to Watch', variant: 'blue', icon: <BookOpen className="w-3 h-3" /> },
};

export default function AnimeCard({ series, progress, onClick }: AnimeCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const watchStatus = progress?.watchStatus;
  const status = watchStatus ? statusConfig[watchStatus] : null;
  const episodeProgress = progress ? progress.currentEpisode : 0;
  const progressPercent = series.totalEpisodes > 0
    ? (episodeProgress / series.totalEpisodes) * 100
    : 0;

  const hasPoster = series.posterUrl && !imgError;

  return (
    <div
      className={cn('glass-card-hover group cursor-pointer overflow-hidden', onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      {/* Poster / thumbnail area */}
      <div className="relative h-48 bg-[#10101C] overflow-hidden">
        {/* Real poster image */}
        {hasPoster && (
          <img
            src={series.posterUrl}
            alt={series.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={cn(
              'absolute inset-0 w-full h-full object-cover',
              POSTER_POSITION[series.id] || 'object-top',
              imgLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}

        {/* Fallback initial (shows while loading or on error) */}
        {(!hasPoster || !imgLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#00F0FF]/8 to-[#10101C]">
            <span className="text-5xl font-bold text-white/10 font-[family-name:'Rajdhani'] uppercase select-none">
              {series.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060B] via-[#06060B]/30 to-transparent opacity-80" />

        {/* Status badge */}
        {status && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <Badge text={status.label} variant={status.variant} size="sm" icon={status.icon} />
          </div>
        )}

        {/* Airing/Completed badge */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <Badge
            text={series.status === 'airing' ? 'Airing' : 'Completed'}
            variant={series.status === 'airing' ? 'green' : 'blue'}
            size="sm"
          />
        </div>
      </div>

      {/* Info section */}
      <div className="p-3.5">
        <h4 className="text-sm font-semibold text-[#ECEEF5] truncate mb-1 group-hover:text-[#00F0FF] transition-colors">
          {series.title}
        </h4>
        <p className="text-xs text-[#9899A8] mb-2.5">
          {series.totalEpisodes} episodes
          {series.genre.length > 0 && ` \u00B7 ${series.genre.slice(0, 2).join(', ')}`}
        </p>

        {progress && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#9899A8]">
                EP {episodeProgress} / {series.totalEpisodes}
              </span>
              <span className="text-xs font-medium text-[#B0B1C0]">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <ProgressBar
              value={episodeProgress}
              max={series.totalEpisodes}
              variant={watchStatus === 'completed' ? 'gold' : 'fire'}
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
