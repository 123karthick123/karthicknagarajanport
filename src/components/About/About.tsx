import { motion, useScroll, useTransform } from 'framer-motion'
import { Download } from 'lucide-react'
import { useRef } from 'react'
import { aboutFacts, contact, profile } from '../../data/profile'
import { Reveal, RevealText } from '../motion/RevealText'
import { useCalmMotion } from '../motion/motionPrefs'

export function About() {
  const calm = useCalmMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const markY = useTransform(scrollYProgress, [0, 1], calm ? [0, 0] : [50, -50])

  return (
    <section id="about" ref={ref} className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28">
      <div className="shell relative">
        {/* oversized watermark behind the section */}
        <motion.span
          aria-hidden
          style={{ y: markY }}
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[clamp(3.5rem,13vw,10rem)] font-extrabold uppercase leading-none tracking-tight text-text opacity-[0.055]"
        >
          About me
        </motion.span>

        <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          {/* portrait */}
          <Reveal>
            <div className="group relative mx-auto w-full max-w-[360px] lg:max-w-none">
              <div
                className="relative aspect-square overflow-hidden rounded-2xl border"
                style={{ borderColor: 'var(--border)' }}
              >
                <img
                  src={profile.aboutPhoto}
                  alt={`${profile.name} in the studio`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                  style={{
                    background: 'linear-gradient(160deg, transparent, rgba(var(--glow), .22))',
                  }}
                />
              </div>

              {/* accent dot, as in the reference */}
              <motion.span
                aria-hidden
                className="absolute bottom-6 right-6 h-3 w-3 rounded-full"
                style={{ background: 'var(--accent)' }}
                animate={calm ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </Reveal>

          {/* copy */}
          <div>
            <RevealText
              as="h2"
              className="t-h2"
              text={`Hi There! I'm ${profile.shortName} Nagarajan`}
              accentWords={[profile.shortName, 'Nagarajan']}
            />

            <Reveal delay={0.12}>
              <p className="mt-3 font-display text-xl font-bold sm:text-2xl" style={{ color: 'var(--accent)' }}>
                {profile.role}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {profile.title}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="lede t-body mt-5">{profile.about[0]}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="lede t-body mt-4">{profile.about[1]}</p>
            </Reveal>

            <Reveal delay={0.28}>
              <dl className="mt-8 space-y-3">
                {aboutFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid grid-cols-[6rem_auto_1fr] items-baseline gap-x-2 sm:grid-cols-[7.5rem_auto_1fr] sm:gap-x-3"
                  >
                    <dt className="t-small text-muted">{fact.label}</dt>
                    <span aria-hidden className="t-small text-muted">
                      :
                    </span>
                    <dd className="t-small font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.36}>
              <a
                href={contact.cv}
                download
                className="mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--accent)' }}
              >
                <Download size={17} aria-hidden />
                Download CV
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
