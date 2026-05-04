# Archivos públicos de JMVC

Este directorio se sirve estáticamente desde la raíz del sitio.

## Archivos incluidos

- `favicon.svg` — favicon vectorial principal.
- `manifest.webmanifest` — Web App Manifest (PWA básico).

## Archivos que debes añadir antes de publicar

El proyecto los referencia en `src/app/layout.tsx` y en `src/components/JsonLd.tsx`. Si faltan, las previews al compartir el sitio en redes sociales saldrán sin imagen, los dispositivos Apple no encontrarán icono, y Google marcará el `logo` del JSON-LD como inaccesible.

### `og-image.png`

- **Tamaño exacto:** 1200 × 630 px.
- **Formato:** PNG (también vale JPG si lo prefieres, pero entonces actualiza `src/app/layout.tsx` para que apunte a `og-image.jpg`).
- **Peso recomendado:** menor a 300 KB.
- **Contenido:** logotipo + claim corto. Texto grande y legible (mínimo 60 px de altura). Evita pegar texto en los bordes (deja al menos 60 px de margen).
- **Uso:** previews en Facebook, LinkedIn, WhatsApp, Slack, X (Twitter Card large).

### `apple-touch-icon.png`

- **Tamaño exacto:** 180 × 180 px.
- **Formato:** PNG sin transparencia (iOS la rellena automáticamente con un fondo).
- **Contenido:** logotipo o monograma. Sin texto (no se ve a ese tamaño).
- **Uso:** icono de pantalla de inicio en iPhone/iPad cuando alguien añade el sitio a Home Screen.

### `logo.png` (recomendado para JSON-LD)

- **Tamaño:** entre 112 × 112 px y 1200 × 1200 px (Google recomienda 512 × 512).
- **Formato:** PNG con transparencia.
- **Contenido:** únicamente el logotipo, sin texto del claim.
- **Uso:** campo `logo` del schema Organization en `src/components/JsonLd.tsx`. Si no creas este archivo, el JSON-LD seguirá apuntando a `/favicon.svg` como fallback.

## Cómo generar las imágenes rápido

- **Plantillas listas:** Figma Community ("OG image template 1200×630"), Canva, o herramientas como og-image.dev o ogimage.gallery.
- **Generación dinámica con Next.js:** alternativa moderna — crear `src/app/opengraph-image.tsx` con la API ImageResponse de Next 14 y borrar la referencia estática a `/og-image.png` en `layout.tsx`. Lo dejo como mejora futura.

## Comprobación final

Después de subir los archivos, verifica en producción:

- `https://tu-dominio.com/og-image.png` devuelve 200.
- `https://tu-dominio.com/apple-touch-icon.png` devuelve 200.
- Pega el dominio en <https://www.opengraph.xyz/> y comprueba que la preview aparece bien.
- Pega el dominio en <https://search.google.com/test/rich-results> y comprueba que el campo `logo` no da error.
