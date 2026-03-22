import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-8xl font-bold text-[#00F0FF] font-[family-name:'Rajdhani'] mb-2">404</p>
      <h1 className="text-2xl font-bold text-[#ECEEF5] mb-3 font-[family-name:'Rajdhani'] uppercase tracking-wide">
        Page Not Found
      </h1>
      <p className="text-sm text-[rgba(200,202,216,0.6)] mb-8 max-w-md">
        Looks like this page got lost at sea. Let&apos;s get you back on course.
      </p>
      <Link
        href="/dashboard"
        className="btn-accent px-6 py-3 rounded-lg text-sm font-semibold no-underline"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
