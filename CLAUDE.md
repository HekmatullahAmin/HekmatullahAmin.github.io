# CLAUDE.md — Portfolio Redesign Technical Reference

> Full product spec lives in `portfolio-redesign-PRD.md`.
> This file is the quick reference for implementation. Read it before touching code.

---

## Project Summary

Static single-page portfolio for **Hekmatullah Amin** (Android/Kotlin developer, Sheffield).
Deployed to **GitHub Pages** — no build step, no framework, no bundler.
Three signature interactions: watery parallax hero, scroll-reveal cards, magnetic certificate tilt.

---

## CLI Commands

```bash
# Local preview (Python, no install needed)
python -m http.server 8080

# Or with Node
npx serve .

# Deploy — just push to main
git add . && git commit -m "..." && git push origin main
# GitHub Pages auto-deploys from repo root
```

No build, no `npm install`, no compilation. If it requires a terminal step beyond `git push`, something is wrong.

---

## File Structure

```
/
├── index.html          # Single page — all sections here
├── style.css           # All styles, tokens, animations
├── main.js             # All JS interactions (no inline scripts in HTML)
├── images/
│   ├── hero-photo.jpg  # Developer portrait (hero section)
│   ├── projects/
│   │   ├── bookfinder.png
│   │   ├── taskminder.png
│   │   ├── offnews.png
│   │   ├── littlelemon.jpg
│   │   ├── tome.png
│   │   ├── friendhub.jpg
│   │   └── click.png
│   └── certs/          # Certificate issuer logos or screenshots
├── portfolio-redesign-PRD.md
└── assets/
    └── CV.pdf          # Downloadable resume
```

**Naming:** lowercase, hyphenated, no spaces. Images use the project slug as filename.
Note: the structure in here might be a little different from what is actually in my project.

---

## Architecture

**One HTML file, one CSS file, one JS file.** No components, no modules, no imports.

```
index.html
  └── <link> style.css
  └── sections: #hero · #about · #projects · #certificates · #skills · #contact
  └── <script> main.js  ← bottom of body, defer not needed

style.css
  └── :root tokens
  └── reset + base
  └── layout (section by section, top to bottom)
  └── animations (@keyframes at the bottom)
  └── media queries (grouped at bottom, mobile-first breakpoints)

main.js
  └── initParallax()       — hero mouse tracking
  └── initScrollReveal()   — IntersectionObserver for all .reveal elements
  └── initMagneticTilt()   — certificate card tilt
  └── initNav()            — scroll blur + active link tracking
  └── initMarquee()        — pauses skills marquee on hover
  └── DOMContentLoaded → calls all init functions
```

**Section IDs** (used by nav anchors and JS selectors):

| Section      | ID                |
| ------------ | ----------------- |
| Hero         | `#hero`         |
| About        | `#about`        |
| Projects     | `#projects`     |
| Certificates | `#certificates` |
| Skills       | `#skills`       |
| Contact      | `#contact`      |

---

## Design Tokens

Defined once in `style.css` under `:root`. Never hardcode a color or font anywhere else.

```css
:root {
  /* Backgrounds */
  --bg-primary:   #0C0C0E;
  --bg-surface:   #151518;
  --bg-elevated:  #1E1E24;

  /* Accents */
  --accent:       #E8FF47;   /* primary — CTAs, labels, highlights */
  --accent-warm:  #FF6B35;   /* secondary — use sparingly */

  /* Text */
  --text-primary: #F2F2F0;
  --text-muted:   #7A7A85;

  /* Borders */
  --border:       rgba(255, 255, 255, 0.08);

  /* Fonts */
  --font-display: 'Syne', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'DM Mono', monospace;

  /* Spacing scale */
  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  4rem;
  --space-xl:  8rem;

  /* Transitions */
  --ease-out:   0.25s ease-out;
  --ease-tilt:  0.4s ease;
}
```

**Font sizes** — set directly, not tokenised:

| Role            | Size                         |
| --------------- | ---------------------------- |
| Hero display    | `clamp(48px, 10vw, 120px)` |
| Section heading | `clamp(32px, 5vw, 60px)`   |
| Body            | `16px`                     |
| Labels / mono   | `12–13px`                 |

---

## Key JS Behaviours

### 1. Watery Parallax — `initParallax()`

```
Trigger: mousemove on #hero
Photo moves: ±20px X, ±15px Y  (follows cursor)
Glow layer:  ±8px X, ±8px Y   (opposite direction, slower)
CSS: transition: transform 0.12s ease-out
Guard: disabled if window.matchMedia('(hover: none)') — covers mobile/touch
```

### 2. Scroll Reveal — `initScrollReveal()`

```
Selector: any element with class .reveal
Default state (CSS): opacity: 0; transform: translateY(60px)
Revealed state:       opacity: 1; transform: translateY(0); transition: 0.6s ease
Stagger: .reveal elements inside a grid get --delay: 0s, 0.1s, 0.2s via nth-child
Observer: threshold 0.15, once: true (won't re-trigger)
```

### 3. Magnetic Tilt — `initMagneticTilt()`

```
Selector: .cert-card
Trigger: mousemove per card
Tilt calc: ((mouseY - cardCenterY) / cardHeight) * 12  → rotateX
           ((mouseX - cardCenterX) / cardWidth)  * 12  → rotateY
CSS: transform: perspective(600px) rotateX(Xdeg) rotateY(Ydeg)
     will-change: transform
Reset on mouseleave: transform: perspective(600px) rotateX(0) rotateY(0)
                     transition: var(--ease-tilt)
Guard: disabled if (hover: none)
```

### 4. Nav Scroll Blur — `initNav()`

```
Trigger: window scroll
At scrollY > 80: add class .scrolled to <nav>
.scrolled applies: background: rgba(12,12,14,0.85); backdrop-filter: blur(12px)
Active link: IntersectionObserver on each section, adds .active to matching nav link
```

### 5. Skills Marquee — CSS only

```
Two .marquee-track divs inside .marquee-wrapper
Row 1: animation: marquee-left  28s linear infinite
Row 2: animation: marquee-right 22s linear infinite
Pause on hover: .marquee-wrapper:hover .marquee-track { animation-play-state: paused }
Content duplicated in HTML to fill seamlessly (no JS cloning needed)
```

---

## Responsive Rules

| Breakpoint | Applies when        | Key changes                                      |
| ---------- | ------------------- | ------------------------------------------------ |
| Desktop    | `> 1024px`        | 2-col projects, 3-col certs, hero side-by-side   |
| Tablet     | `768px – 1024px` | 2-col projects, 2-col certs, hero stacked        |
| Mobile     | `< 768px`         | 1-col all, parallax off, tilt off, marquee slows |

Media queries live at the **bottom** of `style.css`, grouped together. Do not scatter them inline.

---

## Performance Rules

- Images: compress to < 200KB each; hero photo < 400KB. Use `.jpg` for photos, `.png` for screenshots with UI.
- `loading="lazy"` on every `<img>` **except** `#hero img`.
- `will-change: transform` only on: `.hero-photo`, `.hero-glow`, `.cert-card`.
- Animations touch only `transform` and `opacity` — never `width`, `height`, `top`, `left`.
- Fonts: load via Google Fonts `<link>` with `&display=swap`. Preconnect tag required:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ```

---

## Content Placeholders

Replace these before launch:

| Placeholder                 | File           | Replace with          |
| --------------------------- | -------------- | --------------------- |
| `images/hero-photo.jpg`   | —             | Developer portrait    |
| `images/projects/*.png`   | —             | App screenshots       |
| `assets/cv.pdf`           | —             | Current resume        |
| `hek.amin.2000@gmail.com` | `index.html` | Confirm still correct |
| `(+44) ...`               | `index.html` | Phone if including    |

---

## Out of Scope

Do not add: React, Vue, any bundler, dark/light toggle, backend, CMS, multi-page routing, contact form with server submission.

If a feature isn't in the PRD, check the PRD before building it. If it's still not there, ask first.

---

*See `portfolio-redesign-PRD.md` for full section specs, interaction rationale, and visual direction.*
