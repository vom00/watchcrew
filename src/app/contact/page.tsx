'use client';

import { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  Bug,
  Lightbulb,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';

type ContactReason = 'general' | 'bug' | 'feature' | 'support';

const REASONS: { key: ContactReason; label: string; icon: React.ReactNode }[] =
  [
    {
      key: 'general',
      label: 'General Inquiry',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    { key: 'bug', label: 'Bug Report', icon: <Bug className="w-4 h-4" /> },
    {
      key: 'feature',
      label: 'Feature Request',
      icon: <Lightbulb className="w-4 h-4" />,
    },
    {
      key: 'support',
      label: 'Support',
      icon: <HelpCircle className="w-4 h-4" />,
    },
  ];

export default function ContactPage() {
  const [reason, setReason] = useState<ContactReason>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `[WatchCrew] ${REASONS.find((r) => r.key === reason)?.label}: from ${name}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nReason: ${REASONS.find((r) => r.key === reason)?.label}\n\n${message}`
    );

    window.location.href = `mailto:vyomvikrammehta@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-7 h-7 text-[#FF3366]" />
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:'Rajdhani'] uppercase tracking-wide text-[#ECEEF5]">
              Contact Us
            </h1>
          </div>
          <p className="text-[#B0B1C0] mt-2 leading-relaxed">
            Have a question, found a bug, or want to suggest a feature? We&apos;d
            love to hear from you.
          </p>
        </div>

        {/* Direct email */}
        <div className="glass-card p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF3366]/15 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#FF3366]" />
            </div>
            <div>
              <p className="text-xs text-[#9899A8] uppercase tracking-wider font-medium">
                Email us directly
              </p>
              <a
                href="mailto:vyomvikrammehta@gmail.com"
                className="text-[#00F0FF] text-sm font-medium hover:underline"
              >
                vyomvikrammehta@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        {submitted ? (
          <div className="glass-card p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-[#39FF14]/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#39FF14]" />
            </div>
            <h2 className="text-xl font-bold font-[family-name:'Rajdhani'] uppercase text-[#ECEEF5] mb-2">
              Message Ready!
            </h2>
            <p className="text-sm text-[#9899A8] mb-6">
              Your email client should have opened with the message. If it
              didn&apos;t, you can email us directly at{' '}
              <a
                href="mailto:vyomvikrammehta@gmail.com"
                className="text-[#00F0FF] hover:underline"
              >
                vyomvikrammehta@gmail.com
              </a>
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="btn-accent px-5 py-2 text-sm font-medium"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-6">
            <h2 className="text-sm font-[family-name:'Rajdhani'] uppercase tracking-wider font-semibold text-[#ECEEF5] mb-6">
              Send a Message
            </h2>

            {/* Reason selector */}
            <div className="mb-5">
              <label className="block text-xs font-medium text-[#9899A8] mb-2 uppercase tracking-wider">
                What&apos;s this about?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {REASONS.map((r) => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setReason(r.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      reason === r.key
                        ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40'
                        : 'glass-button text-[#B0B1C0] hover:text-[#ECEEF5]'
                    }`}
                  >
                    {r.icon}
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Monkey D. Luffy"
                className="glass-input w-full"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="glass-input w-full"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-[#9899A8] mb-1.5 uppercase tracking-wider">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Tell us what's on your mind..."
                className="glass-input w-full resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-accent w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
