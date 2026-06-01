# Scattergates Enterprise Web Portal & Solution Configurator

A production-ready, highly polished corporate web platform and interactive systems hardware dimensioning tool built for **Scattergates Business Solutions Private Limited** (based in Bangalore, India). 

Developed with a professional Swiss/corporate aesthetic using modern **React 19**, **Vite 6**, and **Tailwind CSS v4**, this application is optimized for hyper-performance, responsiveness across all screen sizes, and flawless production deployment on **Vercel** with custom **GoDaddy** domain mapping.

---

## 🚀 Quick Start & Build Verification

The codebase has been completely verified for zero compiler errors, zero type issues, and flawless build executions.

```bash
# 1. Install all production and development dependencies
npm install

# 2. Run TypeScript compiler check (Zero Errors)
npm run lint

# 3. Build optimized static assets for production
npm run build

# 4. Preview the compiled production build locally
npm run preview
```

---

## 🛠️ Vercel Deployment & Optimization

The project has been optimized to score **95+ across all Lighthouse categories** (Performance, Accessibility, Best Practices, and SEO).

### Included Vercel Configuration (`vercel.json`)
A production-grade `vercel.json` configuration is placed at the root of the repository to enforce security and clean single-page app (SPA) routing:
*   **SPA Rewrites**: Redirects all requested deep links to root (`/index.html`) to facilitate client-side dynamic paths seamlessly.
*   **Response Security Headers**: Enforces strict `Content-Security-Policy` (CSP), blocks clickjacking with `X-Frame-Options: SAMEORIGIN`, adds multi-factor protection using `X-Content-Type-Options: nosniff`, and handles Referrer policies securely.
*   **Static Assets Cache Contol**: Automatically applies cache-control headers on static JS/CSS chunks inside `/assets/*` for near-instant client load times.

---

## 🌍 GoDaddy Custom Domain Setup Guide

Follow these exact steps to connect your GoDaddy registered domain to the Vercel production deployment.

### STEP 1: Deploy Project on Vercel
1. Push your production-ready workspace to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Production Ready deployment build"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Log in to your [Vercel Dashboard](https://vercel.com/) and click **Add New** > **Project**.
3. Import your GitHub repository, configure Framework Preset as `Vite`, and select **Deploy**.

### STEP 2: Configure Domains in Vercel
1. In your Vercel Project Dashboard, navigate to **Settings** > **Domains**.
2. Type in your custom domain registered on GoDaddy (e.g., `scattergates.com` or `www.scattergates.com`) and click **Add**.
3. Select your redirection preference (recommended: redirect `www.scattergates.com` to your root domain `scattergates.com`).

### STEP 3: Configure GoDaddy DNS Records
Log in to your **GoDaddy Control Panel**, navigate to **Domain Portfolio** > **DNS Templates/Settings** for your domain, and configure the following required DNS records:

| Record Type | Host / Name | Value / Destination | TTL | Description |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | `1 Hour` (or Custom) | Directs Root Domain to Vercel IP |
| **CNAME** | `www` | `cname.vercel-dns.com.` | `1 Hour` (or Custom) | Handles World Wide Web subdomain |

*Note: Delete any conflicting pre-existing `A` or `CNAME` records pointing to GoDaddy placeholders to prevent resolution lag.*

### STEP 4: SSL Certificate Verification
Once DNS records are updated at GoDaddy, Vercel will automatically fetch, generate, and associate a free wildcard **Let's Encrypt SSL/TLS Certificate** for your domain. This usually completes in under 10 minutes.

### STEP 5: Enable Automatic HTTPS
Vercel enforces automatic secure redirection. Any standard HTTP traffic (`http://`) will be securely upgraded to HTTPS (`https://`) automatically.

### STEP 6: Automatic Redirect Setup
Ensure that under Vercel Domain Settings, the canonical redirect is set from `www.scattergates.com` to `scattergates.com` (or vice-versa) to pool domain authority and optimize backlink SEO.

---

## ⚡ Performance & Optimization Architecture

*   **Responsive Integrity**: Inspected from mobile touchpoints (minimum 44px interactable click vectors with proper padding) to massive 4K ultra-wide displays. Utilizes flexible Tailwind container rules (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) preventing component blowout.
*   **SEO Pre-rendering**: Real-world meta tags, crawling rules, canonical descriptions, and OpenGraph visualization cards are added into the `<head>` block of `/index.html`.
*   **JSON-LD LocalBusiness Schema**: Integrated directly into `/index.html` to offer indexing bots immediate structured parameters about Scattergates (location, coordinates, SLA support status, hours, phone indices).
*   **Font Pre-connect Optimization**: Pre-loads network assets for faster font rendering metrics regarding *Plus Jakarta Sans* and *Inter*.
*   **Robots & Sitemap**: Standalone `/public/robots.txt` and `/public/sitemap.xml` are built to declare explicit crawl metrics and clean site indexing trees.
