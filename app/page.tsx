'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

// R3F must be client-only; dynamic import with ssr:false keeps the bundle
// off the server and avoids hydration mismatches from canvas.
const InteractiveDustParticles = dynamic(
  () => import('@/components/InteractiveDustParticles'),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      {/* All page content sits below the particle layer */}
      <main className="relative z-0 min-h-screen w-full bg-ink-900 text-white">
        <Hero />
        <Features />
        <HowItWorks />
        <Footer />
      </main>

      {/* Layer 2: R3F particle physics — fixed full-viewport, sits ABOVE
          content so motes are visible across the page. pointer-events-none
          keeps clicks (e.g. "Launch Avatar App") working. */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-10"
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <InteractiveDustParticles />
      </div>
    </>
  );
}
