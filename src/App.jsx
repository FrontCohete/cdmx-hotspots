import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollIndex from './components/ScrollIndex'
import Hotspots from './components/Hotspots'
import Alcaldias from './components/Alcaldias'
import Footer from './components/Footer'
import { useScrollSpy } from './hooks/useUI'

const SECTION_IDS = ['inicio', 'hotspots', 'alcaldias', 'contacto']

export default function App() {
  const active = useScrollSpy(SECTION_IDS)

  /* ── Disuasión ligera de clonación ─────────────────────────
     Nota honesta: ningún sitio público puede impedir al 100% la
     copia de su contenido. Estas medidas elevan la fricción sin
     dañar la accesibilidad ni la experiencia:
     - Menú contextual deshabilitado sobre el contenido visual
     - Marca de autoría en consola (atribución verificable)
     - Build minificado sin sourcemaps (ver vite.config.js)      */
  useEffect(() => {
    const onContext = (e) => {
      // Permitir clic derecho en enlaces y campos de texto (usabilidad)
      if (e.target.closest('a, input, textarea, iframe')) return
      e.preventDefault()
    }
    document.addEventListener('contextmenu', onContext)

    console.log(
      '%c◉ Hotspots CDMX %c\nProyecto original protegido por derechos de autor.\nSi te interesa el código o una colaboración, contáctame por LinkedIn.',
      'color:#e8112d;font-weight:bold;font-size:14px',
      'color:#8b97ad;font-size:12px'
    )

    return () => document.removeEventListener('contextmenu', onContext)
  }, [])

  return (
    <>
      {/* Enlace de salto para accesibilidad */}
      <a
        href="#hotspots"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-heat-mid focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink-900"
      >
        Saltar al contenido
      </a>

      <Navbar active={active} />
      <ScrollIndex active={active} />

      <main>
        <Hero />
        <Hotspots />
        <Alcaldias />
      </main>

      <Footer />
    </>
  )
}
