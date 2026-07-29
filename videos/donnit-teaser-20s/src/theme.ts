// Donnit Design System — tokens oficiales (extraídos de _ds_bundle.js / styles.css)
export const COLORS = {
  // Escala verde (donar / libre)
  green50: "#ECF6E8",
  green100: "#D8F0DA",
  green200: "#B7E4C7",
  green300: "#95D88E",
  green400: "#6FBF6A", // brand
  green500: "#52B788",
  green600: "#2D6A4F",
  green700: "#1B4332", // ink
  green800: "#143C2B",
  green900: "#0F2E21",
  freeGreen: "#8FD678", // verde libre/brillante (gratis)

  // Escala turquesa (alquiler / rent)
  turq50: "#E8F6F1",
  turq100: "#D6EFE7",
  turq200: "#B6E3D5",
  turq300: "#8FD3C0",
  turq400: "#52B788", // rent
  turq500: "#2E9E8C",
  turq600: "#1F7E70",
  turq700: "#16574E",

  // Neutros cálidos
  cream: "#FAF8F5", // fondo app
  sage100: "#E3EAE4",
  sage200: "#C8D4CC",
  sage300: "#A8B5AD",
  sage500: "#8AA395",
  sage700: "#5C7A6C",
  textBody: "#2C463A",
  white: "#FFFFFF",

  // Acentos semánticos
  amber: "#F4A261",
  tomato: "#F0635F",
  ocean: "#3A86FF",

  // --- alias semánticos (uso en el video) ---
  green: "#8FD678", // donar (verde libre)
  greenDeep: "#2D6A4F",
  greenInk: "#1B4332",
  turquoise: "#52B788", // alquilar
  turquoiseDeep: "#1F7E70",
  bgLight: "#ECF6E8",
  bgWarm: "#FAF8F5",
  ink: "#1B4332",
  inkSoft: "#2C463A",
};

// Tipografía de los VIDEOS (títulos/kinetic). Sora, elegida siguiendo las
// referencias. (Los componentes de la app usan sus propios tokens DM Sans/Inter.)
export const FONTS = {
  display: '"Archivo", "Liberation Sans", sans-serif',
  body: '"Archivo", "Liberation Sans", sans-serif',
};

// Escala tipográfica (px) del DS
export const TYPE = {
  display1: 32,
  display2: 28,
  display3: 24,
  heading1: 22,
  heading2: 20,
  heading3: 18,
  bodyLg: 17,
  body: 15,
  caption: 13,
  micro: 11,
};

export const RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, pill: 9999 };

// Sombras (tinta verde #1B4332)
export const SHADOWS = {
  low: "0 1px 2px rgba(27,67,50,0.04), 0 4px 12px rgba(27,67,50,0.06)",
  med: "0 2px 6px rgba(27,67,50,0.08), 0 8px 24px rgba(27,67,50,0.10)",
  high: "0 6px 16px rgba(27,67,50,0.10), 0 24px 48px rgba(27,67,50,0.16)",
  brand: "0 6px 18px rgba(111,191,106,0.36)",
};

// Motion tokens del DS
export const EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export const VIDEO = { width: 1080, height: 1920, fps: 30, durationInFrames: 600 };
