'use client';

import Link from 'next/link';
import {
  Tv,
  Users,
  Trophy,
  TrendingUp,
  Flame,
  Heart,
  Compass,
  Zap,
} from 'lucide-react';

const FEATURES = [
  {
    icon: <Tv className="w-6 h-6" />,
    title: 'Episode Tracking',
    description:
      'Log every episode as you watch. Track your progress across multiple series with a beautiful, intuitive interface.',
    color: '#00F0FF',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Social Community',
    description:
      "Connect with friends, see what they're watching, react to their milestones, and share your journey together.",
    color: '#8B5CF6',
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: 'Achievements & XP',
    description:
      'Earn badges, gain XP, and level up your Otaku Rank from Genin all the way to Anime God.',
    color: '#FFB800',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Leaderboards',
    description:
      "Compete with friends and the global community. See who watches the most and who's climbing the ranks.",
    color: '#39FF14',
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: 'Watch Streaks',
    description:
      'Build daily watching streaks and push yourself to maintain consistency. Your longest streak is your badge of honor.',
    color: '#FF3366',
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: 'Discover Anime',
    description:
      'Explore a curated catalog of anime series. Find your next binge with genre filters and community recommendations.',
    color: '#00F0FF',
  },
];

const TEAM = [
  {
    name: 'Vyom Mehta',
    role: 'Creator & Developer',
    avatar: 'VM',
    color: '#00F0FF',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00F0FF]/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-xs font-medium mb-6">
            <Zap className="w-3 h-3" />
            About WatchCrew
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-4">
            Your Anime Journey,{' '}
            <span className="text-[#00F0FF]">Tracked</span>
          </h1>
          <p className="text-lg text-[#9899A8] max-w-2xl mx-auto leading-relaxed">
            WatchCrew is a social anime tracking platform built for fans who want
            more than just a list. Track episodes, earn achievements, compete on
            leaderboards, and share your progress with friends.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="glass-card p-8 mb-16">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-[#FF3366]" />
            <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wider font-semibold text-[#ECEEF5]">
              Our Mission
            </h2>
          </div>
          <p className="text-[#B0B1C0] leading-relaxed">
            Watching anime is better with friends. We built WatchCrew because we
            wanted a place where tracking your progress felt rewarding — not like
            a chore. Every episode you log earns XP, every milestone unlocks an
            achievement, and every streak you maintain proves your dedication. We
            believe the anime community deserves a platform that&apos;s as fun and
            vibrant as the shows we all love.
          </p>
        </div>

        {/* Features grid */}
        <h2 className="text-2xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-8 text-center">
          What Makes WatchCrew Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 group hover:border-white/[0.08] transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: `${feature.color}15`,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-[#ECEEF5] mb-2 font-[family-name:'Rajdhani'] uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xs text-[#9899A8] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team */}
        <h2 className="text-2xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5] mb-8 text-center">
          Built By
        </h2>
        <div className="flex justify-center mb-16">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="glass-card p-6 text-center w-64"
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold border-2"
                style={{
                  borderColor: member.color,
                  background: `${member.color}20`,
                  color: member.color,
                  boxShadow: `0 0 20px ${member.color}20`,
                }}
              >
                {member.avatar}
              </div>
              <h3 className="text-sm font-semibold text-[#ECEEF5] font-[family-name:'Rajdhani'] uppercase tracking-wide">
                {member.name}
              </h3>
              <p className="text-xs text-[#9899A8] mt-1">{member.role}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[#9899A8] mb-4">Ready to start tracking?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 btn-accent px-6 py-2.5 text-sm font-semibold no-underline"
          >
            <Compass className="w-4 h-4" />
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
