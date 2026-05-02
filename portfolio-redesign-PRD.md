# Portfolio Redesign — Product Requirements Document

**Project:** Hekmatullah Amin Personal Portfolio
**Current URL:** hekmatullahamin.github.io
**Version:** 1.0
**Date:** May 2026

---

## 1. Overview

This document defines the requirements for a full redesign of Hekmatullah Amin's developer portfolio. The goal is to transform it from a plain HTML5 UP template into a visually striking, interactive single-page experience that commands attention from both technical recruiters and general visitors — while staying deployable on GitHub Pages as a static site.

The redesign draws inspiration from two reference sites: **Magnetto** (bold editorial hero, watery parallax hover) and **WalletTemplate** (scroll-reveal from mobile mockup, magnetic hover card grid).

---

## 2. Goals

- Create an immediate "wow" first impression that makes visitors stay and explore.
- Showcase projects and certificates in a way that feels premium, not generic.
- Incorporate specific animation interactions borrowed from the two reference sites.
- Remain fully static (no backend) so it deploys on GitHub Pages without changes.
- Be responsive across desktop, tablet, and mobile.

---

## 3. Target Audience

**Primary — Recruiters and hiring managers** who will spend 10–30 seconds deciding whether to read more. They need to quickly see: who Hekmatullah is, his tech stack, and his best projects.

**Secondary — General visitors and fellow developers** who appreciate craft. For them, the animations and design quality are the message.

---

## 4. Tech Stack

| Layer      | Choice                                                    | Reason                                          |
| ---------- | --------------------------------------------------------- | ----------------------------------------------- |
| Framework  | Vanilla HTML + CSS + JavaScript                           | No build step; deploys directly to GitHub Pages |
| Fonts      | Google Fonts (loaded via `<link>`)                      | Free, fast, no npm required                     |
| Animations | CSS + Vanilla JS (IntersectionObserver, mousemove events) | No dependencies; performant                     |
| Hosting    | GitHub Pages (static)                                     | Already in use                                  |

No React, no Vite, no bundler. Everything ships as a single `index.html` (or split into `index.html`, `style.css`, `main.js`).

---

## 5. Visual Direction

### 5.1 Aesthetic

**Dark editorial with cinematic weight.** Inspired by Magnetto's boldness but adapted for a software developer context — not a fashion studio. Think: the cover of a design-forward tech magazine. Dark backgrounds, a single energetic accent color (electric teal or amber orange), generous whitespace, and a display typeface that feels distinctive without being unreadable.

### 5.2 Color Palette

| Token              | Value                      | Usage                                      |
| ------------------ | -------------------------- | ------------------------------------------ |
| `--bg-primary`   | `#0C0C0E`                | Main page background                       |
| `--bg-surface`   | `#151518`                | Cards, hero overlay                        |
| `--bg-elevated`  | `#1E1E24`                | Hover states, elevated cards               |
| `--accent`       | `#E8FF47`                | Primary accent — CTAs, highlights, labels |
| `--accent-warm`  | `#FF6B35`                | Secondary accent — used sparingly         |
| `--text-primary` | `#F2F2F0`                | Body text                                  |
| `--text-muted`   | `#7A7A85`                | Labels, captions                           |
| `--border`       | `rgba(255,255,255,0.08)` | Subtle card borders                        |

### 5.3 Typography

| Role                | Font                    | Weight   | Size                           |
| ------------------- | ----------------------- | -------- | ------------------------------ |
| Display / Hero      | `Syne` (Google Fonts) | 700–800 | 80–120px desktop, 48px mobile |
| Section headings    | `Syne`                | 600      | 40–60px                       |
| Body / descriptions | `DM Sans`             | 400      | 16px                           |
| Labels / tags       | `DM Mono`             | 400      | 12–13px                       |
| Navigation          | `DM Mono`             | 400      | 13px                           |

`Syne` has the same punchy, slightly condensed feel as the pixel/display fonts used in Magnetto. `DM Sans` pairs cleanly. `DM Mono` gives technical credibility to labels.

---

## 6. Page Structure

The portfolio is a single scrolling page with six sections:

```
1. Hero
2. About
3. Projects
4. Certificates
5. Skills
6. Contact / Footer
```

A sticky navigation bar floats at the top on desktop, collapses to a hamburger on mobile.

---

## 7. Section Specifications

### 7.1 Navigation Bar

**Layout:** Fixed position, full-width, transparent initially — transitions to a frosted-glass dark background on scroll.

**Contents:** Logo/name on the left (`HEKMATULLAH` in Syne bold), nav links in the center (`About · Projects · Certificates · Skills`), and a `Contact →` button on the right with accent border.

**Behavior:** Smooth scroll to section on link click. Active link highlighted with the accent color underline.

---

### 7.2 Hero Section

This is the most important section — the first thing seen.

**Layout:** Full viewport height (`100vh`). Background is a dark gradient mesh. The developer's photo (or a placeholder silhouette until a photo is provided) is positioned right-of-center at large scale — similar to Magnetto's portrait treatment. Name and tagline sit on the left.

**Text content:**

- Large display name: `HEKMATULLAH AMIN`
- Subtitle line: `SOFTWARE DEVELOPER · ENGLAND`
- Short descriptor: `Crafting mobile & cross-platform apps with Kotlin, Compose, and clean architecture.`
- Two CTAs: `View Projects` (accent filled button) and `Download CV` (outlined button)

**INTERACTION 1 — Watery Parallax (from Magnetto):**
The hero portrait reacts to mouse movement. As the cursor moves across the hero section, the photo shifts subtly (±20px on X, ±15px on Y) using `transform: translate()` applied via a `mousemove` event listener. A separate blurred glow layer behind the photo also shifts in the opposite direction at a slower speed (±8px), creating a sense of depth and liquid motion. CSS `transition: transform 0.12s ease-out` keeps it smooth without lag. On mobile this effect is disabled.

**Background:** Animated radial gradient that slowly pulses (CSS keyframe animation, 8s infinite). Two gradient orbs — one teal, one warm amber — rotate slowly in opposite directions at low opacity (`0.15`), creating a living, ambient background without being distracting.

---

### 7.3 About Section

**Layout:** Split two-column on desktop (text left, visual right), single column on mobile.

**Text content:**

- Section label: `ABOUT ME` in DM Mono, accent color, small caps feel
- Heading: `Building software that people actually enjoy using.`
- Two short paragraphs: background, philosophy, current focus (Android/Kotlin/Compose Multiplatform)
- Location: `Eckington, England`

**Visual (right side):** A vertical stack of three stat pills:

- `7+ Projects Shipped`
- `2+ Years Experience`
- `Kotlin · Compose · Firebase`

Each pill is a dark card with a thin accent-colored left border. They animate in with a stagger when scrolled into view (IntersectionObserver + CSS class toggle that triggers a `translateY(0) opacity(1)` transition from `translateY(20px) opacity(0)`).

---

### 7.4 Projects Section

This is the largest and most interactive section.

**Layout:** Section heading at top, then a grid of project cards below. Desktop: 2 columns. Mobile: 1 column.

**Section heading:** `PROJECTS` in Syne display size, left-aligned. A counter badge `(07)` in accent color sits next to it.

**INTERACTION 2 — Scroll-Reveal Peek (from WalletTemplate):**
The first time the Projects section scrolls into view, the section heading and the first row of cards perform an entrance animation. Cards start at `translateY(60px) opacity(0)` and animate to their final position with a stagger delay (`0s`, `0.1s`, `0.2s`). This mimics the smooth reveal effect seen in WalletTemplate.

**Project Card Design:**Each card contains:

- Full-width project screenshot/image at the top (with `object-fit: cover`, aspect ratio 16:9)
- Dark overlay on the image with project category label (e.g., `MULTIPLATFORM`, `ANDROID`, `REAL-TIME`)
- Project name in Syne medium
- Two-line description
- Tech tag pills at the bottom (e.g., `Kotlin` `Jetpack Compose` `Ktor`)
- `View on GitHub →` link

**Card hover state:** Card lifts slightly (`transform: translateY(-6px)`) and a faint teal glow appears around the border (`box-shadow: 0 0 0 1px var(--accent) with low opacity`). The image inside scales to 1.03. Transition duration: `0.25s ease`.

**Projects to include** (from current portfolio):

1. BookFinder — Compose Multiplatform
2. TaskMinder — Android / Firebase
3. OffNews — Android offline-first
4. Little Lemon — Meta Capstone
5. ToMe — Budget & Scheduling
6. FriendHub — Social Media
7. Click — Real-time Chat

---

### 7.5 Certificates Section

**Layout:** Horizontal scroll strip on desktop (no arrows needed — scrollable via mouse drag or touch). On mobile it stacks vertically.

**INTERACTION 3 — Magnetic Hover Grid (from WalletTemplate):**
This is the "cards that follow your mouse" effect. The certificates are displayed as cards in a grid (3 wide on desktop). When the cursor enters any card, that card tilts toward the cursor using CSS `transform: perspective(600px) rotateX() rotateY()` calculated from mouse position relative to the card's center. The tilt is capped at ±12 degrees. When the cursor leaves, the card smoothly returns to flat (`transition: transform 0.4s ease`). This creates the illusion the cards are "looking" at the mouse — exactly the effect seen under "comprehensive gateway" in WalletTemplate.

**Card Design:**Each certificate card contains:

- Certificate issuer logo or icon area (placeholder colored block if no image)
- Certificate name
- Issuer name (e.g., `Meta`, `Google`, `Coursera`)
- Year earned
- A subtle shimmer effect on the card face (CSS `::after` pseudo-element with a gradient that moves on hover)

---

### 7.6 Skills Section

**Layout:** Centered, full-width. Two rows of skill tags that scroll horizontally in a marquee animation (infinite, no interaction needed).

**Row 1 (left to right):** Kotlin · Jetpack Compose · Android · Firebase · Ktor · Koin · Room · Coroutines · MVI · MVVM
**Row 2 (right to left):** Compose Multiplatform · KMM · Clean Architecture · Git · Unit Testing · Retrofit · Dagger Hilt · SQLite · XML · REST APIs

Each tag is a pill shape with a thin border and monospace font. The two rows scroll in opposite directions at different speeds, creating a dynamic but subtle motion.

---

### 7.7 Contact / Footer

**Layout:** Dark section with centered content. Large display text dominates.

**Text content:**

- Eyebrow: `LET'S WORK TOGETHER`
- Large heading: `Got a project in mind?`
- Subtext: `I'm open to full-time roles, and interesting collaborations.`
- CTA button: `Send me an email →` (links to `mailto:hek.amin.2000@gmail.com`)

**Social links:** Four icon links in a row — GitHub, LinkedIn, Instagram, Medium. Each icon is simple SVG, white at rest, accent teal on hover.

**Footer bottom bar:** `© 2026 Hekmatullah Amin` left-aligned. Thin top border.

---

## 8. Animations — Summary Reference

| # | Name                  | Trigger                          | Implementation                                                           | Source Reference               |
| - | --------------------- | -------------------------------- | ------------------------------------------------------------------------ | ------------------------------ |
| 1 | Watery Parallax       | Mouse move over hero             | JS `mousemove` → CSS `transform: translate()` on photo + glow layer | Magnetto hero                  |
| 2 | Scroll Reveal (cards) | Section enters viewport          | IntersectionObserver → CSS class toggle (`opacity` + `translateY`)  | WalletTemplate scroll reveal   |
| 3 | Magnetic Card Tilt    | Mouse move over certificate card | JS `mousemove` per card → CSS `perspective rotateX rotateY`         | WalletTemplate "gateway" hover |
| 4 | Hero Ambient Gradient | Page load, continuous            | CSS `@keyframes` rotating gradient orbs                                | Magnetto hero background       |
| 5 | Skills Marquee        | Page load, continuous            | CSS `@keyframes` translateX infinite                                   | —                             |
| 6 | Nav Scroll Blur       | Scroll past hero                 | JS `scroll` → add class to nav → `backdrop-filter: blur()`         | —                             |
| 7 | Card Hover Lift       | Mouse enter project card         | CSS `:hover` transition                                                | Magnetto project cards         |

---

## 9. Responsive Breakpoints

| Breakpoint | Width       | Layout changes                                                                 |
| ---------- | ----------- | ------------------------------------------------------------------------------ |
| Desktop    | > 1024px    | 2-column projects, 3-column certs, full hero split                             |
| Tablet     | 768–1024px | 2-column projects, 2-column certs, hero stacked                                |
| Mobile     | < 768px     | 1-column everything, marquee slower, parallax disabled, magnetic tilt disabled |

On mobile, interactions 1 and 3 are disabled (mouse-based effects don't apply, and touch tilt can feel disorienting). Scroll reveal (interaction 2) remains active.

---

## 10. Performance Constraints

- Total page weight target: under 1.5MB (images compressed, no video)
- No JS framework — vanilla only
- Fonts loaded with `font-display: swap` to avoid FOIT
- Images use `loading="lazy"` except the hero
- CSS animations use `transform` and `opacity` only (GPU-composited, no layout thrashing)
- `will-change: transform` applied only to the hero photo element and card tilt elements

---

## 11. Content Checklist (Items Needed Before Launch)

- [ ] Professional photo of Hekmatullah (for hero section)
- [ ] Screenshots or mockup images for each of the 7 projects
- [ ] Certificate images or details (issuer, name, year) for certificates section
- [ ] Updated CV/resume PDF (for download button)
- [ ] Phone number decision (currently redacted on site — confirm whether to include)

---

## 12. Out of Scope

- CMS or admin panel
- Backend / form submission (contact form will use `mailto:` only)
- Dark/light mode toggle
- Blog or journal section
- Multi-page routing (single scrolling page only)

---

## 13. Deliverables

1. `index.html` — full page markup
2. `style.css` — all styles and animations
3. `main.js` — all interaction logic (parallax, tilt, scroll reveal, nav behavior)
4. `images/` folder — placeholder assets until real photos are provided

All files ready to drop into the GitHub Pages repository root and deploy immediately.

---


## 14. Reference Screenshots

In design-refernce folder screencapture-magnetto-framer-website-2026-05-02-17_43_00 and screencapture-wallettemplate-framer-website-2026-05-02-17_45_52.


*End of PRD — v1.0*
