import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { useRef } from 'react'
import { contact, profile } from '../../data/profile'
import { useIntroDone } from '../../hooks/useIntro'
import { onSectionLinkClick } from '../../lib/scroll'
import { EASE_OUT, useCalmMotion } from '../motion/motionPrefs'
import { HeroBand } from './HeroBand'
import { Typewriter } from './Typewriter'

/** The hero is its own cinematic band: always dark, whatever the theme. */
const INK = '#07070a'

const socials = [
  { href: contact.github, icon: Github, label: 'GitHub' },
  { href: contact.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: `mailto:${contact.email}`, icon: Mail, label: 'Email' },
]

export function Hero() {
  const calm = useCalmMotion()
  const introDone = useIntroDone()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const photoY = useTransform(scrollYProgress, [0, 1], [0, calm ? 0 : 90])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, calm ? 1 : 1.12])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, calm ? 0 : 70])
  const copyFade = useTransform(scrollYProgress, [0, 0.75], [1, calm ? 1 : 0])

  const slide = (from: number) => ({
    initial: { opacity: 0, x: calm ? 0 : from },
    animate: introDone ? { opacity: 1, x: 0 } : { opacity: 0, x: calm ? 0 : from },
    transition: { duration: calm ? 0.4 : 1.2, ease: EASE_OUT },
  })

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: calm ? 0 : 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: calm ? 0 : 24 },
    transition: { duration: calm ? 0.4 : 0.9, ease: EASE_OUT, delay: calm ? 0 : delay },
  })

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-28 pt-20 sm:pb-36 sm:pt-24"
      style={{ background: INK, color: '#fff' }}
    >
      {/* portrait, bleeding off the right edge */}
      <motion.div
        className="absolute inset-y-0 right-0 w-full sm:w-[78%] lg:w-[62%]"
        style={{ y: photoY, scale: photoScale, willChange: 'transform' }}
        {...slide(calm ? 0 : 110)}
      >
        <img
          src={profile.heroPhoto}
          alt={`${profile.name}, ${profile.role}`}
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-[62%_center]"
        />
        {/* fade the photo into the ink on every edge */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${INK} 2%, rgba(7,7,10,.86) 28%, rgba(7,7,10,.25) 62%, rgba(7,7,10,.45) 100%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 sm:hidden"
          style={{ background: 'rgba(7,7,10,.55)' }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: `linear-gradient(180deg, transparent, ${INK})` }}
        />
      </motion.div>

      {/* centre block */}
      <motion.div
        className="shell relative z-10 flex flex-col items-center text-center"
        style={{ y: copyY, opacity: copyFade, willChange: 'transform, opacity' }}
      >
        <motion.ul
          className="flex items-center gap-5 sm:gap-7"
          {...rise(0.05)}
        >
          {socials.map(({ href, icon: Icon, label }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white sm:text-[11px]"
              >
                <Icon size={12} aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </motion.ul>

        {/* outlined display name */}
        <motion.h1
          className="hollow mt-6 font-display font-extrabold uppercase leading-[0.95] tracking-[0.01em] sm:mt-8 sm:whitespace-nowrap"
          style={{ fontSize: 'clamp(2.35rem, 7.4vw, 6rem)' }}
          {...rise(0.15)}
        >
          <span className="sr-only">{profile.name}</span>
          {/* stacks onto two lines on phones, one line from 640px up */}
          <span aria-hidden className="block sm:inline">
            Karthick
          </span>{' '}
          <span aria-hidden className="block sm:inline">
            Nagarajan
          </span>
        </motion.h1>

        <motion.div className="mt-6 sm:mt-8" {...rise(0.25)}>
          <Typewriter
            words={profile.heroRoles}
            bare
            className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/75 sm:text-xs"
          />
        </motion.div>

        <motion.a
          href="#projects"
          onClick={onSectionLinkClick('projects')}
          className="group mt-9 inline-flex items-center gap-3 rounded-full border border-white/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-white/70 sm:mt-11"
          {...rise(0.35)}
        >
          Hire me now
          <ArrowUpRight
            size={15}
            aria-hidden
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </motion.a>
      </motion.div>

      {/* foot of the hero: stack ticker over the status row */}
      <motion.div {...rise(0.55)}>
        <HeroBand />
      </motion.div>
    </section>
  )
}
