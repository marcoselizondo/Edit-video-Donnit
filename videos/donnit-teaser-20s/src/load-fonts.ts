import { cancelRender, continueRender, delayRender, staticFile } from "remotion";

// Carga determinista de las fuentes de marca antes de renderizar frames.
let started = false;
export const loadFonts = () => {
  if (started) return;
  started = true;
  const handle = delayRender("load-brand-fonts");
  Promise.all([
    new FontFace("DM Sans", `url(${staticFile("DMSans.ttf")})`, {
      weight: "100 900",
    }).load(),
    new FontFace("Inter", `url(${staticFile("Inter.ttf")})`, {
      weight: "100 900",
    }).load(),
  ])
    .then((fonts) => {
      fonts.forEach((f) => document.fonts.add(f));
      continueRender(handle);
    })
    .catch((e) => cancelRender(e));
};
