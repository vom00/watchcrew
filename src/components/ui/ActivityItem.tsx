'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { timeAgo } from '@/lib/utils';
import {
  MessageCircle,
  Play,
  Trophy,
  Award,
  Clapperboard,
  Star,
  Sparkles,
  Heart,
  Flame,
  ThumbsUp,
  Eye,
  Check,
  type LucideIcon,
} from 'lucide-react';
import type { ActivityFeedItem } from '@/types';
import Avatar from './Avatar';

interface ActivityItemProps {
  item: ActivityFeedItem;
  onReact?: (feedItemId: string, emoji: string) => void;
  onComment?: (feedItemId: string, text: string) => void;
}

const REACTION_ICONS: { key: string; icon: LucideIcon }[] = [
  { key: 'heart', icon: Heart },
  { key: 'flame', icon: Flame },
  { key: 'thumbsup', icon: ThumbsUp },
  { key: 'eye', icon: Eye },
  { key: 'check', icon: Check },
];

function getActivityDescription(item: ActivityFeedItem): string {
  const payload = item.payload;
  switch (item.type) {
    case 'episode_logged':
      return `watched episode ${payload.episodeNumber ?? ''} of ${payload.seriesTitle ?? 'a series'}`;
    case 'series_completed':
      return `completed ${payload.seriesTitle ?? 'a series'}!`;
    case 'badge_earned':
      return `earned the "${payload.achievementName ?? 'Achievement'}" badge`;
    case 'series_started':
      return `started watching ${payload.seriesTitle ?? 'a series'}`;
    case 'milestone_reached':
      return `reached a milestone: ${payload.milestone ?? ''}`;
    default:
      return 'did something awesome';
  }
}

function getActivityIcon(type: ActivityFeedItem['type']): LucideIcon {
  switch (type) {
    case 'episode_logged': return Play;
    case 'series_completed': return Trophy;
    case 'badge_earned': return Award;
    case 'series_started': return Clapperboard;
    case 'milestone_reached': return Star;
    default: return Sparkles;
  }
}

export default function ActivityItem({
  item,
  onReact,
  onComment,
}: ActivityItemProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [reactions, setReactions] = useState<Record<string, number>>({});

  const handleReact = (emoji: string) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
    onReact?.(item.id, emoji);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    onComment?.(item.id, commentText.trim());
    setCommentText('');
  };

  return (
    <div className="glass-card p-4">
      <div className="flex gap-3">
        {/* Avatar */}
        <Avatar
          src={item.userAvatar}
          username={item.username}
          size="md"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-[#ECEEF5]">
              <span className="font-semibold text-[#ECEEF5]">
                {item.username}
              </span>{' '}
              <span className="text-[rgba(200,202,216,0.6)]">
                {getActivityDescription(item)}
              </span>{' '}
              {(() => { const ActivityIcon = getActivityIcon(item.type); return <ActivityIcon className="w-4 h-4 inline-block" />; })()}
            </p>
          </div>

          <p className="text-xs text-[rgba(200,202,216,0.5)] mt-1">
            {timeAgo(item.createdAt)}
          </p>

          {/* Reaction bar */}
          <div className="flex items-center gap-1 mt-3">
            {REACTION_ICONS.map(({ key, icon: ReactionIcon }) => (
              <button
                key={key}
                onClick={() => handleReact(key)}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all duration-200',
                  'hover:bg-[var(--glass-medium)] hover:scale-110',
                  'active:scale-95',
                  reactions[key]
                    ? 'bg-[var(--glass-medium)] border border-[var(--glass-border-hover)]'
                    : 'bg-transparent'
                )}
              >
                <ReactionIcon className="w-4 h-4" />
                {reactions[key] && reactions[key] > 0 && (
                  <span className="text-xs text-[rgba(200,202,216,0.6)]">
                    {reactions[key]}
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => setShowComments(!showComments)}
              className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full text-xs text-[rgba(200,202,216,0.4)] hover:text-[rgba(200,202,216,0.7)] hover:bg-[var(--glass-light)] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>
          </div>

          {/* Comment section */}
          {showComments && (
            <div className="mt-3 pt-3 border-t border-[var(--glass-border)]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
                  placeholder="Write a comment..."
                  className="glass-input flex-1 text-xs py-1.5 px-3"
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="glass-button text-xs py-1.5 px-3 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
