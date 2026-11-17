import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
} from 'framer-motion'
import {
  Folder,
  Home,
  Layers,
  Mail,
  Menu,
  Moon,
  Route,
  Sun as SunIcon,
  User,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems } from '../../data/profile'
import { useIntroDone } from '../../hooks/useIntro'
import { usePointerLight } from '../../hooks/usePointerLight'
import { onSectionLinkClick } from '../../lib/scroll'
import { useTheme } from '../../theme/ThemeProvider'
import { AnimatedIcon, type IconComponent } from '../ui/AnimatedIcon'
import { useCalmMotion } from '../motion/motionPrefs'

const icons: Record<string, IconComponent> = {
  home: Home,
  user: User,
  layers: Layers,
  folder: Folder,
  route: Route,
  mail: Mail,
}

export function Nav() {
  const { isDark, toggle } = useTheme()
  const { x, flash } = usePointerLight()
  const calm = useCalmMotion()
  const introDone = useIntroDone()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('home')
  const [pulse, setPulse] = useState(false)

  const glowX = useMotionTemplate`${x}px`

  useEffect(() => {
    if (!flash) return
    setPulse(true)
    const t = window.setTimeout(() => setPulse(false), 300)
    return () => window.clearTimeout(t)
  }, [flash])

  /* Highlight the section currently in view. */
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el))
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.6] },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: calm ? 0 : '-110%', opacity: calm ? 0 : 1 }}
      animate={introDone ? { y: 0, opacity: 1 } : { y: calm ? 0 : '-110%', opacity: calm ? 0 : 1 }}
      transition={{ duration: calm ? 0.4 : 0.85, ease: [0.16, 1, 0.3, 1], delay: calm ? 0 : 0.05 }}
    >
      <nav
        aria-label="Primary"
        className="relative border-b backdrop-blur-xl"
        style={{ background: 'var(--nav-bg)', borderColor: 'var(--border)' }}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          <a
            href="#home"
            onClick={onSectionLinkClick('home')}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl font-display text-sm font-extrabold text-white"
              style={{ background: 'linear-gradient(140deg, var(--accent), var(--accent-2))' }}
            >
              KN
            </span>
            <span className="hidden font-display text-sm font-bold tracking-tight sm:block">
              Karthick<span className="text-muted"> Nagarajan</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = icons[item.icon]
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={onSectionLinkClick(item.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className="group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    style={{ color: isActive ? 'var(--text)' : 'var(--muted)' }}
                  >
                    <AnimatedIcon icon={Icon} size={15} hover="bounce" draw={false} />
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-lg"
                        style={{ background: 'rgba(var(--glow), 0.12)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <motion.button
              type="button"
              onClick={toggle}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="flex h-10 w-10 items-center justify-center rounded-xl border bg-surface-2"
              style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
              whileTap={calm ? undefined : { scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -70, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 70, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.28 }}
                  className="flex"
                >
                  {isDark ? <Moon size={18} aria-hidden /> : <SunIcon size={18} aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-xl border bg-surface-2 md:hidden"
              style={{ borderColor: 'var(--border)' }}
            >
              {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
            </button>
          </div>
        </div>

        {/* scroll progress bar */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
          style={{
            scaleX: progress,
            background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
          }}
        />

        {/* nav bottom edge glow that follows the pointer's x position */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[-14px] h-[14px] w-[320px] -translate-x-1/2"
          style={{
            left: glowX,
            background:
              'radial-gradient(60% 100% at 50% 0%, rgba(var(--glow), 0.75), transparent 72%)',
          }}
          animate={{ opacity: pulse ? 1 : 0.5, scaleY: pulse ? 1.7 : 1 }}
          transition={{ duration: 0.25 }}
        />
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b backdrop-blur-xl md:hidden"
            style={{ background: 'var(--nav-bg)', borderColor: 'var(--border)' }}
          >
            {navItems.map((item) => {
              const Icon = icons[item.icon]
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      setOpen(false)
                      onSectionLinkClick(item.id)(e)
                    }}
                    className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium"
                    style={{ color: active === item.id ? 'var(--accent)' : 'var(--text)' }}
                  >
                    <Icon size={16} aria-hidden />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
