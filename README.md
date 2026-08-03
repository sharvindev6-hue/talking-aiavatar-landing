# Avatar AI — Landing Page

Cinematic landing page for an AI talking-avatar app (Kimi intelligence + ElevenLabs voice).

## Stack

- **Next.js 14** (App Router, React 18)
- **Tailwind CSS** + custom cinematic tokens
- **Framer Motion** — fade-ins, scroll triggers
- **React Three Fiber** + drei — WebGL dust particles
- **Vercel-ready** — fluid asset loading, no heavy server work

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve production build
```

## File map

```
app/
  layout.tsx               # fonts (Inter, Space Grotesk) + metadata
  page.tsx                 # composes Hero / Features / TechStack / Footer
  globals.css              # tokens, glass utility, vignette + grain
components/
  Hero.tsx                       # 3-layer hero
  InteractiveDustParticles.tsx   # R3F particle physics
  Features.tsx                   # 3 glass cards
  TechStack.tsx                  # partner strip
  Footer.tsx                     # final CTA + links
  GrainOverlay.tsx               # reusable film grain
public/
  hero-bg.mp4             # <-- put your looping hero video here
  hero-poster.jpg         # <-- first-frame poster (recommended)
```

## Customization

### 1. Swap the hero video

Drop a 1080p / 4K looping `.mp4` (10–20s ideal) into `public/` named `hero-bg.mp4`,
or change `VIDEO_SRC` at the top of `components/Hero.tsx`.

For Vercel: keep the file under 8 MB if you want it to stream fast. Otherwise
host on a CDN and point `VIDEO_SRC` to the URL.

### 2. Tune the particle physics

Open `components/InteractiveDustParticles.tsx`. Knobs at the top:

```ts
const PARTICLE_COUNT      = 1800;   // how many motes
const FIELD_RADIUS        = 1.4;    // mouse influence radius
const REPULSION_STRENGTH  = 0.045;  // close-range push
const ATTRACTION_STRENGTH = 0.0025; // far-range drift
const DAMPING             = 0.94;   // velocity decay per frame
const NOISE_AMPLITUDE     = 0.0008; // ambient idle jitter
```

For 5000+ motes, swap the CPU `BufferAttribute` for a custom shader
(uniforms-driven positions) to keep the main thread free.

### 3. Brand colors

Edit `tailwind.config.ts` (`colors.electric`, `colors.ink`) and the
`text-gradient-glow` class in `globals.css`.

### 4. Typography

Fonts load via `next/font` in `app/layout.tsx`. Default:
- `font-display` → Space Grotesk
- `font-body` → Inter

## Performance notes

- `next/dynamic({ ssr: false })` keeps R3F off the server bundle
- `<Canvas dpr={[1, 2]}>` clamps pixel ratio for mobile
- Background video uses `preload="auto"` + `playsInline` for iOS
- All overlays (grain, vignette) are pure CSS — no extra requests
- Glassmorphism is `backdrop-blur-xl` (GPU compositor, no JS)

## Deploy

```bash
vercel              # preview
vercel --prod       # production
```

The page is fully static; no env vars or runtime config required.
