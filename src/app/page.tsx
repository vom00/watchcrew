'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Trophy,
  Users,
  ArrowRight,
  Flame,
  Star,
  Zap,
  TrendingUp,
  Target,
  Shield,
} from 'lucide-react';
import { useUserStore } from '@/lib/stores';
import { animeDatabase } from '@/data/anime';
import AnimeCard from '@/components/ui/AnimeCard';

// =============================================================================
// Landing Page — Neon Shrine aesthetic
// =============================================================================

function NeonGrid() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,.2) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Cyan orb — top */}
      <div
        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00F0FF]/[0.04] blur-[120px]"
        style={{ animation: 'glow-pulse 6s ease-in-out infinite' }}
      />
      {/* Violet orb — right */}
      <div
        className="absolute top-1/3 -right-20 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/[0.04] blur-[100px]"
        style={{ animation: 'glow-pulse 8s ease-in-out infinite 2s' }}
      />
      {/* Coral orb — bottom */}
      <div
        className="absolute -bottom-40 left-1/2 w-[450px] h-[450px] rounded-full bg-[#FF3366]/[0.03] blur-[110px]"
        style={{ animation: 'glow-pulse 7s ease-in-out infinite 4s' }}
      />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

function FeatureCard({ icon, title, description, accentColor }: FeatureCardProps) {
  return (
    <div className="glass-card-hover p-6 group">
      <div
        className="w-10 h-10 rounded flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
      >
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[#ECEEF5] mb-1.5 font-[family-name:'Rajdhani'] uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-sm text-[#9899A8] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface StepItemProps {
  number: number;
  title: string;
  subtitle: string;
}

function StepItem({ number, title, subtitle }: StepItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded flex items-center justify-center text-lg font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/20 shadow-[0_0_24px_rgba(0,240,255,0.1)] mb-3 font-[family-name:'Rajdhani']">
        {number}
      </div>
      <p className="text-sm font-semibold text-[#ECEEF5] mb-0.5 font-[family-name:'Rajdhani'] uppercase tracking-wide">{title}</p>
      <p className="text-xs text-[rgba(200,202,216,0.5)] max-w-[160px]">{subtitle}</p>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) return null;

  const featuredAnime = animeDatabase.slice(0, 8);

  return (
    <div className="min-h-screen relative">
      <NeonGrid />

      {/* HERO */}
      <section className="relative px-4 pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00F0FF]/[0.06] border border-[#00F0FF]/10 mb-6">
            <Zap className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-xs font-medium text-[rgba(200,202,216,0.7)] tracking-wider uppercase">
              Social Anime Tracker
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#ECEEF5] leading-[1.05] mb-5 font-[family-name:'Rajdhani'] tracking-wider uppercase">
            Your Anime Journey,{' '}
            <span className="gradient-text">Quantified</span>
          </h1>

          <p className="text-base md:text-lg text-[#9899A8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Track every episode, earn XP, unlock achievements, and climb the
            ranks from Genin to Anime God. Your watch history, gamified.
          </p>

          <button
            onClick={() => router.push('/login')}
            className="btn-accent px-8 py-3 text-sm font-semibold rounded inline-flex items-center gap-2.5 group shadow-[0_0_30px_rgba(0,240,255,0.2)]"
          >
            Start Tracking
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#ECEEF5] mb-3 font-[family-name:'Rajdhani'] uppercase tracking-wider">
              Everything You Need
            </h2>
            <p className="text-sm text-[rgba(200,202,216,0.5)] max-w-lg mx-auto">
              The ultimate toolkit for serious anime fans
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              icon={<BookOpen className="w-5 h-5 text-[#00F0FF]" />}
              title="Track Everything"
              description="Episode-by-episode progress with arc awareness. Never lose your place in a 1000+ episode series."
              accentColor="#00F0FF"
            />
            <FeatureCard
              icon={<Trophy className="w-5 h-5 text-[#FFB800]" />}
              title="Level Up"
              description="Earn XP for every episode. Unlock achievements and climb from Genin to Anime God."
              accentColor="#FFB800"
            />
            <FeatureCard
              icon={<Users className="w-5 h-5 text-[#8B5CF6]" />}
              title="Social & Compete"
              description="Add friends, track activity, climb leaderboards, and compete for the top rank."
              accentColor="#8B5CF6"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#ECEEF5] text-center mb-12 font-[family-name:'Rajdhani'] uppercase tracking-wider">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />
            <StepItem number={1} title="Pick Your Anime" subtitle="Browse the catalog and add series to your library" />
            <StepItem number={2} title="Log Episodes" subtitle="Track progress and earn XP with every episode" />
            <StepItem number={3} title="Earn Rewards" subtitle="Unlock achievements, badges, and climb the ranks" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-16 left-1/4 w-32 h-32 rounded-full bg-[#00F0FF]/[0.04] blur-[60px]" />
            <div className="absolute -bottom-16 right-1/4 w-32 h-32 rounded-full bg-[#FF3366]/[0.04] blur-[60px]" />
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '50K+', label: 'Episodes Tracked' },
                { value: '10K+', label: 'Achievements' },
                { value: '8K+', label: 'Active Streaks' },
                { value: '2.5M', label: 'Hours Watched' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold gradient-text font-[family-name:'Rajdhani'] tracking-wider">{value}</p>
                  <p className="text-xs text-[rgba(200,202,216,0.45)] mt-1 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR SERIES */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#ECEEF5] mb-3 font-[family-name:'Rajdhani'] uppercase tracking-wider">
              Popular Series
            </h2>
            <p className="text-sm text-[rgba(200,202,216,0.5)]">
              Start tracking your favorite anime today
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {featuredAnime.map((series) => (
              <AnimeCard key={series.id} series={series} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-10 md:p-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#00F0FF]/[0.05] blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-[#8B5CF6]/[0.05] blur-[80px]" />
            <div className="relative z-10">
              <Shield className="w-10 h-10 text-[#00F0FF] mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#ECEEF5] mb-3 font-[family-name:'Rajdhani'] uppercase tracking-wider leading-tight">
                Ready to Begin?
              </h2>
              <p className="text-sm text-[rgba(200,202,216,0.45)] mb-8 max-w-md mx-auto leading-relaxed">
                Join thousands of anime fans tracking their progress,
                earning achievements, and competing on leaderboards.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="btn-accent px-8 py-3 text-sm font-semibold rounded inline-flex items-center gap-2.5 group shadow-[0_0_30px_rgba(0,240,255,0.2)]"
              >
                Sign Up Free
                <Star className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
