# Donnit · Teaser 20s (9:16)

Teaser vertical para redes (Reels/TikTok/Shorts) construido con **Remotion**.
Combina footage real del flujo de **donar** con motion graphics de marca para
el mecanismo de **CO₂** y el teaser de **Moments** (alquiler).

## Estructura

- `src/DonnitTeaser.tsx` — línea de tiempo (7 beats, 600 frames @ 30fps).
- `src/sections/` — Hook, DonarFeed, DonarMap, DonarItem, Co2Bridge, AlquilerTeaser, CTA.
- `src/components/` — PhoneScreen (marco 2.5D), Caption, Co2Flywheel, StoreBadges.
- `src/theme.ts` — tokens de marca (verde donar / turquesa alquilar).
- `public/` — clips de la app (`clip_*.mp4`), logo y fuentes (DM Sans / Inter).

## Reglas de marca aplicadas

- 🟢 Verde `#8FD678` = donar · 🩵 Turquesa `#52B788` = alquilar. No se mezclan,
  salvo el flywheel de CO₂ y la frase final (donde el mecanismo conecta ambos).
- Hook en los primeros 2s · subtítulos siempre · alquiler = "llega pronto" ·
  CTA a la app actual.

## Renderizar

```bash
npm install
npm run render -- DonnitTeaser out/donnit-teaser.mp4
# En Mac con Chrome instalado no hace falta --browser-executable.
```

En entornos headless sin descarga de Chrome, apuntar al binario local:
`npm run render -- DonnitTeaser out/teaser.mp4 --browser-executable=<ruta/headless_shell>`

## Pendiente para versión final

- Música con licencia + SFX cuadrados a beat.
- Badges oficiales de App Store / Google Play.
- (Opcional) aclarar más la pantalla del mapa.
