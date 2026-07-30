# EDIT LOG — Reel: silla-oficina-contenedores (v2)

- **Fuente:** `reel-instagram-v1.mp4` (24s · 1080×1920 · 30fps) → copiada a
  `public/footage/reel-base.mp4` para el render.
- **Salida:** `out/reel-recut-v2.mp4` · 1080×1920 · 30fps · H.264 · **18.0s**.
- **Composición:** `src/ReelRecutV2.tsx` (Remotion).

## Tabla de cortes

| # | Escena | IN (raw) | OUT (raw) | Duración salida | Velocidad | Efecto aplicado |
|---|--------|----------|-----------|-----------------|-----------|-----------------|
| 1 | Hook | 0:04.0 | 0:07.0 | 3.0s | 100% | punch-in 1.0→1.08 en 0.4s ease-out, luego estático · texto completo (fade 0.15s) · ambiente, sin música |
| 2 | Prueba · corte A | 0:10.5 | 0:12.8 | 2.33s | 100% | corte seco · punch-in 1.0→1.05 (0.27s) · SFX click (−12dB vs ambiente) en frame 0 |
| 3 | Prueba · corte B | 0:12.9 | 0:15.2 | 2.33s | 100% | corte seco · punch-in 1.0→1.05 · SFX whoosh en frame 0 |
| 4 | Prueba · corte C | 0:15.2 | 0:17.2 | 2.33s | **85%** | corte de mayor movimiento (pararse) · punch-in 1.0→1.05 · SFX whoosh en frame 0 |
| 5 | Contraste | 0:00.0 | 0:04.0 | 4.0s | 100% | **plano estático, sin punch** · texto "Estado: PERFECTO ✅" completo · música entra aquí (0→nivel en 1s) |
| 6 | Cierre | 0:18.5 | 0:22.5 | 4.0s | 100% | texto "Esto podría estar en casa de un vecino, no en la basura" · logo Donnit (220px ≈ 20% ancho, centrado, visible ~3s) · sin CTA de descarga |

**Total salida:** 18.0s (540 frames @30fps).

## Verificación de reglas

1. ✅ **Orden ≠ raw.** Secuencia de salida por tiempo del raw:
   `4.0 → 10.5 → 12.9 → 15.2 → 0.0 → 18.5`. La escena del raw 0–4s (Contraste)
   aparece en **5ª posición**, no al inicio → el orden es distinto al cronológico.
2. ✅ **Ningún plano estático > 4s.** El más largo (Contraste, Cierre) = 4.0s.
   Cierre no es estático (la cámara del raw orbita la silla + logo animado).
3. ✅ **Sin texto progresivo.** Todos los overlays aparecen completos
   (fade-in 0.15s / hold / fade-out 0.15s).
4. ✅ **Sin crop no intencional.** Fuente 9:16 con relleno; los punch-ins
   (≤1.08) solo recortan el borde difuminado, sin perder contenido.
5. ✅ **Cierra con logo visible.** Logo Donnit presente ~3s continuos al final
   (mínimo exigido 1.5s).

## Audio

- **Ambiente real** del clip en Hook y Prueba (vol 0.6).
- **SFX** en cada corte de Prueba: `click` / `whoosh` (≤0.3s, ~−12dB vs ambiente).
- **Música** (`house-vibez`, Mixkit Free License) desde el inicio del Contraste
  (frame 300): sube de 0 a nivel en 1s, se mantiene, baja al final.

## Caption sugerida para Instagram

> La tiraron a la basura. Funciona perfecta. #Donnit
