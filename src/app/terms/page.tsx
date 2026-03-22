'use client';

import { FileText } from 'lucide-react';

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using WatchCrew ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.`,
  },
  {
    title: '2. Description of Service',
    content: `WatchCrew is a social anime progress tracking platform that allows users to:

• Track anime episode watching progress
• Earn achievements and XP through watching milestones
• Connect with friends and view their activity
• Participate in leaderboards and community features
• Manage a personal anime library

The Service is provided free of charge and is intended for personal, non-commercial use.`,
  },
  {
    title: '3. User Accounts',
    content: `To use WatchCrew, you must create an account. You are responsible for:

• Maintaining the confidentiality of your account
• All activities that occur under your account
• Providing accurate and current information
• Notifying us of any unauthorized use

We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: '4. User Conduct',
    content: `When using WatchCrew, you agree not to:

• Use the Service for any illegal purpose
• Harass, abuse, or threaten other users
• Upload inappropriate, offensive, or harmful content
• Attempt to interfere with the Service's operation
• Create multiple accounts for deceptive purposes
• Use automated tools to access the Service without permission
• Impersonate other users or entities`,
  },
  {
    title: '5. Content & Intellectual Property',
    content: `• **Your Content**: You retain ownership of content you create (comments, profile data, etc.). By posting content, you grant WatchCrew a non-exclusive license to display it within the Service.
• **Anime Data**: Anime titles, descriptions, and artwork are the property of their respective creators and studios. WatchCrew uses publicly available data and images under fair use for tracking purposes.
• **WatchCrew Brand**: The WatchCrew name, logo, and design system are our intellectual property and may not be reproduced without permission.`,
  },
  {
    title: '6. Data & Privacy',
    content: `Your use of WatchCrew is also governed by our Privacy Policy. Key points:

• Data is stored locally in your browser
• You can delete your data at any time through Settings
• We do not sell your personal information
• See our full Privacy Policy for details`,
  },
  {
    title: '7. Disclaimers',
    content: `WatchCrew is provided "as is" without warranties of any kind. We do not guarantee:

• Uninterrupted or error-free service
• Accuracy of anime episode counts or metadata
• Preservation of locally stored data
• Availability of third-party services (image CDNs, auth providers)

We are not responsible for data loss resulting from browser storage clearing or device changes.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `To the maximum extent permitted by law, WatchCrew and its creators shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. This includes but is not limited to loss of data, loss of goodwill, or any other intangible losses.`,
  },
  {
    title: '9. Modifications',
    content: `We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated date. Your continued use of WatchCrew after changes constitutes acceptance of the modified terms.`,
  },
  {
    title: '10. Contact',
    content: `For questions about these Terms of Service, contact us at:

**Email**: vyomvikrammehta@gmail.com`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-7 h-7 text-[#00F0FF]" />
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
              Terms of Service
            </h1>
          </div>
          <p className="text-sm text-[#9899A8]">
            Last updated: March 2026
          </p>
          <p className="text-[#B0B1C0] mt-4 leading-relaxed">
            Please read these Terms of Service carefully before using WatchCrew.
            By using the platform, you agree to these terms.
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
