# 🎬 Edit-video-Donnit

Repositorio de **videos de marketing de Donnit** (Reels/TikTok/Shorts, formato
vertical 9:16), construidos con **[Remotion](https://remotion.dev)** (React →
video). Aquí está tanto el **material** (videos + referencias) como el
**"entrenamiento"**: el método, el análisis de estilo y el toolkit reutilizable
para que cualquiera —Marcos incluido— pueda crear o ajustar videos.

---

## 🚀 Empezar rápido (para Marcos)

1. **Ver el último video:**
   [`videos/donnit-teaser-20s/out/donnit-cinematic-v1.mp4`](videos/donnit-teaser-20s/out/donnit-cinematic-v1.mp4)
2. **Entender el estilo que buscamos:**
   [`videos/references/ANALISIS.md`](videos/references/ANALISIS.md) — análisis de
   las 4 referencias y cómo se aplican.
3. **Añadir referencias nuevas:** sube `.mp4`/`.mov` a
   [`videos/references/`](videos/references/) (o pásalas por chat) y anota qué te
   gusta (ritmo, animación, estética, momentos concretos).
4. **Renderizar o editar:** ver [Cómo renderizar](#-cómo-renderizar) abajo.

---

## 📹 Videos actuales

| Composición | Duración | Descripción | Render |
|-------------|----------|-------------|--------|
| **`DonnitCinematic`** ⭐ | 42s | El nuevo, basado en el análisis de referencias. Cinético, teléfono héroe, planos de impacto, revelado de marca. Con aire para **voz en off**. | [`out/donnit-cinematic-v1.mp4`](videos/donnit-teaser-20s/out/donnit-cinematic-v1.mp4) |
| `DonnitTeaser` | 20s | Teaser inicial (feed → mapa → CO₂ → Moments → CTA). | [`out/donnit-teaser-v2.mp4`](videos/donnit-teaser-20s/out/donnit-teaser-v2.mp4) |
| `DonnitShowcase` | 28s | Reel de componentes del Design System. | [`out/donnit-showcase-v1.mp4`](videos/donnit-teaser-20s/out/donnit-showcase-v1.mp4) |

Todo el proyecto Remotion vive en
[`videos/donnit-teaser-20s/`](videos/donnit-teaser-20s/).

---

## 🧠 El "entrenamiento" — cómo pensamos estos videos

Lo que aprendimos analizando las referencias (`videos/references/`) y que guía
cada video nuevo:

### Estilo (síntesis de las 4 referencias)
1. **Cinético + atrapante** — un concepto por plano, entradas con overshoot.
2. **Mockup de móvil realista** — teléfono héroe con luz de ambiente y **cámara
   en mano** (ref. *Cursor for iOS*).
3. **Paneles/chips flotantes** con líneas conectoras y aire editorial (ref.
   *ElevenLabs*).
4. **Golpes de impacto** full-bleed intercalados: una palabra/número gigante
   (ref. *Compile 2026*).
5. **Cierre de marca con glow** (ref. *Higgsfield MCP*).
6. **Respiración para voz en off** — ritmo con pausas para locutar después.

El desglose completo, plano a plano, está en
[`videos/references/ANALISIS.md`](videos/references/ANALISIS.md).

### Reglas de marca (no negociables)
| Token | Uso | Color |
|-------|-----|-------|
| Verde | **donar** / gratis | `#8FD678` |
| Turquesa | **alquilar** (Moments) | `#52B788` |
| Tinta | texto principal | `#1B4332` |
| Crema | fondo app | `#FAF8F5` |

- Los dos verdes **no se mezclan**, salvo el volante de CO₂ (donde el mecanismo
  conecta donar↔alquilar) y la frase de cierre.
- Hook en los primeros ~2s · subtítulos siempre · alquiler = "llega pronto".
- Tokens oficiales en [`src/theme.ts`](videos/donnit-teaser-20s/src/theme.ts).

### Toolkit reutilizable
- [`src/cine/atmosphere.tsx`](videos/donnit-teaser-20s/src/cine/atmosphere.tsx) —
  cámara en mano (`useHandheld`), dolly-in (`usePushIn`), grano, viñeta, haces de luz.
- [`src/cine/elements.tsx`](videos/donnit-teaser-20s/src/cine/elements.tsx) —
  `HeroPhone` (móvil cinematográfico), `PillLabel`, `ImpactPanel`, `BigCounter`.
- [`src/components/`](videos/donnit-teaser-20s/src/components/) — `Caption`,
  `Kinetic`, `Co2Flywheel`, `StoreBadges`, `PhoneScreen`.

---

## 🛠️ Cómo renderizar

```bash
cd videos/donnit-teaser-20s
npm install

# Estudio interactivo (previsualizar/editar):
npm run studio

# Renderizar el video cinematográfico:
npm run render -- DonnitCinematic out/donnit-cinematic.mp4
```

En **Mac con Chrome instalado** no hace falta nada más. En entornos **headless**
(sin descarga de Chrome), apuntar a un binario local:

```bash
npm run render -- DonnitCinematic out/donnit-cinematic.mp4 \
  --browser-executable=<ruta/al/headless_shell>
```

---

## 📁 Estructura del repo

```
videos/
├── references/              # Videos de estilo + análisis
│   ├── *.mp4                #   las 4 referencias
│   ├── ANALISIS.md          #   ⭐ análisis + dirección del nuevo video
│   └── README.md            #   cómo subir referencias
└── donnit-teaser-20s/       # Proyecto Remotion
    ├── src/
    │   ├── DonnitCinematic.tsx   # ⭐ composición nueva
    │   ├── cine/                 # toolkit cinematográfico
    │   ├── components/ · ds/ · sections/
    │   ├── theme.ts              # tokens de marca
    │   └── Root.tsx              # registro de composiciones
    ├── public/              # clips de la app, logo, fuentes
    └── out/                 # renders (.mp4)
```

---

## ✅ Pendiente para la versión final

- **Voz en off** + música con licencia + SFX cuadrados a los golpes de impacto.
- **Badges oficiales** de App Store / Google Play (los actuales son marcador).
- (Opcional) footage real "de salón" para acercarse aún más a la ref. *Cursor*.
- (Opcional) variante corta 15–20s para Reels.
