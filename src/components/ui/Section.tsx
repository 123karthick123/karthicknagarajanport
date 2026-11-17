import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Reveal, RevealText } from '../motion/RevealText'
import { useCalmMotion } from '../motion/motionPrefs'
import { AnimatedIcon, type IconComponent } from './AnimatedIcon'

export function Eyebrow({ icon, children }: { icon: IconComponent; children: ReactNode }) {
  return (
    <Reveal className="mb-4 flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface-2 text-accent">
        <AnimatedIcon icon={icon} size={15} hover="swing" />
      </span>
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{children}</span>
    </Reveal>
  )
}

interface SectionProps {
  id: string
  eyebrow: string
  eyebrowIcon: IconComponent
  heading: string
  accentWords?: readonly string[]
  lede?: string
  children: ReactNode
}

export function Section({
  id,
  eyebrow,
  eyebrowIcon,
  heading,
  accentWords,
  lede,
  children,
}: SectionProps) {
  const calm = useCalmMotion()
  const ref = useRef<HTMLElement>(null)
  /* scroll-linked parallax: the header drifts a little slower than the page */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 1], calm ? [0, 0] : [34, -34])
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.85, 1],
    calm ? [1, 1, 1, 1] : [0.35, 1, 1, 0.5],
  )

  return (
    <section id={id} ref={ref} className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="shell">
        <motion.header className="mb-10 sm:mb-14" style={{ y: headerY, opacity: headerOpacity }}>
          <Eyebrow icon={eyebrowIcon}>{eyebrow}</Eyebrow>
          <RevealText as="h2" className="t-h2" text={heading} accentWords={accentWords} />
          {lede && (
            <Reveal delay={0.12}>
              <p className="lede t-body mt-5">{lede}</p>
            </Reveal>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  )
}
