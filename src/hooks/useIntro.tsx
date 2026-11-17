import { createContext, useContext, type ReactNode } from 'react'

/** True once the intro curtain has finished opening. */
const IntroContext = createContext(true)

export function IntroProvider({ done, children }: { done: boolean; children: ReactNode }) {
  return <IntroContext.Provider value={done}>{children}</IntroContext.Provider>
}

/** Components use this to hold their entrance back until the curtain is open. */
export function useIntroDone() {
  return useContext(IntroContext)
}
