'use client';

/* =============================================================================
   Hero
   -----------------------------------------------------------------------------
   3-layer full-screen hero:
     Layer 1: looping muted background video + vignette + grain
     Layer 2: R3F interactive dust particles  (now mounted once in page.tsx
              as a full-page fixed layer so motes cover the whole scroll)
     Layer 3: typography + glowing CTA

   Desktop uses /public/hero-bg.mp4; mobile uses /public/hero-bg-mobile.mp4.
   Replace either asset to update that viewport's background video.
   ============================================================================= */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';const DESKTOP_VIDEO_SRC = '/hero-bg.mp4';
const MOBILE_VIDEO_SRC = '/hero-bg-mobile.mp4';
const DESKTOP_POSTER_SRC = '/hero-poster.jpg';
const MOBILE_POSTER_SRC = '/hero-poster-mobile.jpg';
function ResponsiveHeroVideo() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
      setIsReady(true);
    };

    updateViewport();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateViewport);
      return () => mediaQuery.removeEventListener('change', updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  if (!isReady) return null;

  const videoSrc = isMobile ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC;
  const posterSrc = isMobile ? MOBILE_POSTER_SRC : DESKTOP_POSTER_SRC;

  return (
    <video
      key={videoSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={posterSrc}
      aria-hidden="true"
      className="relative z-[1] h-full w-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}


export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-screen w-full overflow-hidden bg-ink-900">
      {/* ---------------- LAYER 1: Background video + overlays ---------------- */}
      <div className="absolute inset-0 z-0">
        <div className="hero-video-fallback" aria-hidden="true" />
        <ResponsiveHeroVideo />

        {/* Vignette: pulls edges into deep black */}
        <div className="vignette-overlay" />

        {/* Film grain */}
        <div className="grain-overlay" />

        {/* Extra bottom shade so the typography reads on busy frames */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/30 via-transparent to-ink-900" />
      </div>

      {/* ---------------- LAYER 2: R3F particle physics ----------------------- */}
      {/* (mounted globally in page.tsx so motes cover the whole page) */}

      {/* ---------------- LAYER 3: Foreground UI ----------------------------- */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Small eyebrow tag */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-electric-400" />
            Avatar AI · v0.1
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Conversations that{' '}
            <span className="text-gradient-glow">feel alive.</span>
          </h1>

          {/* Sub-headline */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
            Powered by{' '}
            <span className="font-medium text-white">Kimi</span> &{' '}
            <span className="font-medium text-white">ElevenLabs</span>.
            Real-time intelligence meets hyper-realistic voice.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href="https://talking-aiavatar.vercel.app/login.html"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="glow-button animate-pulse-glow"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-400 shadow-[0_0_10px_#5fb4ff]" />
                Wake Up Avatar
              </span>
            </motion.a>

            <a
              href="#features"
              className="text-sm font-medium text-white/60 underline-offset-4 transition hover:text-white hover:underline"
            >
              See what it can do ↓
            </a>
          </div>
        </motion.div>

        {/* Bottom hint: scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="h-10 w-[18px] rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-md">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="mx-auto mt-2 h-1.5 w-1 rounded-full bg-white/70"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
