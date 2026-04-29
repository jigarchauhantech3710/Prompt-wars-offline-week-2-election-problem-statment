# ElectIQ India 🇮🇳 — AI Election Guide

> **Google Prompt Wars 2025** | Model: **gemini-2.5-flash** | Tests: **58/58 passing**

India's complete AI election guide — single `index.html`, no build step, no frameworks.

---

## 🚀 Deploy to GitHub Pages

```bash
git add index.html test.js README.md
git commit -m "ElectIQ India - All 10 features"
git push origin main
# GitHub → Settings → Pages → Branch: main → / (root) → Save
```

**Live at:** `https://YOUR_USERNAME.github.io/REPO_NAME/`

---

## 🔧 Setup

1. Get a free API key at [aistudio.google.com](https://aistudio.google.com)
2. Open `index.html` in any modern browser
3. Enter API key in the yellow banner → **Save Key**
4. All AI features activate instantly

> **No API key needed** for: Map, Quiz, Party Explorer, Countdown, Dashboard, Glossary, Timeline, Education Cards.
> **API key needed** for: AI Chat + Eligibility Checker.

---

## ✅ All 10 Features

| # | Feature | How to test |
|---|---|---|
| 1 | 🗺️ **India Election Map** | Click any colored dot — see state info panel |
| 2 | 🔊 **Voice Input** | Click orange mic button → speak your question |
| 3 | 🌐 **Hindi/English Toggle** | Click **हि** in top nav — entire UI switches |
| 4 | 📊 **ECI Dashboard** | Scroll to dashboard — bars animate on entry |
| 5 | 🗳️ **Voter Eligibility Checker** | Fill form → click Check My Eligibility |
| 6 | 📅 **Election Countdown** | Live timer visible on page load |
| 7 | 🏛️ **Party Explorer** | 12 party cards — click any to ask AI |
| 8 | 📱 **WhatsApp Chat UI** | Green header, bubbles, timestamps, blue ticks |
| 9 | 🎓 **Education Cards** | ECI official links section |
| 10 | 🏆 **Gamified Quiz** | Easy/Medium/Hard tabs + 🥉🥈🥇 badges |

---

## ✅ Bugs Fixed in This Version

| Bug | Fix Applied |
|---|---|
| Chat scroll — messages cut off at bottom | `min-height:0` on flex child + `setTimeout` scroll |
| JS `t` variable clash (translation fn vs forEach param) | Renamed all loop vars to `eachTab`, `eachBtn` etc. |
| `sanitize()` called before definition | Moved to top of script, defined before first use |
| Template literal nesting breaking some browsers | Replaced with string concatenation in all JS builders |
| `const` / arrow functions in strict mode closure issues | Rewrote all JS with `var` and named functions for compatibility |
| CSP blocking `data:` URIs | Removed restrictive meta CSP (GitHub Pages has none by default) |
| `system_instruction` field inconsistency | Kept consistent with Gemini API spec |

---

## ✅ Evaluation Criteria Evidence

### 1. Code Quality
- Clean structure: CSS vars → component styles → semantic HTML → modular JS functions
- Every feature in its own IIFE or named function block
- Comments mark each of the 10 feature sections clearly
- No external dependencies — zero npm, zero bundler

### 2. Security
- `sanitize()` HTML-encodes `<`, `>`, `&` before any `innerHTML` assignment
- API key: session memory only, never `localStorage`, never logged
- `BLOCK_MEDIUM_AND_ABOVE` Gemini safety settings on 3 harm categories
- Key validation: must start with `AIza` + minimum 20 characters

### 3. Efficiency
- Single file, loads in one request
- `IntersectionObserver` for bar chart animations (only renders when visible)
- `setTimeout` + `requestAnimationFrame` scroll combo for reliable chat scroll
- Lazy DOM builds for all dynamic sections (parties, dashboard, glossary, map)

### 4. Testing — 58/58 Passing
```
node test.js

> 1. Model & API           5/5  ✓
> 2. Security & XSS        8/8  ✓
> 3. Multilingual EN/HI    5/5  ✓
> 4. Quiz — 3 Levels       8/8  ✓
> 5. India Map             5/5  ✓
> 6. Party Explorer        6/6  ✓
> 7. Countdown             5/5  ✓
> 8. Eligibility Logic     6/6  ✓
> 9. Text Formatting       5/5  ✓
> 10. API Payload          5/5  ✓
─────────────────────────────────
Tests: 58 | Passed: 58 | Score: 100%
ALL TESTS PASSED ✓
```

### 5. Accessibility
- Skip navigation link
- Full ARIA: `role="log"` on chat, `aria-live="polite"` on results, `aria-label` on all interactive elements
- High contrast toggle (`body.hc` CSS class)
- Font size ± controls (12px to 22px)
- `focus-visible` keyboard navigation styles
- Print stylesheet
- `lang` attribute switches dynamically on language toggle

### 6. Google Services — 3 Integrations
| Service | Use |
|---|---|
| **Google Gemini 2.5 Flash API** | AI chat, eligibility checker, party info queries |
| **Google Fonts** | Fraunces + DM Sans + Tiro Devanagari Hindi |
| **Material Symbols** | Icons throughout UI (Google's icon font) |

---

## 📁 Files

```
index.html   — Complete single-page app (CSS + HTML + JS, 1617 lines)
test.js      — Standalone test suite (node test.js)
README.md    — This file
```

---

*ElectIQ India | Google Prompt Wars 2025 | gemini-2.5-flash*
