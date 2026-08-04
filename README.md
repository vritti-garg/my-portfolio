# Vritti Garg — Portfolio (Dual-Mode Dashboard)

No frameworks, no build step — just `index.html`, `style.css`, `script.js`. Opens straight in a browser.

## Run it in VS Code

1. Unzip the folder and open it in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **Open with Live Server**. It'll open in your browser and auto-refresh whenever you save.

No `npm install`, no terminal commands needed.

## What to personalize before publishing

Search the files for these placeholders and swap in your real info:

- `youremail@example.com`, LinkedIn, GitHub, and resume link — in the **Contact Channel** section of `index.html`
- `[ ADD PROJECT SCREENSHOT ]` / `[ ADD SOCIAL MEDIA SAMPLES ]` / `[ ADD CRACCON CONTENT SAMPLES ]` — swap these placeholder boxes for real `<img>` tags once you have screenshots
- `[ ADD DATES ]`, `[ ADD COMPANY NAME + STACK USED ]`, `[ ADD UNIVERSITY NAME ]` — in the **Experience Logs** timeline
- `[ ADD SPECIFIC SIMULATION PROGRAMS ]` / `[ ADD SPECIFIC SKILLS PRACTICED ]` — in the Security Ops "Cybersecurity Internship Simulations" card
- The metric numbers at the top (150+, 3, 2) — update if your real counts differ

To add an image, drop the file in the project folder and replace a placeholder box like this:
```html
<div class="case-shot placeholder-shot">
  <span class="mono">[ ADD PROJECT SCREENSHOT ]</span>
</div>
```
with:
```html
<img src="images/artist-site.png" alt="Artist portfolio website screenshot" class="case-shot">
```
(You may want to add `object-fit: cover; width:100%; height:100%;` to `.case-shot` in `style.css` once real images are in.)

## Deploy for free

**Option A — Netlify Drop (fastest, zero setup)**
1. Go to https://app.netlify.com/drop
2. Drag the whole project folder onto the page.
3. You get a live URL instantly (e.g. `yourname.netlify.app`). Free custom domain support included if you want one later.

**Option B — GitHub Pages (good if you want version control too)**
1. Create a new GitHub repo, e.g. `vritti-portfolio`.
2. Push these three files (`index.html`, `style.css`, `script.js`) to the repo's `main` branch.
3. In the repo: **Settings → Pages → Source → Deploy from branch → main / root**.
4. Your site goes live at `https://your-username.github.io/vritti-portfolio/`.

**Option C — Vercel**
1. Go to https://vercel.com, sign in with GitHub.
2. Import the repo (or drag-and-drop the folder via their dashboard).
3. Deploy — no build settings needed since there's no framework.

All three are free and re-deploy automatically (Netlify/Vercel) or on every push (GitHub Pages) once connected to a repo.

## Structure

```
portfolio/
├── index.html   → all content & sections
├── style.css    → design system (colors, type, layout)
├── script.js    → boot animation, nav toggle, scroll reveals
└── README.md    → this file
```

## Sections (in order)

1. Boot sequence (skippable, plays once per browser session)
2. Dashboard — name, mode cards, quick metrics
3. Creative Ops — artist website, social media, CRACCON
4. Security Ops — PhishGuard, secure code tool, Cyberzee, internship simulations
5. Bridge — the "why two modes" connective statement
6. Experience Logs — timeline
7. Skills Matrix
8. Contact Channel