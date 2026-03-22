'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Plus, Minus, Check } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface EpisodeLoggerProps {
  seriesId: string;
  seriesTitle: string;
  currentEpisode: number;
  totalEpisodes: number;
  onLog: (episodeNumber: number) => void;
}

export default function EpisodeLogger({
  seriesId,
  seriesTitle,
  currentEpisode,
  totalEpisodes,
  onLog,
}: EpisodeLoggerProps) {
  const [episode, setEpisode] = useState(currentEpisode);
  const [justLogged, setJustLogged] = useState(false);
  const [popAnimation, setPopAnimation] = useState(false);

  const progress = totalEpisodes > 0 ? (episode / totalEpisodes) * 100 : 0;

  const increment = useCallback(
    (amount: number) => {
      setEpisode((prev) => {
        const next = Math.min(prev + amount, totalEpisodes);
        return next;
      });
      triggerPop();
    },
    [totalEpisodes]
  );

  const decrement = useCallback(() => {
    setEpisode((prev) => Math.max(prev - 1, 0));
  }, []);

  const triggerPop = () => {
    setPopAnimation(true);
    setTimeout(() => setPopAnimation(false), 300);
  };

  const handleLog = () => {
    onLog(episode);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 1500);
  };

  const handleManualInput = (val: string) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= totalEpisodes) {
      setEpisode(num);
    } else if (val === '') {
      setEpisode(0);
    }
  };

  return (
    <div className="glass-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#F0F6FC] truncate pr-2">
          {seriesTitle}
        </h4>
        <span className="text-xs text-[rgba(230,237,243,0.6)] whitespace-nowrap">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Episode counter */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {/* Decrement */}
        <button
          onClick={decrement}
          disabled={episode <= 0}
          aria-label="Decrease episode"
          className="glass-button p-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Episode number input */}
        <div className="flex items-baseline gap-1">
          <input
            type="number"
            value={episode}
            onChange={(e) => handleManualInput(e.target.value)}
            aria-label={`Current episode, ${episode} of ${totalEpisodes}`}
            className={cn(
              'w-16 text-center bg-transparent border-none outline-none',
              'text-2xl font-bold font-[var(--font-display)] text-[#F0F6FC]',
              'transition-transform duration-300',
              popAnimation && 'scale-110'
            )}
            min={0}
            max={totalEpisodes}
          />
          <span className="text-sm text-[rgba(230,237,243,0.55)]">
            / {totalEpisodes}
          </span>
        </div>

        {/* Increment */}
        <button
          onClick={() => increment(1)}
          disabled={episode >= totalEpisodes}
          aria-label="Increase episode"
          className="glass-button p-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Bulk add buttons */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => increment(5)}
          disabled={episode >= totalEpisodes}
          aria-label="Add 5 episodes"
          className="glass-button text-xs py-2.5 px-3 flex-1 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
        >
          +5
        </button>
        <button
          onClick={() => increment(10)}
          disabled={episode >= totalEpisodes}
          aria-label="Add 10 episodes"
          className="glass-button text-xs py-2.5 px-3 flex-1 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
        >
          +10
        </button>
        <button
          onClick={handleLog}
          disabled={episode === currentEpisode}
          className={cn(
            'flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-[var(--radius-md)] text-xs font-semibold transition-all duration-300',
            justLogged
              ? 'bg-[var(--accent-green)]/15 text-[var(--accent-green)] border border-[var(--accent-green)]/40'
              : 'btn-accent disabled:opacity-40 disabled:cursor-not-allowed'
          )}
        >
          {justLogged ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Logged!
            </>
          ) : (
            'Log'
          )}
        </button>
      </div>

      {/* Progress bar */}
      <ProgressBar
        value={episode}
        max={totalEpisodes}
        variant="fire"
        size="sm"
      />
    </div>
  );
}
