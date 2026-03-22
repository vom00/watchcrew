'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Trophy,
  BookOpen,
  Compass,
  BarChart3,
  Award,
  Users,
  User,
  LogIn,
  Settings,
} from 'lucide-react';
import type { User as UserType } from '@/types';
import { getOtakuRank } from '@/types';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/library', label: 'Library', icon: BookOpen },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/achievements', label: 'Achievements', icon: Award },
] as const;

interface NavbarProps {
  user: UserType | null;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const rank = user ? getOtakuRank(user.level) : null;

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.04] bg-[#06060B]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 no-underline group">
          <img
            src="/images/straw-hat-logo.png"
            alt="WatchCrew Logo"
            className="w-12 h-12 object-contain drop-shadow-[0_0_6px_rgba(0,240,255,0.3)]"
          />
          <span className="text-lg font-bold font-[family-name:'Rajdhani'] tracking-wider uppercase text-[#ECEEF5] group-hover:text-[#00F0FF] transition-colors">
            WatchCrew
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || pathname?.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded transition-all duration-200 no-underline ${
                  isActive
                    ? 'text-[#00F0FF]'
                    : 'text-[#9899A8] hover:text-[rgba(200,202,216,0.9)] hover:bg-white/[0.03]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-[family-name:'Outfit']">{label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                href={`/profile/${user.username}`}
                className="flex items-center gap-2.5 rounded px-2.5 py-1 transition-colors hover:bg-white/[0.03] no-underline"
              >
                <div
                  className="relative h-7 w-7 rounded-full p-[1.5px] flex-shrink-0"
                  style={{
                    background: user.accentColor
                      ? `linear-gradient(135deg, ${user.accentColor}, ${user.accentColor}88)`
                      : '#00F0FF',
                  }}
                >
                  <div className="h-full w-full rounded-full overflow-hidden bg-[#0C0C14]">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.displayName} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User className="h-3.5 w-3.5 text-[rgba(200,202,216,0.5)]" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-[#ECEEF5]">{user.displayName}</span>
                  <span className="badge badge-cyan text-xs px-1.5 py-0">Lv.{user.level}</span>
                </div>
              </Link>
              <Link
                href="/settings"
                className="flex items-center justify-center h-11 w-11 rounded text-[#9899A8] hover:text-[#00F0FF] hover:bg-white/[0.04] transition-colors no-underline"
                title="Settings"
                aria-label="Settings"
              >
                <Settings className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="btn-accent inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold rounded no-underline"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center h-11 w-11 rounded text-[rgba(200,202,216,0.7)] hover:text-[#00F0FF] hover:bg-white/[0.04] transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </header>

    {/* Mobile overlay — rendered outside <header> to escape its stacking context */}
    {mobileOpen && (
      <>
        <div className="fixed inset-0 z-[9998] md:hidden" style={{ backgroundColor: 'rgba(6, 6, 11, 0.95)', backdropFilter: 'blur(8px)' }} onClick={() => setMobileOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-[9999] w-72 md:hidden p-5 border-l border-white/[0.08] shadow-[-8px_0_30px_rgba(0,0,0,0.8)]" style={{ backgroundColor: '#06060B' }}>
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-3 right-3 h-11 w-11 flex items-center justify-center rounded text-[#9899A8] hover:text-[#00F0FF] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>

          {user && (
            <Link
              href={`/profile/${user.username}`}
              onClick={() => setMobileOpen(false)}
              className="block mb-5 pb-5 border-b border-white/[0.04] no-underline group/profile"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-9 w-9 rounded-full p-[1.5px] flex-shrink-0"
                  style={{
                    background: user.accentColor
                      ? `linear-gradient(135deg, ${user.accentColor}, ${user.accentColor}88)`
                      : '#00F0FF',
                  }}
                >
                  <div className="h-full w-full rounded-full overflow-hidden bg-[#0C0C14]">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.displayName} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User className="h-4 w-4 text-[rgba(200,202,216,0.5)]" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#ECEEF5] group-hover/profile:text-[#00F0FF] transition-colors">{user.displayName}</p>
                  <p className="text-xs text-[rgba(200,202,216,0.5)]">{rank?.name} · Lv.{user.level}</p>
                </div>
              </div>
            </Link>
          )}

          <nav aria-label="Mobile navigation" className="flex flex-col gap-0.5">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || pathname?.startsWith(href + '/');
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[15px] font-medium transition-colors no-underline ${
                    isActive
                      ? 'text-[#00F0FF] bg-[#00F0FF]/8 border-l-2 border-[#00F0FF]'
                      : 'text-[#C8CAD8] hover:text-[#ECEEF5] hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {user ? (
            <div className="mt-4 pt-4 border-t border-white/[0.04]">
              <Link
                href="/settings"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[15px] font-medium transition-colors no-underline ${
                  pathname === '/settings'
                    ? 'text-[#00F0FF] bg-[#00F0FF]/8 border-l-2 border-[#00F0FF]'
                    : 'text-[#C8CAD8] hover:text-[#ECEEF5] hover:bg-white/[0.05]'
                }`}
              >
                <Settings className="w-[18px] h-[18px]" />
                <span>Settings</span>
              </Link>
            </div>
          ) : (
            <div className="mt-6">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-accent flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold rounded no-underline"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            </div>
          )}
        </div>
      </>
    )}
    </>
  );
}
