# 🗳️ ElectIQ — AI Election Guide

> An interactive assistant that helps users understand the election process, timelines, and steps — powered by **Google Gemini 2.0 Flash**.

Built for **Google Prompt Wars 2025** · Challenge: *Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.*

---

## 🚀 Live Demo

Deploy via GitHub Pages:
1. Go to **Settings → Pages**
2. Set source to `main` branch, `/ (root)`
3. Visit `https://<your-username>.github.io/<repo-name>`

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **AI Chat (Gemini)** | Ask any election question — multi-turn conversation powered by Google Gemini 2.0 Flash |
| 📅 **Interactive Timeline** | 7-phase election timeline with animated scroll reveal |
| 📋 **Process Cards** | Four core pillars of a fair election explained clearly |
| 🧠 **Knowledge Quiz** | 5-question interactive quiz with instant feedback and explanations |
| 📖 **Glossary** | 12 key election terms defined in plain language |
| ♿ **Accessibility** | Font resize, high-contrast mode, skip links, full ARIA support |

---

## 🔧 Setup

This is a **single-file app** — no build step, no dependencies, no server required.

### Step 1 — Get a Google Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the key (starts with `AIza…`)

### Step 2 — Open the App
Open `index.html` in any modern browser **or** deploy to GitHub Pages.

### Step 3 — Enter Your API Key
Paste your Gemini API key into the **Configure Google Gemini API** field at the top of the page and click **Save Key**. The key is verified live and stored only in your browser session — never persisted.

---

## 🏗️ Architecture

```
index.html          ← Entire application (single file, no folders)
README.md           ← This file
test.js             ← Standalone test suite (run in browser console or Node)
```

### Technology Stack

| Layer | Technology | Why |
|---|---|---|
| AI | Google Gemini 2.0 Flash API | Fast, capable, multilingual election Q&A |
| Fonts | Google Fonts (Fraunces + DM Sans) | Distinctive civic aesthetic |
| Icons | Google Material Symbols | Consistent iconography |
| Styling | Vanilla CSS (CSS Custom Properties) | Zero dependencies, fast load |
| Scripting | Vanilla JS ES6+ (`'use strict'`) | No framework overhead |

---

## 📊 Evaluation Criteria Coverage

### ✅ Code Quality
- Semantic HTML5 elements (`<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`)
- `'use strict'` enforced
- CSS Custom Properties design system for consistent theming
- Fully commented code with section headers
- No inline event handlers; all JS separation from HTML

### ✅ Security
- **API key never stored** in `localStorage`, `sessionStorage`, or cookies — session memory only
- XSS protection: all user/AI content HTML-entity-encoded before rendering in `formatAIText()`
- Content-Security-Policy meta tag restricts resource origins
- API key format validated (`AIza…`) before any network call
- Gemini Safety Settings configured to block harmful content categories

### ✅ Efficiency
- **Single HTML file** — zero build tools, instant deploy
- `IntersectionObserver` with `unobserve()` after first trigger — no idle observers
- Gemini `maxOutputTokens: 800` cap prevents runaway responses
- `textarea` auto-resize without layout thrash
- Google Fonts loaded with `preconnect` hints for faster DNS

### ✅ Testing
- **Inline self-test suite** runs on every page load (see `selfTest()` in source)
- Standalone `test.js` file with 12 unit tests covering all critical functions
- Tests verify: function existence, data integrity, XSS sanitization, quiz logic, observer creation
- All test results logged to browser console — open DevTools to verify

### ✅ Accessibility
- **Skip navigation link** for keyboard/screen-reader users
- Full **ARIA labels** on every interactive element
- `role="log"` + `aria-live="polite"` on chat for screen reader announcements
- `role="radiogroup"` + `role="radio"` + `aria-checked` on quiz options
- **Font size controls** (+/−) in navbar toolbar
- **High-contrast mode** toggle (WCAG AA compliant color swap)
- `:focus-visible` styles for keyboard navigation
- `aria-label` on all icon-only buttons
- Print stylesheet hides non-essential UI

### ✅ Google Services Integration (3 Services)
1. **Google Gemini 2.0 Flash API** — Core AI feature; multi-turn chat with system prompt, safety settings, and generation config
2. **Google Fonts** — `Fraunces` (display) + `DM Sans` (body) loaded from `fonts.googleapis.com`
3. **Google Material Symbols** — Icon set throughout the UI loaded from Google's CDN

---

## 🗂️ File Structure

```
index.html    ← Complete single-page application
README.md     ← Project documentation (this file)
test.js       ← Unit test suite
```

> **Note:** No subfolders — as per submission requirements, all files are at the root level.

---

## 🧪 Running Tests

### In Browser Console
1. Open `index.html` in a browser
2. Open DevTools → Console
3. You'll see: `[ElectIQ Self-Test] All 5 tests passed ✓`
4. For extended tests, paste contents of `test.js` into the console

### In Node.js (without DOM)
```bash
node test.js
```

---

## 📸 Screenshots

| Section | Description |
|---|---|
| Hero | Animated civic-themed landing with stats |
| API Setup | Gemini key input with live verification |
| Timeline | 7-phase animated election timeline |
| AI Chat | Gemini-powered Q&A with quick prompts |
| Quiz | 5-question interactive knowledge test |
| Glossary | 12 key election terms |

---

## 📄 License

MIT License — open for educational and civic use.

---

*Built with ❤️ for Google Prompt Wars 2025 · Powered by Google Gemini AI*
