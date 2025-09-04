# HOTMESS Editorial Commerce — Next.js + Sanity + Tailwind

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your configuration values:
     ```bash
     cp .env.example .env.local
     ```

3. **Configure Sanity CMS**
   - Create a [Sanity project](https://www.sanity.io/get-started)
   - Add the schema from `/schemas/`
   - Set your `SANITY_PROJECT_ID` and `SANITY_DATASET` in `.env.local`

4. **Run locally**
   ```bash
   npm run dev
   ```

5. **Edit content live**
   - `npm run studio` to open Sanity Studio
   - All editorial sections & lookbook slides are editable

## 🌈 Features

- **CMS-powered lookbook** — parallax, scroll, overlays, video/SVG, custom fonts
- **Animated dropdowns/overlays** — Radix UI + Framer Motion
- **Shop with instant search** — demo Shopify API included
- **Admin/editor UI** — update slides, overlays, fonts via browser
- **Affiliate dashboard** — QR, stats, payouts

## 🚀 Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy HOTMESS application"
   git push
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Import the project

3. **Set Environment Variables in Vercel**
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables" tab
   - Add the following variables from `.env.example`:
     
     **Required Variables:**
     - `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
     - `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (usually "production")
     - `SANITY_PROJECT_ID` - Your Sanity project ID (same as above)
     - `SANITY_DATASET` - Sanity dataset (same as above)
     - `ADMIN_USER` - Admin username for /admin route
     - `ADMIN_PASS` - Admin password for /admin route
     - `NEXT_PUBLIC_SITE_URL` - Your domain (e.g., https://your-project.vercel.app)
     
     **Optional Variables:**
     - `SANITY_API_WRITE_TOKEN` - For admin functionality
     - `SANITY_READ_TOKEN` - For preview mode
     - `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
     - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Shopify API token
     - `TELEGRAM_BOT_TOKEN` - For notifications
     - `TELEGRAM_CHAT_ID` - Telegram chat ID
     - `REVALIDATION_SECRET` - For webhook revalidation

4. **Deploy**
   - Hit deploy in Vercel dashboard
   - Your site will be live at `https://your-project.vercel.app`

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx           # Homepage
├── globals.css        # Global styles with Tailwind
├── admin/             # Admin dashboard (protected)
├── radio/             # Radio page
├── shop/              # Product catalog
├── about/             # About page
├── affiliate/         # Affiliate program
└── not-found.tsx      # 404 page

components/            # Reusable components (to be added)
schemas/              # Sanity CMS schemas
├── index.ts          # Schema definitions
```

## 🔧 Build & Test

```bash
# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Start Sanity Studio
npm run studio
```

## 🌍 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SANITY_PROJECT_ID` | Your Sanity project ID | Yes |
| `SANITY_DATASET` | Sanity dataset name | Yes |
| `ADMIN_USER` | Admin username for /admin route | Yes |
| `ADMIN_PASS` | Admin password for /admin route | Yes |
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | No |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify storefront API token | No |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token for notifications | No |
| `TELEGRAM_CHAT_ID` | Telegram chat ID for notifications | No |

## 👥 Collaborators

Add collaborators by GitHub username or email in your repo settings.

## 💬 Support

DM @SICQR or open an issue for help!