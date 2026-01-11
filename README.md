# HBDR - Minimal HTMX Site

A clean, minimal website using plain HTML, CSS, and HTMX. No build step required.

## Stack

- **HTML/CSS** - Plain files, no framework
- **HTMX** - For SPA-like interactions (via CDN)
- **Cloudflare Pages** - Hosting with edge functions

## Structure

```
hbdr-minimal/
├── index.html        # Home page
├── about.html        # About page
├── services.html     # Services page
├── contact.html      # Contact page (with HTMX form)
├── styles.css        # All styles
├── wrangler.toml     # Cloudflare config
├── functions/
│   └── api/
│       └── contact.js   # Form handler (Cloudflare Function)
└── README.md
```

## Local Development

Option 1: Simple HTTP server
```bash
# Python
python -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Option 2: With Cloudflare Functions (for form handling)
```bash
npx wrangler pages dev .
```

## Deploy to Cloudflare

### Via Dashboard (easiest)
1. Go to Cloudflare Dashboard > Pages
2. Create new project
3. Upload the folder or connect to Git
4. Done!

### Via CLI
```bash
# Login to Cloudflare
npx wrangler login

# Deploy
npx wrangler pages deploy .
```

## HTMX Features Used

- `hx-boost="true"` - On body, makes all links load via AJAX (SPA-like)
- `hx-post="/api/contact"` - Submit form to Cloudflare Function
- `hx-target="#form-result"` - Where to put the response
- `hx-swap="innerHTML"` - How to insert the response

## Customization

### Colors (in styles.css)
```css
:root {
  --black: #000000;
  --cyan: #00ffff;    /* Accent color */
  --green: #00ff00;   /* Success color */
  /* ... */
}
```

### Font
Uses JetBrains Mono via Google Fonts. Change in the `<head>` of each HTML file.

## Adding More Pages

1. Copy any HTML file as a template
2. Update the `<title>` and content
3. Update nav links if needed
4. Deploy

No build step - just edit and deploy!
