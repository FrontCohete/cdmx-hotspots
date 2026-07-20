import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, ExternalLink, Maximize2, X, Loader2 } from 'lucide-react'
import { HOTSPOTS } from '../data/hotspots'

/* ── Modal de visualización con iframe ─────────────────────── */
function HotspotModal({ hotspot, onClose }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={hotspot.titulo}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/85 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.94, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[92svh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra del modal */}
        <div className="flex items-center justify-between gap-3 border-b border-ink-700 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md" style={{ background: hotspot.color + '22' }}>
              <Flame size={15} style={{ color: hotspot.color }} />
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-display text-sm font-bold uppercase tracking-wide">
                {hotspot.alcaldia}
              </h3>
              <p className="truncate font-mono text-[11px] text-muted">{hotspot.periodo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={hotspot.archivo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-ink-600 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-heat-cold hover:text-heat-cool sm:inline-flex"
            >
              Pestaña nueva <ExternalLink size={12} />
            </a>
            <button
              onClick={onClose}
              aria-label="Cerrar visor"
              className="grid h-9 w-9 place-items-center rounded-md text-muted ring-1 ring-ink-600 transition-colors hover:text-paper hover:ring-heat-hot"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Visor */}
        <div className="relative flex-1 bg-ink-800">
          {loading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-muted">
              <Loader2 size={26} className="animate-spin text-heat-mid" />
              <p className="font-mono text-xs uppercase tracking-widest">Cargando mapa…</p>
            </div>
          )}
          <iframe
            src={hotspot.archivo}
            title={hotspot.titulo}
            className="h-full w-full border-0"
            loading="lazy"
            onLoad={() => setLoading(false)}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Tarjeta de hotspot ────────────────────────────────────── */
function HotspotCard({ hotspot, index, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-xl border border-ink-700 bg-ink-800/60 transition-all duration-300 hover:-translate-y-1 hover:border-ink-600 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]"
    >
      {/* Franja de calor superior */}
      <div
        className="h-1 w-full opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, ${hotspot.color}, #e8112d)` }}
      />

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className="grid h-11 w-11 place-items-center rounded-lg ring-1 ring-inset"
            style={{ background: hotspot.color + '1a', borderColor: hotspot.color, color: hotspot.color, boxShadow: `inset 0 0 0 1px ${hotspot.color}44` }}
          >
            <Flame size={19} />
          </span>
          <span className="rounded-full border border-ink-600 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
            {hotspot.periodo}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold uppercase tracking-tight text-paper">
          {hotspot.alcaldia}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{hotspot.descripcion}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Características del análisis">
          {hotspot.etiquetas.map((t) => (
            <li
              key={t}
              className="rounded bg-ink-700/70 px-2.5 py-1 font-mono text-[11px] text-heat-cool"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => onOpen(hotspot)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-paper px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink-900 transition-colors duration-300 hover:bg-heat-mid"
          >
            <Maximize2 size={13} /> Ver análisis
          </button>
          <a
            href={hotspot.archivo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${hotspot.titulo} en una pestaña nueva`}
            className="grid h-10 w-10 place-items-center rounded-md border border-ink-600 text-muted transition-colors duration-300 hover:border-heat-cold hover:text-heat-cool"
          >
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Sección ───────────────────────────────────────────────── */
export default function Hotspots() {
  const [open, setOpen] = useState(null)

  return (
    <section id="hotspots" className="relative scroll-mt-16 py-24" aria-labelledby="hotspots-title">
      <div className="mx-auto max-w-6xl px-5">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-heat-warm">
            Directorio de análisis
          </p>
          <h2 id="hotspots-title" className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Hotspots
          </h2>
          <div className="heat-rule mt-4 w-24" />
          <p className="mt-5 leading-relaxed text-muted">
            Cada análisis es un mapa interactivo independiente. Ábrelo en el visor integrado o en
            una pestaña nueva para explorar capas, filtros por delito y zonas críticas etiquetadas.
          </p>
        </motion.header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOTSPOTS.map((h, i) => (
            <HotspotCard key={h.id} hotspot={h} index={i} onOpen={setOpen} />
          ))}

          {/* Tarjeta de próximos análisis */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: HOTSPOTS.length * 0.08 }}
            className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-ink-600 p-6 text-center"
          >
            <span className="mb-3 grid h-11 w-11 place-items-center rounded-full border border-ink-600 text-muted">
              <Flame size={18} />
            </span>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-muted">
              Más alcaldías en camino
            </p>
            <p className="mt-2 max-w-[26ch] text-xs leading-relaxed text-muted/70">
              Nuevos análisis se integran a este directorio conforme se publican.
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && <HotspotModal hotspot={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
