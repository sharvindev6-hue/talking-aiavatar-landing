'use client';

/* =============================================================================
   Footer
   -----------------------------------------------------------------------------
   Final CTA + standard links. Minimal, dark, glass.
   ============================================================================= */

import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Privacy',     href: '/privacy' },
  { label: 'Terms',       href: '/terms' },
  { label: 'Changelog',   href: '/changelog' },
  { label: 'Twitter / X', href: 'https://twitter.com' },
  { label: 'GitHub',      href: 'https://github.com' },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-ink-900 px-6 pt-20 pb-10">
      {/* Top separator */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Ambient glow behind the CTA */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Ready to{' '}
            <span className="text-gradient-glow">meet your avatar?</span>
          </h3>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/60 sm:text-lg">
            One click. The screen wakes up. Someone is there.
          </p>

          <div className="mt-10 flex justify-center">
            <motion.a
              href="https://talking-aiavatar.vercel.app/login.html"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="glow-button animate-pulse-glow px-10 py-4 text-base"
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-400 shadow-[0_0_10px_#5fb4ff]" />
                Launch Avatar App
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom links */}
      <div className="relative z-10 mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
        <div className="flex items-center gap-3 text-sm text-white/40">
          <div className="h-1.5 w-1.5 rounded-full bg-electric-500 shadow-glow-blue" />
          <span>© {new Date().getFullYear()} Avatar AI. All rights reserved.</span>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="transition-colors hover:text-white"
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
