
# MALPINOHDISTRO Fan Links - Next.js

This is the Next.js application that handles the fan link pages (`/link/[slug]`) with Static Site Generation (SSG) and proper Open Graph meta tags.

## Features

- ✅ Static Site Generation (SSG)
- ✅ Dynamic Open Graph meta tags
- ✅ Twitter Card support
- ✅ Structured data for SEO
- ✅ Incremental Static Regeneration (ISR)
- ✅ Proper social media previews

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Deployment

This app should be deployed separately from your main Vite app. You can deploy it to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting**

## URL Structure

- Main app: `https://yourdomain.com` (Vite app)
- Fan links: `https://link.yourdomain.com` or `https://yourdomain.com/link/[slug]` (Next.js app)

## How it works

1. **Build time**: `getStaticPaths` fetches all existing fan link slugs
2. **Request time**: `getStaticProps` fetches individual fan link data
3. **SSG**: Pages are pre-rendered with proper meta tags
4. **ISR**: New links are generated on-demand and cached
