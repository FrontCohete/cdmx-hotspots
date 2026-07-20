import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Crosshair, ScrollText } from 'lucide-react'

const AUTOR = {
  nombre: 'Julio Cohete',
  rol: 'Análisis de datos · Hotspots CDMX',
  linkedin: 'https://www.linkedin.com/in/julio-cohete-0w0/',
  github: 'https://github.com/FrontCohete',
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="scroll-mt-16 border-t border-ink-700 bg-ink-950" role="contentinfo">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-10 md:grid-cols-[1.4fr_1fr]"
        >
          {/* Autor */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-ink-800 ring-1 ring-ink-600">
                <Crosshair size={15} className="text-heat-hot" />
              </span>
              <span className="font-display text-sm font-bold uppercase tracking-[0.14em]">
                Hotspots CDMX
              </span>
            </div>
            <p className="font-display text-2xl font-black uppercase tracking-tight">
              {AUTOR.nombre}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
              {AUTOR.rol}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={AUTOR.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink-600 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-paper transition-all duration-300 hover:border-[#0a66c2] hover:bg-[#0a66c2]/15 hover:text-[#7cc0ff]"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                href={AUTOR.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-ink-600 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-paper transition-all duration-300 hover:border-paper hover:bg-paper/10"
              >
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>

          {/* Leyenda / transparencia */}
          <div className="rounded-xl border border-ink-700 bg-ink-800/40 p-6">
            <div className="mb-3 flex items-center gap-2 text-heat-cool">
              <ScrollText size={16} />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em]">Sobre los datos</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted" style={{textAlign: 'justify'}}>
              Este proyecto fue elaborado con datos abiertos de la <strong className="text-paper">
              Fiscalía General de Justicia de la Ciudad de México (FGJ-CDMX)</strong>. Los análisis
              tienen fines informativos, académicos y de investigación; no constituyen información
              oficial ni sustituyen los reportes de las autoridades competentes.
            </p>
          </div>
        </motion.div>

        <div className="heat-rule mt-12 opacity-40" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] text-muted">
            © {year} {AUTOR.nombre}. Todos los derechos reservados. Prohibida la reproducción total
            o parcial del sitio y sus análisis sin autorización expresa.
          </p>
        </div>
      </div>
    </footer>
  )
}
