'use client';

/* =============================================================================
   GrainOverlay
   -----------------------------------------------------------------------------
   Standalone, re-usable film grain layer. Pure CSS (no canvas) so it stays
   cheap and deterministic. Drop anywhere you want a tactile texture.
   ============================================================================= */

export default function GrainOverlay({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="grain-overlay pointer-events-none absolute inset-0"
      style={{ opacity }}
    />
  );
}
