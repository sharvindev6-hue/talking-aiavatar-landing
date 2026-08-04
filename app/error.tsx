'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Keep production diagnostics free of user content and sensitive details.
    console.error('Landing page runtime error', error.digest ?? 'unknown');
  }, [error.digest]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink-900 px-6 text-center text-white">
      <p className="font-display text-7xl font-semibold text-white/15">Oops</p>
      <h1 className="mt-4 font-display text-2xl font-medium text-white">
        The avatar needs a moment.
      </h1>
      <p className="mt-2 max-w-md text-sm text-white/50">
        Something went wrong while loading this page. You can safely try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:border-white/40"
      >
        Try again
      </button>
    </main>
  );
}
