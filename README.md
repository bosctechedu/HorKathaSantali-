# HorKathaSantali

A Santali language & learning platform by BOSC Tech & Edu (React + Vite PWA, fully static).

## Local
npm install
npm run dev      # http://localhost:5173
npm run build    # output is the dist/ folder

## Cloudflare Pages
- Project name: horkathasantali  → https://horkathasantali.pages.dev
- Framework preset: Vite (or None)
- Build command: npm run build
- Build output directory: dist
- Environment variable: NODE_VERSION = 22
No API key or secret is needed.

## Admin
Admin changes (words, quiz, hero) are saved only on that device (localStorage/IndexedDB).
On first sign-in, the Admin ID and password (min 8 characters) you enter become the admin login.
The password is stored on the device only as a SHA-256 hash.
