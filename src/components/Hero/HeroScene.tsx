import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { profile } from '../../data/profile'
import { useCalmMotion } from '../motion/motionPrefs'
import { Sparkle } from '../ui/Sparkle'

const SPRING = { stiffness: 130, damping: 16, mass: 0.4 }

/**
 * Hero portrait. A tinted photo in a soft accent card that:
 *  - fades and scales in on mount,
 *  - drifts up and down forever,
 *  - tilts in 3D towards the pointer, with a glare that follows it,
 *  - sweeps a shimmer across the glass every few seconds,
 *  - drops the duotone and greyscale on hover so the real photo shows through.
 *
 * Every one of those is switched off under reduced motion.
 */
export default function HeroScene() {
  const calm = useCalmMotion()

  /* pointer position inside the card, -0.5 … 0.5 on each axis */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, SPRING)
  const sy = useSpring(py, SPRING)

  const rotateY = useTransform(sx, [-0.5, 0.5], calm ? [0, 0] : [-13, 13])
  const rotateX = useTransform(sy, [-0.5, 0.5], calm ? [0, 0] : [10, -10])
  const glareX = useTransform(sx, [-0.5, 0.5], ['15%', '85%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['15%', '85%'])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,.35), transparent 55%)`

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (calm || e.pointerType === 'touch') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      className="relative h-full w-full [perspective:1200px]"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* breathing glow behind the card */}
      <motion.div
        aria-hidden
        className="absolute inset-4 rounded-[40px] blur-2xl sm:blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(var(--glow), .35), transparent 70%)' }}
        animate={calm ? undefined : { opacity: [0.65, 1, 0.65], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* entrance */}
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, scale: calm ? 1 : 0.92, y: calm ? 0 : 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: calm ? 0.4 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {/* slow drift */}
        <motion.div
          className="h-full w-full"
          animate={calm ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* pointer tilt */}
          <motion.div
            className="group relative h-full w-full [transform-style:preserve-3d]"
            style={{ rotateX, rotateY }}
          >
            {/* sparkles, lifted off the card in 3D */}
            <motion.div
              aria-hidden
              className="absolute -left-3 -top-5 z-20 sm:-left-5 sm:-top-8"
              style={{ z: 60 }}
              animate={calm ? undefined : { rotate: [0, 20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkle className="h-9 w-9 sm:h-12 sm:w-12 lg:h-14 lg:w-14" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -right-2 top-1/4 z-20"
              style={{ z: 40 }}
              animate={calm ? undefined : { rotate: [0, -25, 0], scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            >
              <Sparkle className="h-5 w-5 sm:h-7 sm:w-7" color="var(--accent-2)" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -bottom-3 left-6 z-20"
              style={{ z: 30 }}
              animate={calm ? undefined : { rotate: [0, 30, 0], scale: [1, 0.8, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            >
              <Sparkle className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.div>

            {/* rotating conic border */}
            <div className="relative h-full w-full overflow-hidden rounded-[24px] p-[2px] shadow-glow sm:rounded-[30px]">
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, var(--accent) 70deg, var(--accent-2) 150deg, transparent 240deg, transparent 360deg)',
                }}
                animate={calm ? undefined : { rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              />

              <div
                className="relative h-full w-full overflow-hidden rounded-[22px] sm:rounded-[28px]"
                style={{ background: 'linear-gradient(150deg, var(--accent), var(--accent-2))' }}
              >
                <img
                  src={profile.photo}
                  alt={`${profile.name}, ${profile.role}`}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                />

                {/* duotone tint — fades out on hover to reveal the real photo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-0"
                  style={{
                    background: 'linear-gradient(150deg, var(--accent), var(--accent-2))',
                    mixBlendMode: 'color',
                    opacity: 0.75,
                  }}
                />

                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(0,0,0,.28))' }}
                />

                {/* glare that follows the pointer */}
                {!calm && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundImage: glare, mixBlendMode: 'soft-light' }}
                  />
                )}

                {/* periodic shimmer sweep */}
                {!calm && (
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)',
                    }}
                    animate={{ x: ['-160%', '420%'] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 4.5,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
