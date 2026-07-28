# 🔍 Análisis de las referencias → dirección para el nuevo video

Analicé los 4 videos de `videos/references/` (extrayendo fotogramas clave) para
destilar el estilo que buscamos. Resumen de cada uno y cómo lo aplicamos.

## Las 4 referencias

### 1. `Build from anywhere — Cursor for iOS`
- **Look:** footage real, cinematográfico. Persona en un salón con luz cálida
  (lámpara), profundidad de campo, teléfono sostenido en la mano con la app en
  pantalla. Intercala b-roll de estilo de vida con primeros planos del móvil.
- **Lo que tomamos:** el **teléfono héroe con luz de ambiente** y **cámara en
  mano** (deriva orgánica). Es la referencia principal para el mockup de móvil
  "realista" que pide el brief.

### 2. `ElevenLabs — Image & Video`
- **Look:** fondo claro/crema, mucho aire editorial. Tipografía kinética (título
  negro grande + subtítulos en **pastillas grises pequeñas**). Paneles/capturas
  de UI que **flotan en el espacio** unidos por **líneas finas**. Revelado de
  marca + logo al final.
- **Lo que tomamos:** **chips/paneles flotantes con líneas conectoras**, las
  **pastillas de subtítulo discretas** y el aire para respirar (voz en off).

### 3. `Higgsfield MCP — After Effects`
- **Look:** UI oscura, **title card de marca con glow** (matriz de puntos que
  brilla), prompts de chat, screen-recordings, subtítulos tutoriales, acentos
  neón.
- **Lo que tomamos:** el **revelado de marca con glow** (aros de energía + halo)
  para el cierre.

### 4. `Compile 2026 — countdown`
- **Look:** negro, minimalismo extremo. Números de cuenta atrás gigantes en
  paneles de **color pleno** que se intercambian (morado, rojo-naranja). Un solo
  concepto por plano. Altísimo contraste, muy punchy.
- **Lo que tomamos:** los **planos de impacto full-bleed** (color pleno +
  palabra/número que golpea): `GRATIS`, contador `+128 créditos CO₂`, `Moments`.

## Hilo común (la dirección)

1. **Cinético + atrapante** — un concepto por plano, entradas con overshoot.
2. **Mockup de móvil realista** — teléfono héroe con luz y cámara en mano.
3. **Paneles flotantes** con líneas conectoras y aire editorial.
4. **Golpes de impacto** full-bleed intercalados para dar energía.
5. **Cierre de marca con glow.**
6. **Fiel a la marca:** verde `#8FD678` = donar · turquesa `#52B788` = alquiler ·
   tinta `#1B4332` · crema `#FAF8F5`. No se mezclan salvo el volante de CO₂.

## El nuevo video: `DonnitCinematic` (9:16 · ~42s · 30fps)

Composición nueva en `../donnit-teaser-20s/src/DonnitCinematic.tsx`. Más larga a
propósito, con ritmo y respiración para añadirle **voz en off** después.

| # | Plano | s | Referencia | Qué pasa |
|---|-------|---|-----------|----------|
| 1 | Hook | 0–3.2 | Compile | Tipografía kinética: "Eso que ya no usas… **es un tesoro**" |
| 2 | Feed | 3–11 | Cursor + ElevenLabs | Teléfono héroe (feed real) + **chips flotantes** (Silla, Libros, Camiseta) con líneas |
| 3 | GRATIS | 11–14 | Compile | Impacto full-bleed: **SIEMPRE GRATIS entre vecinos** |
| 4 | Mapa | 14–20 | Cursor | Teléfono héroe (mapa) · "Tu barrio está lleno de **tesoros**" |
| 5 | Ficha | 20–26 | Cursor | Slow-mo de reclamar un artículo · "Un vecino lo **recibe** hoy" |
| 6 | CO₂ | 26–32 | Compile | Contador **+128 créditos CO₂** + volante DONAS↔ALQUILAS |
| 7 | Moments | 32–37 | Compile/ElevenLabs | Teaser de alquiler (turquesa) con chips de artículos |
| 8 | Marca | 37–42 | Higgsfield | Revelado con **glow**: logo + "Dona lo que no usas, alquila lo que necesitas" + badges |

### Nuevas piezas reutilizables
- `src/cine/atmosphere.tsx` — cámara en mano, dolly-in, grano, viñeta, haces de luz.
- `src/cine/elements.tsx` — `HeroPhone` (móvil cinematográfico), `PillLabel`,
  `ImpactPanel`, `BigCounter`.

### Render
```bash
cd ../donnit-teaser-20s
npm install
npm run render -- DonnitCinematic out/donnit-cinematic.mp4
# headless: añadir --browser-executable=<ruta/headless_shell>
```

### Pendiente para versión final
- Voz en off + música con licencia + SFX cuadrados a los golpes de impacto.
- Badges oficiales de App Store / Google Play (los actuales son marcador).
- (Opcional) footage real "de salón" para acercarse aún más a la ref. Cursor.
