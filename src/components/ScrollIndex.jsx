import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'hotspots', label: 'Hotspots' },
  { id: 'alcaldias', label: 'Alcaldías' },
  { id: 'contacto', label: 'Contacto' },
]

/**
 * Índice de navegación lateral: aparece al hacer scroll y marca
 * la sección activa. Oculto en pantallas pequeñas.
 */
export default function ScrollIndex({ active }) {
  return (
    <motion.nav
      aria-label="Índice de secciones"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ul className="flex flex-col items-end gap-4">
        {SECTIONS.map((s) => {
          const isActive = active === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`font-mono text-[11px] uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'translate-x-0 text-paper opacity-100'
                      : 'translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'h-6 w-1.5 bg-heat-gradient'
                      : 'h-1.5 w-1.5 bg-ink-600 group-hover:bg-muted'
                  }`}
                  style={isActive ? { backgroundImage: 'var(--heat)' } : undefined}
                />
              </a>
            </li>
          )
        })}
      </ul>
    </motion.nav>
  )
}
