import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];


export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#06060B]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 sm:px-6 lg:px-8">
        {/* Branding */}
        <Link href="/" className="no-underline flex items-center gap-2 group">
          <img
            src="/images/straw-hat-logo.png"
            alt="WatchCrew Logo"
            className="w-7 h-7 object-contain drop-shadow-[0_0_4px_rgba(0,240,255,0.3)]"
          />
          <span className="text-sm font-bold font-[family-name:'Rajdhani'] tracking-wider uppercase text-[rgba(200,202,216,0.6)] group-hover:text-[#00F0FF] transition-colors">
            WatchCrew
          </span>
        </Link>

        {/* Links */}
        <ul className="flex flex-wrap items-center justify-center gap-5">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-xs text-[rgba(200,202,216,0.55)] transition-colors hover:text-[#00F0FF] no-underline uppercase tracking-wider font-medium"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="text-xs text-[rgba(200,202,216,0.45)] tracking-wider">
          &copy; 2026 WatchCrew. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
