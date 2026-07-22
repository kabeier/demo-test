# Deploying this project to GitHub Pages

This is a **Vite + React** single-page app that uses `react-router-dom`
(`createBrowserRouter`). GitHub Pages serves static files only, with **no
server-side routing** — so refreshing a deep link like `/pokemon/25` would
normally return a 404.

To avoid that, we use **hash routing in production** (URLs like `/#/pokemon/25`).
The route lives in the URL fragment (`#...`), which the browser never sends to the
server, so every request just loads `index.html`, which always exists. No 404
workaround needed.

To keep clean URLs during local development, we keep **browser routing in dev**
and switch to **hash routing only in the production build** — one small conditional
handles both.

Follow the steps in order. Replace `<repo>` with your actual repository name and
`<user>` with your GitHub username throughout.

---

## Step 0 — Prerequisites

- A GitHub account.
- Git installed (`git --version` to check).
- This project builds locally: run `npm install` then `npm run build` and confirm
  a `dist/` folder is produced with no errors.

> Note: this folder is **not yet a git repository** (there is no `.git`). Step 3
> initializes it.

---

## Step 1 — Set the Vite `base` path

GitHub Pages serves the project from `/<repo>/`, so all **asset** URLs (JS, CSS,
images) must be prefixed with that path. This is separate from routing — hash
routing does not change how assets are loaded.

Edit `vite.config.js` and add a `base` key:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/<repo>/',          // <-- add this. Must start AND end with a slash.
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "shout-clubbing-demeanor.ngrok-free.dev",
    ],
  },
})
```

> If you later deploy to a `<user>.github.io` repo (the root site) or a custom
> domain, set `base` to `'/'` instead.

---

## Step 2 — Use browser routing in dev, hash routing in production

React Router's data-router API gives us two matching factory functions with the
**same route config**:

- `createBrowserRouter` → clean URLs (`/about`), needs a server fallback.
- `createHashRouter` → hash URLs (`/#/about`), works on any static host.

Vite exposes `import.meta.env.PROD` (`true` only in the production build), so we
pick the router based on the environment. Edit `src/router.jsx`:

```js
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import About from "./pages/About";
import ErrorPage from "./pages/ErrorPage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import LoginPage from "./pages/LoginPage";

// The route config is identical for both routers.
const routes = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "pokemon/:id",
                element: <PokemonDetailsPage/>
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    }
];

// Browser routing (clean URLs) locally; hash routing (static-host safe) in the build.
const router = import.meta.env.PROD
    ? createHashRouter(routes)
    : createBrowserRouter(routes);

export default router;
```

What this gives you:

- **`npm run dev`** → `import.meta.env.PROD` is `false` → `createBrowserRouter` →
  clean URLs like `http://localhost:5173/about`. Cypress tests keep working
  against these paths, unchanged.
- **`npm run build`** (what ships to GitHub Pages) → `import.meta.env.PROD` is
  `true` → `createHashRouter` → URLs like
  `https://<user>.github.io/<repo>/#/about`, which survive refreshes with no 404
  fallback.

> Note: no `basename` is needed. Hash routes live after the `#`, so the `/<repo>/`
> subpath doesn't affect them — `base` from Step 1 already handles the asset paths.

---

## Step 3 — Create the GitHub repository and push

From the project root:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
```

Create an empty repo on GitHub named `<repo>` (no README/gitignore — this project
already has them), then connect and push:

```bash
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

> `node_modules` and `dist` are already in `.gitignore`, so they won't be pushed.
> The deploy pipeline rebuilds `dist` in the cloud.

---

## Step 4 — Deploy

Pick **one** of the two methods below. **Method A (GitHub Actions) is
recommended** — it deploys automatically on every push and keeps built files out
of your git history.

### Method A — GitHub Actions (recommended)

Create the file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then, in your repo on GitHub:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.

Commit and push the workflow:

```bash
git add .github/workflows/deploy.yml vite.config.js src/router.jsx
git commit -m "Add GitHub Pages deployment"
git push
```

Watch the **Actions** tab. When the workflow finishes green, your site is live at:

```
https://<user>.github.io/<repo>/
```

Every future `git push` to `main` redeploys automatically.

### Method B — `gh-pages` npm package (manual)

Use this if you prefer deploying from your machine on demand.

```bash
npm install --save-dev gh-pages
```

Add deploy scripts to `package.json`:

```json
"scripts": {
  "dev": "vite --host",
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist",
  "cypress:open": "cypress open",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

Deploy:

```bash
npm run deploy
```

This builds the app and pushes `dist/` to a `gh-pages` branch. Then, in the repo:

1. Go to **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Choose branch **`gh-pages`** and folder **`/ (root)`**, then **Save**.

Your site goes live at `https://<user>.github.io/<repo>/` within a minute or two.
Re-run `npm run deploy` whenever you want to publish changes.

---

## Step 5 — Verify

1. Visit `https://<user>.github.io/<repo>/` — the home page should load with all
   styles and images (a broken/unstyled page usually means `base` in Step 1 is
   wrong).
2. Navigate to `/#/about` and a Pokémon detail page via in-app links — notice the
   `#` in the URL, which is expected in production.
3. **Refresh** on a deep link (e.g. `/<repo>/#/about`) — it should reload
   correctly with no 404, because the path after `#` is never sent to the server.

---

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Blank page, 404s for `/assets/*.js` in console | `base` in `vite.config.js` doesn't match the repo name. It must be `'/<repo>/'` with leading and trailing slashes. |
| URLs have no `#` in production and refresh 404s | Step 2 conditional not applied, or the build ran before saving `router.jsx`. Confirm the production build uses `createHashRouter`. |
| Styles missing but JS loads | Same as the `base` issue — Tailwind/Bootstrap CSS is fetched from a wrong path. |
| Actions workflow fails at `npm ci` | Commit `package-lock.json` (it's already in this repo) so `npm ci` has a lockfile. |
| Old version still showing | Browser/CDN cache — hard-refresh (Ctrl/Cmd+Shift+R); GitHub Pages CDN can take a couple of minutes. |

---

## Note on Cypress

Cypress E2E tests run against your **local** dev server (`npm run dev`), which uses
**browser routing** thanks to the Step 2 conditional — so your existing tests keep
using clean paths like `cy.visit('/about')` and don't need to change. The `#` only
appears in the deployed production build.
