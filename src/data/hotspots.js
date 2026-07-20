/**
 * ═══════════════════════════════════════════════════════════════
 *  REGISTRO DE HOTSPOTS
 * ═══════════════════════════════════════════════════════════════
 *  Este es el ÚNICO archivo que necesitas editar para integrar
 *  un nuevo análisis de hotspots. Pasos:
 *
 *  1. Copia tu archivo HTML (exportado de tu análisis) a:
 *         public/hotspots/Mi_Nuevo_Analisis.html
 *
 *  2. Agrega un objeto nuevo al final de este arreglo siguiendo
 *     la misma estructura. El sitio genera la tarjeta, el modal
 *     y el enlace automáticamente.
 *
 *  Consulta MANUAL_INTEGRACION.md para más detalle.
 * ═══════════════════════════════════════════════════════════════
 */

// BASE_URL respeta la ruta configurada en vite.config.js (GitHub Pages)
const base = import.meta.env.BASE_URL

export const HOTSPOTS = [
  {
    id: 'gam', 
    alcaldia: 'Gustavo A. Madero',
    titulo: 'Hotspots de delito — Gustavo A. Madero',
    descripcion:
      'Análisis de incidencia delictiva en Gustavo A. Madero, , con zonas críticas etiquetadas y filtros por tipo de delito y capas conmutables.',
    archivo: `${base}hotspots/Mapa_Hotspots_GAM.html`,
    etiquetas: ['Mapa de calor', 'DBSCAN', 'Leaflet'],
    periodo: 'Datos FGJ-CDMX', // Ajuste al periodo "Ene–Dic 2024"
    color: '#fdae61',
  },
  {
    id: 'iztapalapa',
    alcaldia: 'Iztapalapa',
    titulo: 'Hotspots de delito — Iztapalapa',
    descripcion:
      'Análisis de incidencia delictiva en Iztapalapa, con zonas críticas etiquetadas y filtros por tipo de delito y capas conmutables.',
    archivo: `${base}hotspots/Mapa_Hotspots_Iztapalapa.html`,
    etiquetas: ['Mapa de calor', 'DBSCAN', 'Leaflet'],
    periodo: 'Datos FGJ-CDMX',
    color: '#e8112d',
  },

  // ── PLANTILLA PARA FUTUROS ANÁLISIS (copia, pega y descomenta) ──
  // {
  //   id: 'coyoacan',
  //   alcaldia: 'Coyoacán',
  //   titulo: 'Hotspots de delito — Coyoacán',
  //   descripcion: 'Descripción breve del análisis…',
  //   archivo: `${base}hotspots/Mapa_Hotspots_Coyoacan.html`,
  //   etiquetas: ['Mapa de calor'],
  //   periodo: 'Ene–Dic 2025',
  //   color: '#2c7bb6',
  // },
]
