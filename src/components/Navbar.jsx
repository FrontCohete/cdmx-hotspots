import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crosshair, Menu, X } from 'lucide-react'
import { useScrollDirection } from '../hooks/useUI'

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'hotspots', label: 'Hotspots' },
  { id: 'alcaldias', label: 'Alcaldías' },
]

export default function Navbar({ active }) {
  const { direction, atTop } = useScrollDirection()
  const [open, setOpen] = useState(false)
  const hidden = direction === 'down' && !atTop && !open

  const go = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      role="banner"
      initial={false}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        atTop
          ? 'border-transparent bg-transparent'
          : 'border-ink-700/60 bg-ink-900/85 backdrop-blur-md'
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5"
      >
        {/* Marca */}
        <button
          onClick={() => go('inicio')}
          className="group flex items-center gap-2.5 text-left"
          aria-label="Ir al inicio"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-md bg-ink-800 ring-1 ring-ink-600">
            <Crosshair size={16} className="text-heat-hot transition-transform duration-300 group-hover:rotate-90" />
          </span>
          <span className="hidden font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-paper sm:block md:text-sm">
            Puntos de alta incidencia delictiva
          </span>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-paper sm:hidden">
            Hotspots CDMX
          </span>
        </button>

        {/* Enlaces escritorio */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                aria-current={active === l.id ? 'true' : undefined}
                className={`relative rounded-md px-4 py-2 font-mono text-[13px] uppercase tracking-wider transition-colors duration-200 ${
                  active === l.id ? 'text-paper' : 'text-muted hover:text-paper'
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="heat-rule absolute inset-x-3 -bottom-0.5"
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Botón móvil */}
        <button
          className="grid h-10 w-10 place-items-center rounded-md text-paper ring-1 ring-ink-600 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-700 bg-ink-900/95 backdrop-blur-md md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`block w-full px-6 py-3.5 text-left font-mono text-sm uppercase tracking-wider ${
                    active === l.id ? 'text-heat-mid' : 'text-muted'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
