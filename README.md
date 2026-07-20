# 🔥 Hotspots CDMX — Puntos de Alta Incidencia Delictiva

Directorio web interactivo de análisis de hotspots delictivos en la Ciudad de México, elaborado con datos abiertos de la **FGJ-CDMX**.

## Stack

- **React 18 + Vite 5** — SPA rápida con build minificado sin sourcemaps
- **Tailwind CSS 3** — sistema de diseño (tema cartográfico nocturno con escala de calor)
- **Framer Motion** — transiciones suaves, scroll-reveal, layout animations
- **Lucide React** — iconografía ligera (SVG tree-shakeable)

## Características

- Navbar que se oculta al bajar y reaparece al subir (con scroll-spy)
- Índice de navegación lateral por secciones
- Hero con lienzo de "puntos de calor" en canvas (pausado fuera de vista, respeta `prefers-reduced-motion`)
- Aviso de fuente con efecto de tecleo (typewriter)
- Sección **Hotspots**: tarjetas → modal con visor integrado (iframe) o apertura en pestaña nueva
- Sección **Alcaldías**: 16 demarcaciones ordenables (más crímenes / menos crímenes / A–Z) con barras en escala de calor y tasa por 100 mil hab.
- SEO completo: metadatos, Open Graph/Twitter para LinkedIn, JSON-LD, `sitemap.xml`, `robots.txt`, HTML semántico y accesible
- Disuasión de clonado: build minificado sin sourcemaps, menú contextual restringido, avisos de autoría

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo → http://localhost:5173/cdmx-hotspots/
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
npm run deploy   # publicar en GitHub Pages (rama gh-pages)
```

## Documentación

- **[MANUAL_INTEGRACION.md](./MANUAL_INTEGRACION.md)** — cómo añadir nuevos análisis de hotspots (2 pasos)
- **[MANUAL_DESPLIEGUE.md](./MANUAL_DESPLIEGUE.md)** — cómo publicar en GitHub Pages (manual + CI automático)

## Antes de publicar

1. Edita tus datos en `src/components/Footer.jsx` (objeto `AUTOR`).
2. Reemplaza `TU-USUARIO` / `TU-PERFIL` en `index.html`, `robots.txt` y `sitemap.xml`.
3. Actualiza las cifras de `src/data/alcaldias.js` con tu corte real de la FGJ.
4. (Opcional) Sube `public/og-cover.png` (1200×627) para la tarjeta de LinkedIn.

---

© Proyecto original. Los datos provienen de fuentes abiertas de la FGJ-CDMX; los análisis tienen fines informativos y de investigación.
