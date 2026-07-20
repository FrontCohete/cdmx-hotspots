# 🚀 Manual de despliegue en GitHub Pages

## Requisitos

- [Node.js 18+](https://nodejs.org) y npm.
- [Git](https://git-scm.com) y una cuenta de GitHub.

---

## 1. Prepara el proyecto en local

```bash
# Dentro de la carpeta del proyecto
npm install     # instala dependencias
npm run dev     # prueba en http://localhost:5173/cdmx-hotspots/
```

## 2. Ajusta la ruta base del sitio

Abre **`vite.config.js`** y verifica el campo `base`:

```js
base: '/cdmx-hotspots/',
```

- Si tu repositorio se llamará `cdmx-hotspots`, déjalo igual.
- Si le pondrás otro nombre (por ejemplo `hotspots-fiscalia`), cámbialo a `'/hotspots-fiscalia/'` — **la diagonal inicial y final son obligatorias**.
- Si publicarás en `usuario.github.io` (repositorio con tu nombre de usuario) o usarás dominio propio, usa `base: '/'`.

## 3. Personaliza tus datos y el SEO

Antes de publicar, sustituye los marcadores:

| Archivo | Qué editar |
|---|---|
| `src/components/Footer.jsx` | Objeto `AUTOR`: nombre, rol, correo, LinkedIn, GitHub |
| `index.html` | Título/descripción si lo deseas, `author`, `canonical`, `og:url`, `og:image`, JSON-LD (`name`, `sameAs`) — reemplaza todos los `TU-USUARIO` / `TU-PERFIL` |
| `public/robots.txt` y `public/sitemap.xml` | URL final del sitio |
| `src/data/alcaldias.js` | Cifras reales de carpetas y `PERIODO_DATOS` |

> 💡 Para la tarjeta de vista previa en LinkedIn, sube una imagen `og-cover.png` (1200×627 px) a `public/` — puede ser una captura de uno de tus mapas con el título del proyecto.

## 4. Crea el repositorio y sube el código

```bash
git init
git add .
git commit -m "Sitio de hotspots CDMX v1"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/cdmx-hotspots.git
git push -u origin main
```

## 5. Publica (opción A — recomendada: paquete gh-pages)

El proyecto ya incluye el script de despliegue:

```bash
npm run deploy
```

Este comando compila (`npm run build`) y sube la carpeta `dist/` a la rama `gh-pages` automáticamente.

Después, en GitHub:

1. Ve a tu repositorio → **Settings → Pages**.
2. En **Build and deployment → Source**, elige **Deploy from a branch**.
3. Selecciona la rama **`gh-pages`** y carpeta **`/ (root)`** → **Save**.
4. En 1–3 minutos tu sitio estará en:
   `https://TU-USUARIO.github.io/cdmx-hotspots/`

Cada vez que actualices el proyecto (nuevo hotspot, cifras, etc.):

```bash
git add . && git commit -m "Nuevo análisis: Coyoacán" && git push
npm run deploy
```

## 5-bis. Publica (opción B — GitHub Actions, despliegue automático)

Si prefieres que cada `git push` publique solo, crea el archivo `.github/workflows/deploy.yml` (ya incluido en este proyecto) y en **Settings → Pages → Source** elige **GitHub Actions**. Con eso no necesitas ejecutar `npm run deploy` nunca: subir a `main` basta.

## 6. Verificación posterior al despliegue

- [ ] La página carga con estilos y animaciones.
- [ ] El modal de cada hotspot muestra el mapa interactivo.
- [ ] Los botones de "Pestaña nueva" abren los HTML.
- [ ] Al compartir la URL en LinkedIn aparece la tarjeta con título, descripción e imagen.
  - Si LinkedIn muestra información vieja, fuerza el refresco en el [Post Inspector](https://www.linkedin.com/post-inspector/).
- [ ] Google Search Console (opcional pero recomendado): añade la propiedad, verifica y envía `sitemap.xml` para acelerar la indexación.

## Problemas frecuentes

| Síntoma | Solución |
|---|---|
| Página en blanco tras publicar | El `base` de `vite.config.js` no coincide con el nombre del repo |
| CSS/JS con error 404 | Igual que arriba: revisa `base` y vuelve a ejecutar `npm run deploy` |
| Los mapas no cargan en producción | Verifica que los HTML estén en `public/hotspots/` y las rutas usen `` `${base}` `` |
| Cambios que no se reflejan | Caché: recarga con Ctrl+Shift+R; o espera unos minutos a GitHub Pages |
