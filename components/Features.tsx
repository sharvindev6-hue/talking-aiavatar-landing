'use client';

/* =============================================================================
   Features
   -----------------------------------------------------------------------------
   Three glassmorphism feature cards. Each card fades in + lifts from the
   shadows when the user scrolls into view (Framer Motion's whileInView).
   ============================================================================= */

import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'Hyper-Realistic Speech',
    body:
      'ElevenLabs neural voices with breath, inflection, and emotion. Not a TTS — a voice that lives in the room.',
    icon: (
      // Microphone / waveform
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 1 0 6 0V6a3 3 0 0 0-3-3Z" />
        <path d="M19 11a7 7 0 0 1-14 0M12 18v3M8 21h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Smart Conversationalist',
    body:
      'Kimi reasoning under the hood — context that survives long sessions, on-device memory, and intent that actually understands nuance.',
    icon: (
      // Spark / brain
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Lip Sync',
    body:
      'Viseme-driven mouth movement streamed at 60fps. The avatar does not move after it speaks — it speaks and moves together.',
    icon: (
      // Face / sync
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.15,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative w-full bg-ink-900 px-6 py-32 md:py-40"
    >
      {/* Section heading */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-4 inline-block text-[11px] font-medium uppercase tracking-[0.3em] text-electric-400">
            What makes it different
          </span>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Not a chatbot.{' '}
            <span className="text-gradient-glow">A presence.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 sm:text-lg">
            Three systems, one face. Built for the moment when the screen
            stops feeling like a screen.
          </p>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="glass-panel shimmer-border group p-8 md:p-10"
          >
            {/* Icon chip */}
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-electric-400 shadow-glow-blue transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              {f.icon}
            </div>

            <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
              {f.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              {f.body}
            </p>

            {/* Subtle bottom glow line on hover */}
            <div className="pointer-events-none absolute -bottom-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-electric-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
