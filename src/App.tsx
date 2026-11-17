import { useEffect, useState } from 'react'
import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { Hero } from './components/Hero/Hero'
import { LampLayer } from './components/Lamp/LampLayer'
import { Nav } from './components/Nav/Nav'
import { Projects } from './components/Projects/Projects'
import { Skills } from './components/Skills/Skills'
import { SunLayer } from './components/Sun/SunLayer'
import { Timeline } from './components/Timeline/Timeline'
import { BackToTop } from './components/ui/BackToTop'
import { PageLoader } from './components/ui/PageLoader'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { IntroProvider } from './hooks/useIntro'
import { PointerLightProvider } from './hooks/usePointerLight'
import { useTheme } from './theme/ThemeProvider'

/** Minimum time the curtain stays shut, so it never flashes on a warm cache. */
const MIN_LOADER_MS = 1100
/** Hard ceiling, in case a slow asset never fires `load`. */
const MAX_LOADER_MS = 4000

export default function App() {
  const { isDark } = useTheme()
  /** assets are in — the curtain may start opening */
  const [ready, setReady] = useState(false)
  /** the curtain has finished opening and can leave the DOM */
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    const started = performance.now()
    let settle: number | undefined

    const settleNow = () => {
      const waited = performance.now() - started
      settle = window.setTimeout(() => setReady(true), Math.max(0, MIN_LOADER_MS - waited))
    }

    /* Wait for the webfonts too — otherwise the swap reflows the nav and the
       headline about a second after the curtain has already opened. */
    const finish = () => {
      if (document.fonts?.status === 'loaded') settleNow()
      else if (document.fonts?.ready) void document.fonts.ready.then(settleNow)
      else settleNow()
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    const cap = window.setTimeout(() => setReady(true), MAX_LOADER_MS)
    /* last resort: never leave the page stuck behind the curtain */
    const hardStop = window.setTimeout(() => setIntro(false), MAX_LOADER_MS + 2500)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(settle)
      window.clearTimeout(cap)
      window.clearTimeout(hardStop)
    }
  }, [])

  /* hold the page still while the curtain is up */
  useEffect(() => {
    document.body.style.overflow = intro ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [intro])

  return (
    <PointerLightProvider>
      <IntroProvider done={!intro}>
        {intro && <PageLoader ready={ready} onDone={() => setIntro(false)} />}

        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>

        <ScrollProgress />

        {isDark ? <LampLayer /> : <SunLayer />}
        <div aria-hidden className="page-texture" />

        <Nav />

        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
        </main>

        <Footer />
        <BackToTop />
      </IntroProvider>
    </PointerLightProvider>
  )
}
