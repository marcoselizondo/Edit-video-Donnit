# Donnit — Institutional Video Script (LinkedIn, EN)

> Generated with the `video` skill (`coreyhaines31/marketingskills`, v2.1.0) as a
> controlled test on branch `luca/skill-video-test`.
> **No brand-context file was available** (see "Assumptions" at the end) — brand
> facts below were taken from this repo (`README.md`, `src/theme.ts`).

| Field | Value |
|---|---|
| Platform | LinkedIn (feed, institutional) |
| Aspect ratio | 1:1 or 16:9 (LinkedIn feed) — 9:16 variant possible |
| Target length | 68 s |
| Presenter | Voiceover + visuals (no AI avatar) |
| Captions | Burned-in, always on (85% watch muted) |
| Language | English |

---

## The arc

**Problem** (0:00–0:18) → **Insight** (0:18–0:30) → **Solution** (0:30–0:52) →
**Vision + CTA** (0:52–1:08)

---

## Script

### Scene 1 — Problem · 0:00–0:08
- **Visual:** Street-level shot, dusk. A usable chair, a lamp, a box of books left beside a bin.
- **On-screen text:** `Every day, a city throws away things that still work.`
- **VO:** "Every day, in every city, perfectly good things are left beside a bin."

### Scene 2 — Problem escalation · 0:08–0:18
- **Visual:** Quick cuts — furniture in a container, a bin lorry, a landfill wide shot.
- **On-screen text:** `Not broken. Just unwanted.`
- **VO:** "Not broken. Not worn out. Just no longer needed by the person who owned them. And once they're in the container, that's the end of the story."

### Scene 3 — The insight · 0:18–0:30
- **Visual:** Split screen — one flat with an unused item; another flat, a few streets away, someone searching a marketplace.
- **On-screen text:** `What you don't need is what your neighbour is looking for.`
- **VO:** "But here's the thing. What one person stops needing, someone four streets away is actively looking for. The distance between waste and value is usually about four hundred metres."

### Scene 4 — Solution · 0:30–0:42
- **Visual:** App UI — photograph an item, title, neighbourhood, **FREE** badge, publish.
- **On-screen text:** `Donnit. Give what you don't use.`
- **VO:** "That's why we built Donnit. You photograph what you no longer use, and you give it away — free — to someone in your own neighbourhood. It takes about thirty seconds."

### Scene 5 — Solution · the map · 0:42–0:52
- **Visual:** Map view — pins appearing across Barcelona, radar pulse, "400 m away" label.
- **On-screen text:** `A city that reuses, block by block.`
- **VO:** "On the other side, your neighbours see what's available near them, right now. Not a warehouse. Not shipping. Just the street you already live on."

### Scene 6 — Vision · 0:52–1:02
- **Visual:** Time-lapse of a neighbourhood, pins multiplying; brief CO₂ counter rising.
- **On-screen text:** `Every exchange is CO₂ that was never spent.`
- **VO:** "Every object that changes hands instead of being replaced is CO₂ that never gets spent, and one less thing manufactured. Reuse isn't a campaign. It's infrastructure."

### Scene 7 — Close · 1:02–1:08
- **Visual:** Donnit logo, glow reveal on brand green.
- **On-screen text:** `donnit — Give what you don't use. Rent what you need. (soon)`
- **VO:** "Donnit. Starting in Barcelona."

---

## Production notes

- **Approach:** Programmatic (Remotion — already the repo's stack) for UI scenes
  and titles; real street footage for Scenes 1–2. Avoid AI-generated text on
  screen; render text as overlays (skill: *Common Mistakes #2*).
- **Music:** Restrained, warm, building. No hard drops — institutional register.
- **Colour rules (from `src/theme.ts`):** green `#8FD678` = donate/free ·
  turquoise `#52B788` = rent/Moments. Do not mix; rental is "coming soon" only.
- **Two audio versions** (VO / music-only) — noted in the brief as a brand rule;
  unverified, see Assumptions.
- **Duration:** trim Scene 2 or 6 first if a 60 s hard cap is required.

## Assumptions (unverified — confirm before production use)

1. **No brand-context file existed** (`.agents/product-marketing.md` /
   `.claude/product-marketing.md`). Tone and claims were inferred from the repo.
2. **"400 metres"** is taken from the Reel 01 mock UI. It is illustrative,
   **not a measured product metric.** Replace with a real figure or cut.
3. **CO₂ claim** — the repo shows a CO₂ credits mechanism, but no verified
   savings figure. Scene 6 deliberately avoids a number. Do not add one
   without data.
4. **"Starting in Barcelona"** assumes Barcelona-only launch.
5. Brand rules cited in the brief (Poppins, no exclamation marks, founder-led,
   two audio versions) **could not be verified** — no brand skill exists in this
   repo, and the code declares DM Sans/Inter, not Poppins.
