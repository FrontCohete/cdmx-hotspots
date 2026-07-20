/**
 * ═══════════════════════════════════════════════════════════════
 *  ALCALDÍAS DE LA CIUDAD DE MÉXICO
 * ═══════════════════════════════════════════════════════════════
 *  `poblacion`: Censo INEGI 2020.
 *  La tasa por cada 100 mil habitantes se calcula automáticamente.
 * ═══════════════════════════════════════════════════════════════
 */
const  PERIODO_DATOS = 'Ene–Dic 2024' // Ajuste al periodo de datos FGJ-CDMX

export const ALCALDIAS = [
  { nombre: 'Álvaro Obregón',       poblacion: 759137,  carpetas: 14520, hotspotId: null },
  { nombre: 'Azcapotzalco',         poblacion: 432205,  carpetas: 9180,  hotspotId: null },
  { nombre: 'Benito Juárez',        poblacion: 434153,  carpetas: 17960, hotspotId: null },
  { nombre: 'Coyoacán',             poblacion: 614447,  carpetas: 15230, hotspotId: null },
  { nombre: 'Cuajimalpa de Morelos',poblacion: 217686,  carpetas: 3540,  hotspotId: null },
  { nombre: 'Cuauhtémoc',           poblacion: 545884,  carpetas: 38410, hotspotId: null },
  { nombre: 'Gustavo A. Madero',    poblacion: 1173351, carpetas: 24390, hotspotId: 'gam' },
  { nombre: 'Iztacalco',            poblacion: 404695,  carpetas: 8620,  hotspotId: null },
  { nombre: 'Iztapalapa',           poblacion: 1835486, carpetas: 36270, hotspotId: 'iztapalapa' },
  { nombre: 'La Magdalena Contreras', poblacion: 247622, carpetas: 3810, hotspotId: null },
  { nombre: 'Miguel Hidalgo',       poblacion: 414470,  carpetas: 14050, hotspotId: null },
  { nombre: 'Milpa Alta',           poblacion: 152685,  carpetas: 1830,  hotspotId: null },
  { nombre: 'Tláhuac',              poblacion: 392313,  carpetas: 5520,  hotspotId: null },
  { nombre: 'Tlalpan',              poblacion: 699928,  carpetas: 12480, hotspotId: null },
  { nombre: 'Venustiano Carranza',  poblacion: 443704,  carpetas: 13140, hotspotId: null },
  { nombre: 'Xochimilco',           poblacion: 442178,  carpetas: 7060,  hotspotId: null },
]

export const tasa100k = (a) => Math.round((a.carpetas / a.poblacion) * 100000)
