// ═══════════════════════════════════════════════════════════════════════════
//  Manifiesto del reel — el agente edita esto cuando subís clips a
//  public/footage/. Cada entrada define un clip y cómo se muestra.
//
//  Cuando la lista está vacía, la composición FootageReel muestra una pantalla
//  de "sube tus clips" (placeholder), así siempre renderiza sin romperse.
// ═══════════════════════════════════════════════════════════════════════════

export type ReelClip = {
  /** Nombre del archivo dentro de public/footage/ (ej: "intro.mp4"). */
  file: string;
  /** Duración en pantalla (frames @30fps). 90 = 3s. */
  durationInFrames?: number;
  /** Empezar el clip desde este frame (para recortar el inicio). */
  startFrom?: number;
  /** Velocidad (1 = normal, 0.5 = cámara lenta). */
  playbackRate?: number;
  /** Subtítulo tipo pastilla (opcional). */
  caption?: string;
  /** true = dentro de un teléfono mockup · false = pantalla completa. */
  device?: boolean;
  /** Posición del subtítulo: "top" | "bottom". */
  captionAt?: "top" | "bottom";
};

export type ReelConfig = {
  clips: ReelClip[];
  /** Cerrar con el revelado de marca GlowReveal. */
  outro: boolean;
  /** Copys del cierre. */
  outroTitle?: string;
  outroSubline?: string;
};

// 👉 EDITAR AQUÍ cuando haya clips en public/footage/.
export const REEL: ReelConfig = {
  clips: [
    // Ejemplo (descomentar y ajustar a los archivos reales):
    // { file: "intro.mp4",    durationInFrames: 90, caption: "Todo empieza en tu barrio", device: false },
    // { file: "producto.mp4", durationInFrames: 120, caption: "Dónalo · Alquílalo", device: true, playbackRate: 0.8 },
  ],
  outro: true,
  outroTitle: "donnit",
  outroSubline: "Una comunidad que reutiliza · donnit.app",
};

const OUTRO_FRAMES = 130;
const PLACEHOLDER_FRAMES = 150;

// Duración total calculada a partir del manifiesto.
export const REEL_TOTAL: number = REEL.clips.length
  ? REEL.clips.reduce((n, c) => n + (c.durationInFrames ?? 90), 0) +
    (REEL.outro ? OUTRO_FRAMES : 0)
  : PLACEHOLDER_FRAMES;

export const OUTRO_DURATION = OUTRO_FRAMES;
