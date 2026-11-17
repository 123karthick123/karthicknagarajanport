import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'

interface PointerLight {
  /** smoothed pointer position in px, viewport coordinates */
  x: MotionValue<number>
  y: MotionValue<number>
  /** true while a real pointer is driving the light */
  active: boolean
  /** increments on every click / tap so layers can flash */
  flash: number
}

const PointerLightContext = createContext<PointerLight | null>(null)

const IDLE_AFTER = 2200

export function PointerLightProvider({ children }: { children: ReactNode }) {
  const vw = typeof window === 'undefined' ? 1024 : window.innerWidth
  const rawX = useMotionValue(vw / 2)
  const rawY = useMotionValue(260)
  const x = useSpring(rawX, { stiffness: 90, damping: 20, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 90, damping: 20, mass: 0.6 })

  const [active, setActive] = useState(false)
  const [flash, setFlash] = useState(0)
  const idleTimer = useRef<number | undefined>(undefined)
  const activeRef = useRef(false)

  const markActive = useCallback(() => {
    activeRef.current = true
    setActive(true)
    window.clearTimeout(idleTimer.current)
    idleTimer.current = window.setTimeout(() => {
      activeRef.current = false
      setActive(false)
    }, IDLE_AFTER)
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      markActive()
    }
    const onDown = () => {
      setFlash((f) => f + 1)
      markActive()
    }
    const onLeave = () => {
      activeRef.current = false
      setActive(false)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerleave', onLeave)
      window.clearTimeout(idleTimer.current)
    }
  }, [markActive, rawX, rawY])

  /* Gentle self-sway while nobody is pointing — paused when the tab hides. */
  useEffect(() => {
    let frame = 0
    let stopped = false
    const loop = (t: number) => {
      if (stopped) return
      if (!activeRef.current && !document.hidden) {
        const w = window.innerWidth
        rawX.set(w / 2 + Math.sin(t / 2400) * Math.min(w * 0.22, 280))
        rawY.set(300 + Math.sin(t / 3600) * 60)
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    const onVis = () => {
      if (!document.hidden) frame = requestAnimationFrame(loop)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      stopped = true
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [rawX, rawY])

  const value = useMemo(() => ({ x, y, active, flash }), [x, y, active, flash])

  return <PointerLightContext.Provider value={value}>{children}</PointerLightContext.Provider>
}

export function usePointerLight(): PointerLight {
  const ctx = useContext(PointerLightContext)
  if (!ctx) throw new Error('usePointerLight must be used inside <PointerLightProvider>')
  return ctx
}
