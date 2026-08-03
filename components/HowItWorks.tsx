'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    title: 'Create your account',
    copy: 'Sign up free with your email. No credit card, no downloads — she lives right in your browser.',
  },
  {
    n: '02',
    title: 'Wake her up',
    copy: 'Open the app and she is there — a lifelike 3D avatar, waiting to talk to you.',
  },
  {
    n: '03',
    title: 'Start talking',
    copy: 'Type or speak. She answers out loud in real time, with lip-synced speech that feels human.',
  },
];

export default function HowItWorks() {
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
          How it works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Up and talking in{' '}
          <span className="bg-gradient-to-r from-white via-white to-electric-400 bg-clip-text text-transparent">
            under a minute
          </span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {STEPS.map(({ n, title, copy }) => (
            <motion.div
              key={n}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="glass-panel group relative flex flex-col items-start gap-4 px-7 py-9 text-left transition-shadow duration-500 hover:shadow-glow-blue"
            >
              <span className="font-display text-5xl font-semibold text-white/10 transition-colors duration-500 group-hover:text-electric-400/40">
                {n}
              </span>
              <h3 className="font-display text-lg font-medium text-white/90">{title}</h3>
              <p className="text-sm leading-relaxed text-white/55">{copy}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 text-sm text-white/40"
        >
          Free to start · No credit card · Works in any modern browser
        </motion.p>
      </div>
    </section>
  );
}
