# PR: Meta pública — `robots.txt`, `humans.txt`, `llms.txt`

> **Para:** Eder (revisión técnica, merge y despliegue) · Paz (contexto y apoyo frontend).  
> **Pegar en GitHub** al abrir el PR desde la rama `chore/public-meta-robots-humans-llms` hacia la rama de integración acordada (normalmente `main` en el repo que dispare producción en Vercel).

**Título sugerido:** `chore(public): actualizar robots.txt, humans.txt y llms.txt`

---

## Resumen

Actualización de los archivos estáticos en `public/` que definen cómo se presenta el sitio a buscadores, humanos curiosos y sistemas tipo LLM:

| Archivo | Qué hace |
|--------|-----------|
| `public/robots.txt` | Directivas de rastreo, bloqueos de rutas internas/API, `Allow` para assets de Astro, sitemap canónico, bloque `bingbot` con `Crawl-delay`. |
| `public/humans.txt` | Créditos del equipo, stack, rendimiento, accesibilidad, estructura del sitio, contacto y marco de datos personales. |
| `public/llms.txt` | Descripción del negocio, URLs y sitemaps, rutas Astro vs `sitemap-pages.xml`, límites legales/comerciales, enlace a `robots.txt`. |

No cambia lógica de aplicación; solo contenido servido en la raíz del dominio.

---

## Checklist de revisión (Eder)

1. **`robots.txt`**  
   - Confirmar que cada `Disallow` corresponde a rutas que existen o podrían existir (`/admin/`, `/api/`, etc.) y que no bloqueamos URLs de negocio que deban indexarse.  
   - `Disallow: /*?*` evita rastreo de URLs con query string; validar que no rompa necesidades de campañas o facets que quieran indexarse.

2. **Coherencia de datos**  
   - Teléfonos, correos y domicilio en `humans.txt` / `llms.txt` alineados con lo publicado en el sitio y con lo que marca/legal espera.

3. **`llms.txt` vs código**  
   - Si se acuerda paridad con `sitemap-pages.xml`, el arreglo `PAGES` vive en `src/pages/sitemap-pages.xml.ts` (el propio `llms.txt` ya lo menciona).

---

## Merge a la rama principal

1. En GitHub: **Pull request** desde `chore/public-meta-robots-humans-llms` → `main` (o la rama que use el proyecto como fuente de producción).  
2. Revisar **diff** solo en `public/humans.txt`, `public/llms.txt`, `public/robots.txt` (y este doc si se incluye).  
3. Resolver conflictos si la base avanzó; volver a correr build local si hace falta: `npm run build`.  
4. **Squash merge** o **merge commit** según convención del equipo; con squash, ajustar el mensaje final para que quede claro el alcance (`chore(public): …`).

Si tu `main` local está muy detrás de `origin/main`, antes conviene `git fetch` y merge/rebase de la base para evitar sorpresas en el PR.

---

## Pasar a producción (Vercel)

1. Tras el merge a la rama conectada al **Production Deployment** del proyecto en Vercel (habitualmente `main`), el despliegue suele **dispararse solo**.  
2. En el [dashboard de Vercel](https://vercel.com/dashboard): proyecto del sitio → **Deployments** → comprobar que el último deploy de producción es el commit del merge y que terminó en **Ready**.  
3. Verificación rápida en vivo (sustituir dominio si aplica):

   - `https://www.medrent.mx/robots.txt`  
   - `https://www.medrent.mx/humans.txt`  
   - `https://www.medrent.mx/llms.txt`  

4. Si hay **CDN/cache** agresivo, esperar unos minutos o invalidar según política del proyecto; los archivos en `public/` se publican como estáticos en la raíz.

---

## Nota operativa (Git en volumen externo)

Si `git` muestra errores del tipo `non-monotonic index .git/objects/pack/._pack-…`, suelen ser archivos `._*` (AppleDouble) junto a índices reales. Conviene eliminar solo esos `._pack-*.idx` duplicados en `.git/objects/pack/` o trabajar el clon en un disco que no genere esos archivos, para evitar fallos intermitentes.
