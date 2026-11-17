import { motion, useMotionTemplate, useTransform } from 'framer-motion'
import { useEffect, useState, type CSSProperties } from 'react'
import { usePointerLight } from '../../hooks/usePointerLight'
import { useCalmMotion } from '../motion/motionPrefs'

const PIVOT_Y = 72 // px below the top of the viewport — just under the nav

/**
 * Dark-mode signature layer: the page is dark except for the cone thrown by a
 * lamp hanging under the nav, which swings toward the pointer. Reduced motion
 * gets a still, softer vignette instead of a tracking cone.
 */
export function LampLayer() {
  const { x, y, flash } = usePointerLight()
  const calm = useCalmMotion()
  const [pivotX, setPivotX] = useState(() =>
    typeof window === 'undefined' ? 512 : window.innerWidth / 2,
  )
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    const onResize = () => setPivotX(window.innerWidth / 2)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!flash) return
    setBurst(true)
    const t = window.setTimeout(() => setBurst(false), 260)
    return () => window.clearTimeout(t)
  }, [flash])

  const angle = useTransform([x, y], (latest: number[]) => {
    const dx = latest[0] - pivotX
    const dy = Math.max(latest[1] - PIVOT_Y, 120)
    const deg = (Math.atan2(dx, dy) * 180) / Math.PI
    return Math.max(-34, Math.min(34, deg))
  })

  const coneX = useMotionTemplate`${x}px`
  const coneY = useMotionTemplate`${y}px`

  if (calm) {
    return (
      <div
        aria-hidden
        className="lamp-dark"
        style={
          {
            '--cone-x': '50%',
            '--cone-y': '38%',
            '--cone-r': '520px',
            background: 'rgba(2, 4, 12, 0.6)',
          } as CSSProperties
        }
      />
    )
  }

  return (
    <>
      {/* darkness with a hole where the light lands */}
      <motion.div
        aria-hidden
        className="lamp-dark"
        style={
          {
            '--cone-x': coneX,
            '--cone-y': coneY,
            '--cone-r': burst ? '460px' : '350px',
          } as unknown as CSSProperties
        }
      />

      {/* the lamp itself: pivot, cord, shade, bulb and the light cone */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[31] overflow-hidden">
        <motion.div
          className="absolute left-1/2 origin-top"
          style={{ top: PIVOT_Y - 26, rotate: angle }}
        >
          <div className="relative -translate-x-1/2">
            <div
              className="mx-auto h-6 w-px"
              style={{ background: 'linear-gradient(rgba(var(--glow),.7), rgba(var(--glow),.25))' }}
            />
            {/* shade */}
            <div
              className="mx-auto h-4 w-11"
              style={{
                background: 'linear-gradient(180deg, var(--surface-2), var(--surface))',
                border: '1px solid var(--border)',
                borderRadius: '10px 10px 3px 3px',
                clipPath: 'polygon(22% 0, 78% 0, 100% 100%, 0 100%)',
              }}
            />
            {/* bulb */}
            <motion.div
              className="mx-auto h-2 w-2 rounded-full"
              style={{ background: 'rgb(var(--glow))' }}
              animate={{
                boxShadow: burst
                  ? '0 0 26px 10px rgba(var(--glow),.85)'
                  : '0 0 14px 4px rgba(var(--glow),.55)',
              }}
              transition={{ duration: 0.22 }}
            />
            {/* cone */}
            <motion.div
              className="lamp-cone -translate-x-1/2"
              style={{ left: '50%', position: 'absolute', top: '100%' }}
              animate={{ opacity: burst ? 0.95 : 0.7 }}
              transition={{ duration: 0.22 }}
            />
          </div>
        </motion.div>
      </div>
    </>
  )
}
