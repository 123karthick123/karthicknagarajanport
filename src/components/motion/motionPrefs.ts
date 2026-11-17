import { useReducedMotion } from 'framer-motion'

/**
 * `true` when the visitor asked the OS for reduced motion.
 * Every animated component here switches to a plain fade in that case.
 */
export function useCalmMotion(): boolean {
  return useReducedMotion() === true
}

export const EASE_OUT = [0.16, 1, 0.3, 1] as const
