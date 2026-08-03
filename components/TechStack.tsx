'use client';

/* =============================================================================
   TechStack
   -----------------------------------------------------------------------------
   Monochrome partner strip: Moonshot AI (Kimi), ElevenLabs, Vercel.
   Logos are inline SVG to avoid external requests and keep monochrome.
   ============================================================================= */

import { motion } from 'framer-motion';

function LogoMoonshot() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2c1.5 0 2.8.7 3.7 1.7.7.8 1.2 1.8 1.3 3 .1 1.1-.2 2.2-.9 3.1-.7.9-1.7 1.6-2.8 1.9.9.5 1.6 1.2 2.1 2.1.5.9.7 1.9.5 2.9-.2 1-.7 1.9-1.5 2.6-.8.7-1.8 1.2-2.8 1.3-1 .1-2.1-.1-3-.7-.9-.6-1.6-1.5-2-2.5-.4-1-.4-2.1 0-3.1.4-1 1.1-1.9 2-2.5-.9-.3-1.7-.8-2.3-1.5-.6-.7-1-1.6-1.1-2.5-.1-.9.1-1.9.5-2.7C6.4 4.4 7.1 3.6 8 3.1 8.9 2.6 9.9 2.3 11 2.3c.3 0 .7 0 1-.3Z" />
    </svg>
  );
}

function LogoElevenLabs() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 4v16M5 4l5 16M5 4l3 16M14 4v16M14 4l5 16M14 4l3 16" strokeLinecap="round" />
    </svg>
  );
}

function LogoVercel() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2L22 20H2L12 2Z" />
    </svg>
  );
}

const PARTNERS = [
  { name: 'Moonshot AI', sub: 'Kimi reasoning', Logo: LogoMoonshot },
  { name: 'ElevenLabs', sub: 'Voice synthesis', Logo: LogoElevenLabs },
  { name: 'Vercel', sub: 'Edge deployment', Logo: LogoVercel },
];

export default function TechStack() {
  return (
    <section className="relative w-full bg-ink-900 px-6 py-24 md:py-32">
      {/* Subtle separator gradient at the top */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/40"
        >
          Powered by
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {PARTNERS.map(({ name, sub, Logo }) => (
            <motion.div
              key={name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="glass-panel group flex flex-col items-center gap-3 px-6 py-8 transition-shadow duration-500 hover:shadow-glow-blue"
            >
              <div className="text-white/70 transition-colors duration-500 group-hover:text-white">
                <Logo />
              </div>
              <div>
                <div className="font-display text-base font-medium text-white/90">
                  {name}
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-[0.18em] text-white/40">
                  {sub}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
