import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Award, Briefcase, GraduationCap, Route } from 'lucide-react'
import { useRef } from 'react'
import { timeline, type TimelineItem } from '../../data/profile'
import { Reveal } from '../motion/RevealText'
import { useCalmMotion } from '../motion/motionPrefs'
import { AnimatedIcon, type IconComponent } from '../ui/AnimatedIcon'
import { Section } from '../ui/Section'

const kindIcon: Record<TimelineItem['kind'], IconComponent> = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
}

const kindLabel: Record<TimelineItem['kind'], string> = {
  work: 'Experience',
  education: 'Education',
  certification: 'Certification',
}

export function Timeline() {
  const calm = useCalmMotion()
  const trackRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 80%', 'end 55%'],
  })
  const raw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const scaleY = useTransform(raw, (v) => (calm ? 1 : v))

  return (
    <Section
      id="journey"
      eyebrow="Journey"
      eyebrowIcon={Route}
      heading="Experience and education"
      accentWords={['Experience']}
    >
      <ol ref={trackRef} className="relative ml-1 space-y-8 pl-8 sm:pl-10">
        {/* static rail */}
        <span
          aria-hidden
          className="absolute left-[7px] top-1 h-full w-[2px] rounded"
          style={{ background: 'var(--border)' }}
        />
        {/* rail that draws as you scroll */}
        <motion.span
          aria-hidden
          className="absolute left-[7px] top-1 h-full w-[2px] origin-top rounded"
          style={{
            scaleY,
            background: 'linear-gradient(var(--accent), var(--accent-2))',
          }}
        />

        {timeline.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08}>
            <li className="relative">
              <span
                aria-hidden
                className="absolute left-[-33px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 sm:left-[-41px]"
                style={{ background: 'var(--bg)', borderColor: 'var(--accent)' }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: 'var(--accent-2)' }}
                />
              </span>

              <div className="card p-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface-2"
                    style={{ color: 'var(--accent)' }}
                  >
                    <AnimatedIcon icon={kindIcon[item.kind]} size={16} hover="bounce" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                      {kindLabel[item.kind]}
                    </p>
                    <h3 className="t-h3 font-display">{item.title}</h3>
                  </div>
                  <span
                    className="ml-auto rounded-lg px-2.5 py-1 font-mono text-xs"
                    style={{ background: 'rgba(var(--glow), 0.12)', color: 'var(--accent)' }}
                  >
                    {item.period}
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold">{item.org}</p>

                {item.bullets.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {item.bullets.map((b, bi) => (
                      <motion.li
                        key={b}
                        className="flex gap-2.5 text-sm text-muted"
                        initial={{ opacity: 0, x: calm ? 0 : -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ delay: calm ? 0 : bi * 0.07, duration: 0.4 }}
                      >
                        <span aria-hidden style={{ color: 'var(--accent-2)' }}>
                          —
                        </span>
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
