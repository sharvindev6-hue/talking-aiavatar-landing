import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink-900 px-6 text-center text-white">
      <p className="font-display text-7xl font-semibold text-white/15">404</p>
      <h1 className="mt-4 font-display text-2xl font-medium text-white">
        This page drifted into the void.
      </h1>
      <p className="mt-2 text-sm text-white/50">
        The avatar could not find what you were looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:border-white/40"
      >
        Back to home
      </Link>
    </main>
  );
}
