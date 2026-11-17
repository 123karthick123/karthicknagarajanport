import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'kn-theme'

interface ThemeContextValue {
  theme: Theme
  isDark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light') return 'light'
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* private mode / blocked storage — the attribute above is still correct */
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, isDark: theme === 'dark', toggle }),
    [theme, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
