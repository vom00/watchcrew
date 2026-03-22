'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-bold text-[#FF3366] font-[family-name:'Rajdhani'] mb-2">Error</p>
      <h2 className="text-xl font-bold text-[#ECEEF5] mb-3 font-[family-name:'Rajdhani'] uppercase tracking-wide">
        Something Went Wrong
      </h2>
      <p className="text-sm text-[rgba(200,202,216,0.6)] mb-8 max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="btn-accent px-6 py-3 rounded-lg text-sm font-semibold"
      >
        Try Again
      </button>
    </div>
  );
}
