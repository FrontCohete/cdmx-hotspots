# 📍 Manual de integración de nuevos análisis de hotspots

Este sitio está diseñado para crecer sin tocar componentes ni estilos. Integrar un nuevo análisis toma **2 pasos y menos de 5 minutos**.

---

## Paso 1 — Copia tu archivo HTML

Coloca el HTML exportado de tu análisis (Leaflet/Folium o similar) en la carpeta pública de hotspots:

```
public/
└── hotspots/
    ├── Mapa_Hotspots_GAM.html
    ├── Mapa_Hotspots_Iztapalapa.html
    └── Mapa_Hotspots_Coyoacan.html   ← tu archivo nuevo
```

Recomendaciones para el nombre del archivo:

- Sin espacios ni acentos: usa `Mapa_Hotspots_Coyoacan.html`, no `Mapa Coyoacán.html`.
- Mantén el prefijo `Mapa_Hotspots_` para conservar el orden y la consistencia.

> Todo lo que está en `public/` se publica tal cual, por lo que el mapa conserva sus propios estilos, controles y librerías (Leaflet, leaflet-heat, etc.) sin interferir con el sitio.

## Paso 2 — Registra el análisis en el directorio

Abre **`src/data/hotspots.js`** (es el único archivo que se edita) y agrega un objeto al final del arreglo `HOTSPOTS`. El propio archivo incluye una plantilla comentada lista para copiar:

```js
{
  id: 'coyoacan',                       // único, sin espacios; se usa internamente
  alcaldia: 'Coyoacán',                 // nombre visible en la tarjeta
  titulo: 'Hotspots de delito — Coyoacán',
  descripcion: 'Análisis de clústeres de robo a transeúnte…',  // 1–2 líneas
  archivo: `${base}hotspots/Mapa_Hotspots_Coyoacan.html`,      // usa `base`, no "/"
  etiquetas: ['Mapa de calor', 'Clústeres'],   // chips informativos
  periodo: 'Ene–Dic 2025',              // corte temporal de los datos
  color: '#2c7bb6',                     // acento de la tarjeta (paleta de calor)
},
```

Con eso el sitio genera automáticamente:

- La **tarjeta** en la sección Hotspots (con animación de entrada).
- El **modal** con visor integrado (iframe) y botón de "Pestaña nueva".
- El **enlace directo** para abrir el mapa en otra pestaña.

### Paleta sugerida para `color`

| Intensidad | Hex |
|---|---|
| Frío | `#2c7bb6` |
| Templado | `#abd9e9` |
| Medio | `#ffdd57` |
| Cálido | `#fdae61` |
| Crítico | `#e8112d` |

## Paso 3 (opcional) — Vincula la alcaldía

Si el nuevo análisis corresponde a una alcaldía, abre **`src/data/alcaldias.js`** y cambia su `hotspotId: null` por el `id` que definiste:

```js
{ nombre: 'Coyoacán', poblacion: 614447, carpetas: 15230, hotspotId: 'coyoacan' },
```

Esto muestra la insignia **🔥 Hotspot** en la tarjeta de la alcaldía, con salto directo a la sección de análisis.

Aprovecha esta visita al archivo para **actualizar la cifra `carpetas`** con tu corte real de la FGJ y ajustar la constante `PERIODO_DATOS`.

## Verifica en local

```bash
npm run dev
```

Abre `http://localhost:5173/cdmx-hotspots/` y confirma que:

1. La tarjeta nueva aparece en la sección Hotspots.
2. El modal carga el mapa (icono de carga → mapa interactivo).
3. "Pestaña nueva" abre el HTML original completo.

## Errores comunes

| Síntoma | Causa | Solución |
|---|---|---|
| El modal queda en "Cargando mapa…" | Ruta de `archivo` incorrecta | Verifica que el nombre coincida EXACTAMENTE (mayúsculas incluidas) con el archivo en `public/hotspots/` |
| El mapa carga en local pero no en GitHub Pages | Se usó `/hotspots/...` en lugar de `` `${base}hotspots/...` `` | Usa siempre el prefijo `` `${base}` `` como en los ejemplos |
| El mapa se ve sin tiles | El HTML usa recursos http:// | Asegúrate de que tu análisis referencie tiles y librerías por `https://` |
