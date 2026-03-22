'use client';

import React from 'react';

// =============================================================================
// Custom SVG Achievement Icons — Anime-Themed
// Each icon is a hand-crafted SVG designed for the WatchCrew achievement system.
// =============================================================================

interface IconProps {
  size?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Milestone Icons
// ---------------------------------------------------------------------------

/** Shining star burst — "And So It Begins" */
export function StarBurstIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4L28 18H42L30.5 27L34 42L24 33L14 42L17.5 27L6 18H20L24 4Z" fill="url(#starGrad)" stroke="#FFD700" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="6" fill="#FFF8DC" opacity="0.8" />
      <defs>
        <linearGradient id="starGrad" x1="6" y1="4" x2="42" y2="42">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Fish hook — "Getting Hooked" */
export function HookIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 6V24" stroke="url(#hookGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 24C24 24 24 32 20 36C16 40 12 38 12 34C12 30 16 28 20 28C24 28 28 30 28 34C28 38 24 42 18 42" stroke="url(#hookGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="24" cy="6" r="3" fill="#00F0FF" opacity="0.6" />
      <defs>
        <linearGradient id="hookGrad" x1="12" y1="6" x2="28" y2="42">
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Flame — "No Turning Back" */
export function FlameIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4C24 4 32 14 32 24C32 30 28 36 24 38C20 36 16 30 16 24C16 14 24 4 24 4Z" fill="url(#flameGrad)" />
      <path d="M24 16C24 16 28 22 28 26C28 30 26 32 24 34C22 32 20 30 20 26C20 22 24 16 24 16Z" fill="url(#flameInner)" />
      <path d="M24 24C24 24 26 28 26 30C26 32 25 34 24 35C23 34 22 32 22 30C22 28 24 24 24 24Z" fill="#FFF8DC" opacity="0.9" />
      <defs>
        <linearGradient id="flameGrad" x1="16" y1="4" x2="32" y2="38">
          <stop stopColor="#FF3366" />
          <stop offset="0.5" stopColor="#FF6B00" />
          <stop offset="1" stopColor="#FFD700" />
        </linearGradient>
        <linearGradient id="flameInner" x1="20" y1="16" x2="28" y2="34">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FFF8DC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** 100 kanji-style — "Century Club" */
export function CenturyIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="10" width="36" height="28" rx="4" fill="url(#centuryBg)" opacity="0.3" />
      <text x="24" y="30" textAnchor="middle" fontFamily="Rajdhani, sans-serif" fontSize="18" fontWeight="bold" fill="url(#centuryGrad)">100</text>
      <path d="M8 38L16 34L24 36L32 34L40 38" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" />
      <defs>
        <linearGradient id="centuryBg" x1="6" y1="10" x2="42" y2="38">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FF3366" />
        </linearGradient>
        <linearGradient id="centuryGrad" x1="12" y1="16" x2="36" y2="36">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Retro TV with glowing screen — "Dedicated Viewer" */
export function RetroTvIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="8" y="14" width="32" height="24" rx="3" stroke="url(#tvGrad)" strokeWidth="2" fill="none" />
      <rect x="12" y="18" width="24" height="16" rx="1" fill="url(#tvScreen)" opacity="0.6" />
      <path d="M18 6L24 14L30 6" stroke="#00F0FF" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="38" width="8" height="4" rx="1" fill="#8B5CF6" opacity="0.5" />
      <circle cx="34" cy="32" r="1.5" fill="#39FF14" />
      <defs>
        <linearGradient id="tvGrad" x1="8" y1="14" x2="40" y2="38">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#00F0FF" />
        </linearGradient>
        <linearGradient id="tvScreen" x1="12" y1="18" x2="36" y2="34">
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Running figure with speed lines — "Marathon Runner" */
export function MarathonIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="30" cy="10" r="4" fill="url(#runGrad)" />
      <path d="M26 16L22 28L18 32M26 16L32 22L36 20M22 28L28 32L34 40M22 28L14 30" stroke="url(#runGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18H14" stroke="#39FF14" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M4 24H10" stroke="#00F0FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M8 30H12" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <defs>
        <linearGradient id="runGrad" x1="14" y1="6" x2="36" y2="40">
          <stop stopColor="#39FF14" />
          <stop offset="1" stopColor="#00F0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Crown with jewels — "Thousand Episode Legend" */
export function CrownIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 36L4 14L16 22L24 8L32 22L44 14L40 36H8Z" fill="url(#crownGrad)" />
      <path d="M8 36H40" stroke="#FFD700" strokeWidth="2" />
      <circle cx="16" cy="28" r="2" fill="#FF3366" />
      <circle cx="24" cy="24" r="2.5" fill="#00F0FF" />
      <circle cx="32" cy="28" r="2" fill="#39FF14" />
      <path d="M10 40H38" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
      <defs>
        <linearGradient id="crownGrad" x1="4" y1="8" x2="44" y2="40">
          <stop stopColor="#FFD700" />
          <stop offset="0.5" stopColor="#FF8C00" />
          <stop offset="1" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Streak Icons
// ---------------------------------------------------------------------------

/** Chain links — "Consistent Viewer" */
export function ChainIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="18" cy="24" rx="10" ry="8" stroke="url(#chainGrad)" strokeWidth="3" fill="none" />
      <ellipse cx="30" cy="24" rx="10" ry="8" stroke="url(#chainGrad2)" strokeWidth="3" fill="none" />
      <defs>
        <linearGradient id="chainGrad" x1="8" y1="16" x2="28" y2="32">
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="chainGrad2" x1="20" y1="16" x2="40" y2="32">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#FF3366" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Lightning bolt — "Unstoppable" */
export function LightningIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M28 4L12 26H22L18 44L38 20H26L28 4Z" fill="url(#boltGrad)" />
      <path d="M28 4L12 26H22L18 44L38 20H26L28 4Z" stroke="#FFD700" strokeWidth="1" opacity="0.5" />
      <path d="M24 18L20 28H26L24 36" stroke="#FFF8DC" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <defs>
        <linearGradient id="boltGrad" x1="12" y1="4" x2="38" y2="44">
          <stop stopColor="#FFD700" />
          <stop offset="0.5" stopColor="#FF8C00" />
          <stop offset="1" stopColor="#FF3366" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Calendar with flame — "Year of Anime" */
export function CalendarFlameIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <rect x="6" y="12" width="36" height="30" rx="4" stroke="url(#calGrad)" strokeWidth="2" fill="none" />
      <path d="M6 20H42" stroke="url(#calGrad)" strokeWidth="1.5" />
      <rect x="14" y="6" width="3" height="10" rx="1.5" fill="#8B5CF6" />
      <rect x="31" y="6" width="3" height="10" rx="1.5" fill="#8B5CF6" />
      <text x="24" y="36" textAnchor="middle" fontFamily="Rajdhani, sans-serif" fontSize="12" fontWeight="bold" fill="url(#calText)">365</text>
      <defs>
        <linearGradient id="calGrad" x1="6" y1="6" x2="42" y2="42">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#FF3366" />
        </linearGradient>
        <linearGradient id="calText" x1="14" y1="24" x2="34" y2="40">
          <stop stopColor="#FF3366" />
          <stop offset="1" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Series-Specific Icons
// ---------------------------------------------------------------------------

/** Crosshair/target — "Multi-Tracker" */
export function CrosshairIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="16" stroke="url(#targetGrad)" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="10" stroke="url(#targetGrad)" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="4" fill="url(#targetGrad)" />
      <path d="M24 4V12M24 36V44M4 24H12M36 24H44" stroke="url(#targetGrad)" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="targetGrad" x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#FF3366" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Checkered flag — "Finisher" */
export function FinishFlagIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M10 6V44" stroke="#9899A8" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="10" y="6" width="28" height="20" rx="2" fill="url(#flagGrad)" opacity="0.9" />
      <rect x="10" y="6" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <rect x="24" y="6" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <rect x="17" y="11" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <rect x="31" y="11" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <rect x="10" y="16" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <rect x="24" y="16" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <rect x="17" y="21" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <rect x="31" y="21" width="7" height="5" fill="#ECEEF5" opacity="0.8" />
      <defs>
        <linearGradient id="flagGrad" x1="10" y1="6" x2="38" y2="26">
          <stop stopColor="#39FF14" />
          <stop offset="1" stopColor="#00F0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Trophy — "Completionist" */
export function TrophyIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M14 8H34V20C34 28 30 32 24 34C18 32 14 28 14 20V8Z" fill="url(#trophyGrad)" />
      <path d="M14 12H8C8 12 6 12 6 16C6 20 10 22 14 20" stroke="#FFD700" strokeWidth="2" fill="none" />
      <path d="M34 12H40C40 12 42 12 42 16C42 20 38 22 34 20" stroke="#FFD700" strokeWidth="2" fill="none" />
      <rect x="20" y="34" width="8" height="4" fill="#FFB800" />
      <rect x="16" y="38" width="16" height="4" rx="1" fill="#FFD700" />
      <circle cx="24" cy="20" r="4" fill="#FFF8DC" opacity="0.6" />
      <defs>
        <linearGradient id="trophyGrad" x1="14" y1="8" x2="34" y2="34">
          <stop stopColor="#FFD700" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Military medal — "Anime Veteran" */
export function MedalIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M16 4L20 16H28L32 4" stroke="url(#ribbonGrad)" strokeWidth="2" fill="url(#ribbonGrad)" opacity="0.5" />
      <circle cx="24" cy="28" r="12" fill="url(#medalGrad)" />
      <circle cx="24" cy="28" r="9" stroke="#FFD700" strokeWidth="1.5" fill="none" />
      <path d="M24 20L26 26H32L27 30L29 36L24 32L19 36L21 30L16 26H22L24 20Z" fill="#FFD700" />
      <defs>
        <linearGradient id="ribbonGrad" x1="16" y1="4" x2="32" y2="16">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#FF3366" />
        </linearGradient>
        <linearGradient id="medalGrad" x1="12" y1="16" x2="36" y2="40">
          <stop stopColor="#FFB800" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Handshake / crew — "Nakama Collector" */
export function NakamaIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="16" cy="14" r="6" fill="url(#nakamaGrad1)" />
      <circle cx="32" cy="14" r="6" fill="url(#nakamaGrad2)" />
      <path d="M6 36C6 28 10 24 16 24C18 24 20 25 22 26" stroke="url(#nakamaGrad1)" strokeWidth="2" fill="none" />
      <path d="M42 36C42 28 38 24 32 24C30 24 28 25 26 26" stroke="url(#nakamaGrad2)" strokeWidth="2" fill="none" />
      <path d="M22 26L24 30L26 26" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="34" r="4" fill="url(#nakamaHeart)" />
      <defs>
        <linearGradient id="nakamaGrad1" x1="10" y1="8" x2="22" y2="36">
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="nakamaGrad2" x1="26" y1="8" x2="42" y2="36">
          <stop stopColor="#FF3366" />
          <stop offset="1" stopColor="#FFB800" />
        </linearGradient>
        <linearGradient id="nakamaHeart" x1="20" y1="30" x2="28" y2="38">
          <stop stopColor="#FF3366" />
          <stop offset="1" stopColor="#FFB800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Jolly Roger / pirate flag — "King of the Pirates" */
export function PirateFlagIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M10 6V44" stroke="#9899A8" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="10" y="6" width="32" height="22" rx="2" fill="url(#pirateBg)" />
      <circle cx="26" cy="14" r="5" stroke="#ECEEF5" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="13" r="1" fill="#ECEEF5" />
      <circle cx="28" cy="13" r="1" fill="#ECEEF5" />
      <path d="M18 22L26 18L34 22" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 20L20 24M30 20L32 24" stroke="#ECEEF5" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="pirateBg" x1="10" y1="6" x2="42" y2="28">
          <stop stopColor="#1A1A2E" />
          <stop offset="1" stopColor="#0C0C16" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Naruto spiral — "Hokage" */
export function SpiralIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="18" stroke="url(#spiralGrad)" strokeWidth="2" fill="none" />
      <path d="M24 12C30 12 34 16 34 22C34 28 30 30 26 30C22 30 20 28 20 24C20 20 22 18 24 18C26 18 28 20 28 22C28 24 26 26 24 26" stroke="url(#spiralGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <defs>
        <linearGradient id="spiralGrad" x1="6" y1="6" x2="42" y2="42">
          <stop stopColor="#FF8C00" />
          <stop offset="1" stopColor="#FF3366" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Crossed katanas — "Soul Reaper Captain" */
export function KatanaIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M8 40L36 8" stroke="url(#katanaGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 40L12 8" stroke="url(#katanaGrad2)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="14" y="14" width="20" height="3" rx="1" fill="#FFD700" opacity="0.4" transform="rotate(-45 24 15)" />
      <rect x="14" y="31" width="20" height="3" rx="1" fill="#FFD700" opacity="0.4" transform="rotate(45 24 33)" />
      <circle cx="24" cy="24" r="3" fill="url(#katanaCenter)" />
      <defs>
        <linearGradient id="katanaGrad" x1="8" y1="40" x2="36" y2="8">
          <stop stopColor="#C0C0C0" />
          <stop offset="1" stopColor="#ECEEF5" />
        </linearGradient>
        <linearGradient id="katanaGrad2" x1="40" y1="40" x2="12" y2="8">
          <stop stopColor="#C0C0C0" />
          <stop offset="1" stopColor="#ECEEF5" />
        </linearGradient>
        <linearGradient id="katanaCenter" x1="21" y1="21" x2="27" y2="27">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#00F0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Ocean wave — "Paramount War Survivor" */
export function WaveIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M4 28C8 22 12 18 16 22C20 26 24 18 28 22C32 26 36 22 40 18C44 14 44 14 44 14" stroke="url(#waveGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M4 36C8 30 12 26 16 30C20 34 24 26 28 30C32 34 36 30 40 26C44 22 44 22 44 22" stroke="url(#waveGrad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <circle cx="24" cy="12" r="4" fill="#FFD700" opacity="0.6" />
      <defs>
        <linearGradient id="waveGrad" x1="4" y1="14" x2="44" y2="36">
          <stop stopColor="#00F0FF" />
          <stop offset="1" stopColor="#0066FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Frog sage — "Sage Mode Unlocked" */
export function SageIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <ellipse cx="24" cy="28" rx="16" ry="12" fill="url(#sageGrad)" opacity="0.3" />
      <circle cx="16" cy="18" r="6" fill="url(#sageGrad)" />
      <circle cx="32" cy="18" r="6" fill="url(#sageGrad)" />
      <circle cx="16" cy="17" r="2.5" fill="#1A1A2E" />
      <circle cx="32" cy="17" r="2.5" fill="#1A1A2E" />
      <circle cx="16" cy="16.5" r="1" fill="#FFD700" />
      <circle cx="32" cy="16.5" r="1" fill="#FFD700" />
      <path d="M20 28C20 28 22 32 24 32C26 32 28 28 28 28" stroke="#39FF14" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 22L8 20M36 22L40 20" stroke="#39FF14" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <defs>
        <linearGradient id="sageGrad" x1="8" y1="12" x2="40" y2="40">
          <stop stopColor="#39FF14" />
          <stop offset="1" stopColor="#00F0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Glowing blade — "Bankai Awakened" */
export function BankaiIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 4L26 30H22L24 4Z" fill="url(#bankaiGrad)" />
      <rect x="18" y="30" width="12" height="4" rx="1" fill="#FFD700" />
      <rect x="22" y="34" width="4" height="10" rx="1" fill="url(#bankaiHandle)" />
      <path d="M16 8L24 12L32 8" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
      <path d="M18 14L24 16L30 14" stroke="#00F0FF" strokeWidth="1" opacity="0.3" />
      <defs>
        <linearGradient id="bankaiGrad" x1="22" y1="4" x2="26" y2="30">
          <stop stopColor="#ECEEF5" />
          <stop offset="0.5" stopColor="#00F0FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="bankaiHandle" x1="22" y1="34" x2="26" y2="44">
          <stop stopColor="#1A1A2E" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** Aura burst — "Ultra Instinct" */
export function UltraInstinctIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <circle cx="24" cy="24" r="8" fill="url(#uiCore)" />
      <circle cx="24" cy="24" r="14" stroke="url(#uiRing1)" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="24" cy="24" r="20" stroke="url(#uiRing2)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M24 4L26 10L24 8L22 10L24 4Z" fill="#C0C0C0" opacity="0.6" />
      <path d="M24 44L26 38L24 40L22 38L24 44Z" fill="#C0C0C0" opacity="0.6" />
      <path d="M4 24L10 22L8 24L10 26L4 24Z" fill="#C0C0C0" opacity="0.6" />
      <path d="M44 24L38 22L40 24L38 26L44 24Z" fill="#C0C0C0" opacity="0.6" />
      <defs>
        <radialGradient id="uiCore" cx="24" cy="24" r="8">
          <stop stopColor="#ECEEF5" />
          <stop offset="1" stopColor="#C0C0FF" />
        </radialGradient>
        <linearGradient id="uiRing1" x1="10" y1="10" x2="38" y2="38">
          <stop stopColor="#C0C0FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="uiRing2" x1="4" y1="4" x2="44" y2="44">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#C0C0FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// =============================================================================
// Icon Registry — maps achievement ID to its SVG component
// =============================================================================

export const ACHIEVEMENT_ICONS: Record<string, React.FC<IconProps>> = {
  first_episode: StarBurstIcon,
  episodes_20: HookIcon,
  episodes_50: FlameIcon,
  episodes_100: CenturyIcon,
  episodes_200: RetroTvIcon,
  episodes_500: MarathonIcon,
  episodes_1000: CrownIcon,
  streak_7: ChainIcon,
  streak_30: LightningIcon,
  streak_365: CalendarFlameIcon,
  multi_tracker: CrosshairIcon,
  first_completed: FinishFlagIcon,
  completed_5: TrophyIcon,
  completed_10: MedalIcon,
  nakama_collector: NakamaIcon,
  king_of_pirates: PirateFlagIcon,
  hokage: SpiralIcon,
  soul_reaper_captain: KatanaIcon,
  paramount_war_survivor: WaveIcon,
  sage_mode_unlocked: SageIcon,
  bankai_awakened: BankaiIcon,
  ultra_instinct: UltraInstinctIcon,
};
