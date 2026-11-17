# B. Karthick Nagarajan — Portfolio

Personal portfolio site for a Full-Stack Developer from Madurai, Tamil Nadu. Built as a real Vite project, not a template.

## Stack

| Concern    | Choice                                        |
| ---------- | --------------------------------------------- |
| Build      | Vite 5 + React 18 + TypeScript (strict)       |
| Styling    | Tailwind CSS 3 over CSS-variable theme tokens |
| Animation  | Framer Motion                                 |
| Icons      | lucide-react, animated with Framer Motion     |
| 3D         | three + @react-three/fiber + @react-three/drei |

Single page, so no router is included.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # type-checks, then emits dist/
npm run preview    # serve the production build locally
```

## Editing content

**All copy lives in [`src/data/profile.ts`](src/data/profile.ts).** Summary, about paragraphs, skills, projects, timeline, nav items and contact details are there — components never hold content.

Two values are placeholders you should replace:

```ts
// src/data/profile.ts
export const contact = {
  linkedin: 'https://www.linkedin.com/in/your-linkedin-handle',
  github: 'https://github.com/your-github-handle',
}
```

## Theme: lamp and sun

- **Dark (default).** A lamp hangs under the nav bar, swings toward the pointer and lights a cone of the page while the rest stays dark. The nav's bottom edge glows at the pointer's x position and flashes on click or tap. With no pointer, the lamp sways on its own.
- **Light.** No lamp and no darkness. A warm sun with slowly rotating rays sits at the top right, over a sunlit wash.
- The toggle lives in the nav, persists to `localStorage` under `kn-theme`, and defaults to dark. `index.html` applies the stored theme before first paint so there is no flash.
- Everything reads from `data-theme` plus CSS variables in [`src/index.css`](src/index.css) — change a token there and every component follows.

## Motion

Headings and the hero name reveal word by word out of a clipped mask on scroll (`whileInView`, `once: true`); paragraphs fade and rise with a stagger; the nav carries a scroll progress bar; the timeline rail draws as you scroll; the hero 3D object parallaxes. `prefers-reduced-motion: reduce` switches all of it to plain fades, stops the sun and lamp motion, and freezes icon draw-in.

## Performance notes

- The 3D scene is `React.lazy` + `Suspense`, so three.js is a separate chunk loaded after first paint.
- Canvas `dpr` is capped at `[1, 2]`.
- The render loop is set to `never` when the hero scrolls off-screen or the tab is hidden; the lamp's idle sway loop also stops on `visibilitychange`.

## Project structure

```
src/
  App.tsx
  main.tsx
  index.css              theme tokens, type scale, lamp/sun layers
  data/profile.ts         all content
  theme/ThemeProvider.tsx data-theme + localStorage
  hooks/usePointerLight.tsx  shared pointer motion values, idle sway, click flash
  components/
    motion/      RevealText, Reveal, motion preferences
    ui/          Section, Eyebrow, AnimatedIcon
    Nav/ Hero/ About/ Skills/ Projects/ Timeline/ Contact/ Footer/
    Lamp/ Sun/
```

## Deploy

### Vercel

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Or import the repo at vercel.com — the defaults are already right: framework **Vite**, build `npm run build`, output `dist`.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build            # preview
netlify deploy --build --prod     # production
```

Or connect the repo with build command `npm run build` and publish directory `dist`. A single page with hash links needs no redirect rules; if you later add React Router, add `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Accessibility

Semantic landmarks, a skip link, visible focus rings via `--ring`, `aria-label` on every icon-only button and link, `aria-current` on the active nav link, `role="img"` with a description on the sync diagram, and a polite live region confirming clipboard copies. Decorative layers (lamp, sun, texture) are `aria-hidden`.
