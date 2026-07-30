# 📥 Sube aquí tus videos para el reel

Esta es la carpeta donde subís tu **footage crudo** (clips grabados) para que el
agente arme un **reel** con ellos.

## Cómo subir (desde GitHub)

1. Entrá a esta carpeta en la rama de trabajo.
2. Botón **`Add file` → `Upload files`**.
3. Arrastrá tus clips (`.mp4` o `.mov`) y hacé **Commit**.
4. Avisale al agente: *"ya subí los clips, armá el reel"*.

> 💡 Ideal formato vertical **9:16** (1080×1920). Si son horizontales, el agente
> los encuadra igual, pero se ve mejor si ya vienen verticales.

## Qué pasa después

El agente los engancha en la composición **`FootageReel`** (Remotion), les aplica
el estilo de marca (teléfono héroe / plano completo, subtítulos, cámara en mano)
y cierra con el revelado de marca `GlowReveal`. Luego renderiza el `.mp4` a
`../../out/`.

## Cómo decirle qué querés (opcional pero recomendado)

Podés dejar un archivo `orden.txt` acá, o decírmelo por chat, con:

- **Orden** de los clips (ej: `1. intro.mp4 · 2. producto.mp4 · 3. cierre.mp4`).
- **Subtítulo** de cada uno (ej: *"Todo empieza en tu barrio"*).
- **Recorte** si un clip es largo (ej: *"usá del segundo 2 al 6"*).
- **Marco**: dentro de un teléfono (mockup) o a pantalla completa.
- **Música / voz en off** si la tenés (súbela también acá).

Cuanto más me digas, más fiel queda. Si no decís nada, uso un orden y estilo por
defecto y después ajustamos.

---

*Nota: los clips que subas quedan en el repo (rama de trabajo). No subas material
que no quieras versionar. Archivos muy pesados: mejor recortados/comprimidos.*
