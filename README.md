# HBDR - Minimal HTMX Site

A clean, minimal website using plain HTML, CSS, and HTMX deployed on Cloudflare Workers.

## Stack

- **HTML/CSS** - Plain files, no framework
- **HTMX** - For SPA-like interactions (via CDN)
- **Cloudflare Workers** - Edge hosting with static assets

## Structure

```
hbdr-minimal/
├── public/              # Static assets
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── contact.html
│   └── styles.css
├── src/
│   └── index.js         # Worker (handles API routes)
├── wrangler.toml        # Cloudflare config
└── README.md
```

## Local Development

```bash
npx wrangler dev
```

## Deploy

```bash
npx wrangler deploy
```

Or connect GitHub repo to Cloudflare and it auto-deploys on push.

## Cloudflare Setup

In Cloudflare Dashboard → Workers & Pages → Create:

1. Connect to GitHub repo
2. Build settings:
   - **Build command:** `npx wrangler deploy`
   - **Build output directory:** (leave empty)

The worker serves static files from `/public` and handles `/api/contact` for form submissions.
