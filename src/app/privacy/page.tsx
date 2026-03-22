'use client';

import { Shield } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `WatchCrew collects the following information when you use our platform:

• **Account Information**: Username, display name, email address, and profile picture when you create an account.
• **Usage Data**: Episode watch progress, series tracking data, achievements earned, and activity logs.
• **Social Data**: Friend connections, comments, reactions, and activity feed interactions.
• **Device Information**: Browser type, operating system, and viewport size for optimizing your experience.

All data is stored locally in your browser's localStorage. We do not currently operate a centralized server that stores your personal data.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use your information to:

• Provide and maintain the WatchCrew service
• Track your anime watching progress and calculate statistics
• Power social features like leaderboards, friend activity, and achievements
• Improve and optimize the platform experience
• Send notifications about achievements, streaks, and friend activity (when enabled)`,
  },
  {
    title: '3. Data Storage & Security',
    content: `Your data is primarily stored locally in your browser using localStorage. This means:

• Your data stays on your device
• Clearing browser data will remove your WatchCrew data
• We recommend backing up important progress regularly
• We use industry-standard security practices for any server-side data processing`,
  },
  {
    title: '4. Third-Party Services',
    content: `WatchCrew may use the following third-party services:

• **Authentication Providers**: Google, GitHub for sign-in (when configured)
• **Image CDNs**: Kitsu API for anime artwork and poster images
• **Avatar Generation**: DiceBear API for default profile avatars

These services have their own privacy policies that govern how they handle your data.`,
  },
  {
    title: '5. Your Rights',
    content: `You have the right to:

• **Access**: View all data associated with your account
• **Delete**: Remove your account and all associated data at any time via Settings
• **Export**: Your data is stored in your browser and can be accessed directly
• **Modify**: Update your profile information, privacy settings, and notification preferences`,
  },
  {
    title: '6. Cookies & Local Storage',
    content: `WatchCrew uses browser localStorage to persist your session and preferences. We do not use tracking cookies or third-party analytics cookies. Essential storage is used only to maintain your login session and save your progress.`,
  },
  {
    title: '7. Children\'s Privacy',
    content: `WatchCrew is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal data, please contact us so we can remove it.`,
  },
  {
    title: '8. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date. Continued use of WatchCrew after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '9. Contact Us',
    content: `If you have questions about this Privacy Policy or your data, contact us at:

**Email**: vyomvikrammehta@gmail.com`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-7 h-7 text-[#39FF14]" />
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
              Privacy Policy
            </h1>
          </div>
          <p className="text-sm text-[#9899A8]">
            Last updated: March 2026
          </p>
          <p className="text-[#B0B1C0] mt-4 leading-relaxed">
            At WatchCrew, we take your privacy seriously. This policy describes
            how we collect, use, and protect your information when you use our
            platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title} className="glass-card p-6">
              <h2 className="text-base font-semibold text-[#ECEEF5] font-[family-name:'Rajdhani'] uppercase tracking-wide mb-4">
                {section.title}
              </h2>
              <div className="text-sm text-[#B0B1C0] leading-relaxed whitespace-pre-line">
                {section.content.split('**').map((part, i) =>
                  i % 2 === 1 ? (
                    <strong key={i} className="text-[#ECEEF5] font-medium">
                      {part}
                    </strong>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
