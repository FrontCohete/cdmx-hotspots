import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowDown } from 'lucide-react'
import { useTypewriter } from '../hooks/useUI'
import { HOTSPOTS } from '../data/hotspots'

const NOTICES = [
  'Este proyecto fue elaborado mediante datos obtenidos de la Fiscalía.',
  'Fuente: carpetas de investigación de la FGJ · Ciudad de México.',
  'Análisis geoespacial con fines informativos y de investigación.',
]

function HeatField() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let running = true

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      canvas.width = w * DPR
      canvas.height = h * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const COLORS = ['#b62c2c', '#9c0f0b', '#bd1748', '#fd6161', '#e8112d']
    const points = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.5 + Math.random() * 2.5,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      p: Math.random() * Math.PI * 3, 
      s: 0.4 + Math.random() * 0.8, 
    }))

    const draw = (t) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      for (const pt of points) {
        const pulse = reduce ? 0.6 : (Math.sin(t / 1000 * pt.s + pt.p) + 1) / 2
        const x = pt.x * w
        const y = pt.y * h
        // halo
        const g = ctx.createRadialGradient(x, y, 0, x, y, pt.r * (6 + pulse * 10))
        g.addColorStop(0, pt.c + '55')
        g.addColorStop(1, pt.c + '00')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, pt.r * (6 + pulse * 10), 0, Math.PI * 2)
        ctx.fill()
        // núcleo
        ctx.fillStyle = pt.c
        ctx.globalAlpha = 0.85
        ctx.beginPath()
        ctx.arc(x, y, pt.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
      if (!reduce && running) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    // Pausar cuando el hero no es visible (rendimiento)
    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting
      if (running && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

export default function Hero() {
  const { text } = useTypewriter(NOTICES)

  return (
    <section
      id="inicio"
      className="map-grid relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-16"
      aria-label="Presentación del proyecto"
    >
      <HeatField />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0f1c_95%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/70 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-heat-cool"
        >
          <MapPin size={13} />
          Análisis en Ciudad de México
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl font-display text-4xl font-black uppercase leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ fontStretch: '85%' }}
        >
          Puntos de <span className="heat-text">incidencia delictiva</span>
        </motion.h1>

        <motion.p style={{ textAlign: 'justify' }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg "
        >
          Directorio de análisis de <strong className="text-paper">hotspots delictivos</strong> en la
          Ciudad de México. Cada mapa identifica concentraciones espaciales de carpetas de
          investigación mediante mapas de calor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#hotspots"
            className="group inline-flex items-center gap-2 rounded-md bg-heat-hot px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#c60e26] hover:shadow-[0_0_28px_rgba(232,17,45,0.35)]"
          >
            Explorar hotspots
            <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <a
            href="#alcaldias"
            className="inline-flex items-center gap-2 rounded-md border border-ink-600 px-6 py-3 font-mono text-sm uppercase tracking-wider text-paper transition-colors duration-300 hover:border-heat-cold hover:text-heat-cool"
          >
            Ver alcaldías
          </a>
          <span className="font-mono text-xs text-muted">
            {HOTSPOTS.length} análisis publicados
          </span>
        </motion.div>
      </div>

      <div className="relative border-t border-ink-700/70 bg-ink-950/70 backdrop-blur-sm">
        <div className="mx-auto flex min-h-[52px] max-w-6xl items-center gap-3 px-5 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-heat-mid" aria-hidden="true">
            <span className="block h-2 w-2 rounded-full bg-heat-mid animate-pulseDot" />
          </span>
          <p
            className="type-caret font-mono text-xs text-muted sm:text-[13px]"
            aria-live="polite"
            aria-label="Este proyecto fue elaborado mediante datos obtenidos de la Fiscalía"
          >
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}
