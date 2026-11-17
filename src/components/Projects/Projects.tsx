import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import { projects, type Project } from '../../data/profile'
import { onSectionLinkClick } from '../../lib/scroll'
import { Reveal, RevealText } from '../motion/RevealText'
import { EASE_OUT, useCalmMotion } from '../motion/motionPrefs'
import { ProjectGallery } from './ProjectGallery'
import { SyncFlow } from './SyncFlow'

export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      {/* faint vertical rules, like the reference's grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, var(--border) 0 1px, transparent 1px 12.5%)',
          opacity: 0.5,
          maskImage: 'linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      />

      <div className="shell relative">
        <header className="mb-16 text-center sm:mb-24">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Latest Works</p>
          </Reveal>
          <RevealText
            as="h2"
            className="t-h2 mt-4"
            text="Explore My Popular Projects"
            accentWords={['Projects']}
          />
        </header>

        <div className="space-y-20 sm:space-y-28 lg:space-y-36">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  const calm = useCalmMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px 0px' })
  /** even rows put the shot on the left, odd rows mirror it */
  const imageFirst = index % 2 === 0

  const enter = (from: number, delay = 0) => ({
    initial: { opacity: 0, x: calm ? 0 : from, y: calm ? 0 : 20 },
    animate: inView ? { opacity: 1, x: 0, y: 0 } : undefined,
    transition: { duration: calm ? 0.35 : 0.85, ease: EASE_OUT, delay: calm ? 0 : delay },
  })

  return (
    <article ref={ref} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <motion.div
        className={imageFirst ? 'lg:order-1' : 'lg:order-2'}
        {...enter(imageFirst ? -50 : 50)}
      >
        <ProjectGallery shots={p.shots} name={p.name} />
      </motion.div>

      <motion.div
        className={imageFirst ? 'lg:order-2' : 'lg:order-1'}
        {...enter(imageFirst ? 50 : -50, 0.12)}
      >
        <p
          className="font-mono text-sm font-semibold tracking-wide"
          style={{ color: 'var(--accent)' }}
        >
          {p.kind}
        </p>

        <h3 className="mt-3 font-display text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-[2.6rem]">
          {p.name}
        </h3>

        <p className="lede t-body mt-5">{p.tagline}</p>

        <ul className="mt-6 space-y-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-muted">
              <span
                aria-hidden
                className="mt-[0.55em] h-1 w-1 flex-none rounded-full"
                style={{ background: 'var(--accent)' }}
              />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li
              key={s}
              className="rounded-lg px-2.5 py-1 font-mono text-xs"
              style={{ background: 'rgba(var(--glow), 0.12)', color: 'var(--accent)' }}
            >
              {s}
            </li>
          ))}
        </ul>

        {p.syncDiagram && <SyncFlow />}

        {/* circular arrow — the live site when there is one, otherwise a way to ask about it */}
        {p.link ? (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit ${p.name}`}
            className="mt-8 inline-block"
          >
            <ArrowBadge />
          </a>
        ) : (
          <a
            href="#contact"
            onClick={onSectionLinkClick('contact')}
            aria-label={`Ask me about ${p.name}`}
            className="mt-8 inline-block"
          >
            <ArrowBadge />
          </a>
        )}
      </motion.div>
    </article>
  )
}

function ArrowBadge() {
  return (
    <motion.span
      className="flex h-14 w-14 items-center justify-center rounded-full border border-line text-accent"
      whileHover={{ scale: 1.08, borderColor: 'var(--accent)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
    >
      <ArrowUpRight size={22} aria-hidden />
    </motion.span>
  )
}
