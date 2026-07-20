import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ArrowDownAZ, Users, FileText, Flame } from 'lucide-react'
import { ALCALDIAS, tasa100k } from '../data/alcaldias'

const SORTS = [
  { id: 'desc', label: 'Más crímenes', icon: ArrowDownWideNarrow },
  { id: 'asc', label: 'Menos crímenes', icon: ArrowUpNarrowWide },
  { id: 'az', label: 'A – Z', icon: ArrowDownAZ },
]

const fmt = (n) => n.toLocaleString('es-MX')

export default function Alcaldias() {
  const [sort, setSort] = useState('desc')

  const max = useMemo(() => Math.max(...ALCALDIAS.map((a) => a.carpetas)), [])

  const list = useMemo(() => {
    const copy = [...ALCALDIAS]
    if (sort === 'desc') copy.sort((a, b) => b.carpetas - a.carpetas)
    if (sort === 'asc') copy.sort((a, b) => a.carpetas - b.carpetas)
    if (sort === 'az') copy.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    return copy
  }, [sort])

  // Color según intensidad relativa (misma escala del mapa de calor)
  const heatColor = (v) => {
    const r = v / max
    if (r > 0.8) return '#e8112d'
    if (r > 0.55) return '#fdae61'
    if (r > 0.3) return '#ffdd57'
    if (r > 0.15) return '#abd9e9'
    return '#2c7bb6'
  }

  const goHotspot = (id) => {
    document.getElementById('hotspots')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="alcaldias" className="relative scroll-mt-16 bg-ink-950/50 py-24" aria-labelledby="alcaldias-title">
      <div className="mx-auto max-w-6xl px-5">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-2xl"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-heat-cool">
            16 demarcaciones territoriales
          </p>
          <h2 id="alcaldias-title" className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Alcaldías
          </h2>
          <div className="heat-rule mt-4 w-24" />
          <p className="mt-5 leading-relaxed text-muted" style={{textAlign: 'justify'}}>
            Panorama comparativo de carpetas de investigación por alcaldía. Ordena la lista para
            identificar de un vistazo las demarcaciones con mayor y menor registro delictivo; la
            barra usa la misma escala de color que los mapas de calor.
          </p>
        </motion.header>

        {/* Controles de ordenamiento */}
        <div
          role="toolbar"
          aria-label="Ordenar alcaldías"
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <span className="mr-1 font-mono text-xs uppercase tracking-widest text-muted">
            Ordenar por:
          </span>
          {SORTS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSort(id)}
              aria-pressed={sort === id}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-250 ${
                sort === id
                  ? 'bg-paper text-ink-900'
                  : 'border border-ink-600 text-muted hover:border-heat-cold hover:text-heat-cool'
              }`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <ol className="grid gap-3 md:grid-cols-2" aria-label="Alcaldías de la Ciudad de México">
          <AnimatePresence initial={false}>
            {list.map((a, i) => {
              const tasa = tasa100k(a)
              const color = heatColor(a.carpetas)
              return (
                <motion.li
                  key={a.nombre}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                  className="group relative overflow-hidden rounded-lg border border-ink-700 bg-ink-800/50 p-4 transition-colors duration-300 hover:border-ink-600"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded font-mono text-xs font-semibold"
                        style={{ background: color + '1f', color }}
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[15px] font-bold uppercase tracking-tight text-paper">
                        {a.nombre}
                      </h3>
                    </div>
                    {a.hotspotId && (
                      <button
                        onClick={() => goHotspot(a.hotspotId)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-heat-hot/50 bg-heat-hot/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-heat-hot transition-colors hover:bg-heat-hot hover:text-white"
                        title="Esta alcaldía cuenta con análisis de hotspots"
                      >
                        <Flame size={11} /> Hotspot
                      </button>
                    )}
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-700">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #2c7bb6, ${color})` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.max((a.carpetas / max) * 100, 4)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>

                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-muted">
                    <div className="flex items-center gap-1.5">
                      <FileText size={12} className="text-heat-warm" />
                      <dt className="sr-only">Carpetas de investigación</dt>
                      <dd>
                        <strong className="text-paper">{fmt(a.carpetas)}</strong> carpetas
                      </dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={12} className="text-heat-cool" />
                      <dt className="sr-only">Población</dt>
                      <dd>{fmt(a.poblacion)} hab.</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <dt className="sr-only">Tasa por 100 mil habitantes</dt>
                      <dd>
                        <span className="text-paper">{fmt(tasa)}</span> / 100 mil hab.
                      </dd>
                    </div>
                  </dl>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ol>

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted/70">
          Las cifras se muestran con fines comparativos; consulta cada mapa para los detalles.
        </p>
      </div>
    </section>
  )
}
