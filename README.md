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
- **Community platform** — forums, events, user profiles
- **Partner portal** — collaboration management and analytics
- **Event management** — ticketing, schedules, and community features
- **Mock API infrastructure** — ready for real backend integration
- **SEO optimized** — structured data, Open Graph, Twitter Cards
- **Accessibility focused** — ARIA labels, keyboard navigation, screen reader support
- **Mobile responsive** — optimized for all device sizes

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout with fonts and metadata
├── page.tsx           # Homepage with featured content
├── globals.css        # Global styles with Tailwind
├── admin/             # Admin dashboard (protected)
├── radio/             # Radio page
├── shop/              # Product catalog
├── product/[id]/      # Dynamic product detail pages
├── events/            # Event listings
├── event/[id]/        # Dynamic event detail pages
├── community/         # Community forum and posts
├── partners/          # Partner showcase and information
├── about/             # About page
├── affiliate/         # Affiliate program
├── login/             # User authentication (scaffold)
├── register/          # User registration (scaffold)
├── profile/           # User profile management (scaffold)
├── partner/           # Partner dashboard (scaffold)
├── api/               # Next.js API routes
│   ├── products/      # Product API endpoints
│   ├── events/        # Events API endpoints
│   ├── posts/         # Community posts API
│   ├── partners/      # Partners API
│   ├── weather/       # Weather widget API
│   └── leaderboard/   # Affiliate leaderboard API
└── not-found.tsx      # 404 page

components/            # Reusable components
├── Navigation.tsx     # Main navigation with accessibility
└── Footer.tsx         # Site footer with links

schemas/              # Sanity CMS schemas
├── index.ts          # Schema definitions

.github/
└── workflows/
    └── main.yml      # CI/CD pipeline with Playwright tests
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

# Run E2E tests (requires Playwright setup)
npx playwright test
```

## 🚀 Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** — your site will be live at `https://your-project.vercel.app`

The project includes:
- Automatic deployments on main branch
- Preview deployments for pull requests
- CI/CD pipeline with linting, building, and E2E testing
- Vercel configuration optimized for Next.js

## 🌍 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `SANITY_PROJECT_ID` | Your Sanity project ID | Yes | `abc123def` |
| `SANITY_DATASET` | Sanity dataset name | Yes | `production` |
| `ADMIN_USER` | Admin username for /admin route | Yes | `admin` |
| `ADMIN_PASS` | Admin password for /admin route | Yes | `secure_password` |
| `SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | No | `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Shopify storefront API token | No | `shpat_abc123` |
| `TELEGRAM_BOT_TOKEN` | Telegram bot token for notifications | No | `123456:ABC-DEF1234ghIkl` |
| `TELEGRAM_CHAT_ID` | Telegram chat ID for notifications | No | `-1001234567890` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 measurement ID | No | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_BASE_URL` | Base URL for API calls | No | `https://hotmessldn.com` |

### Vercel Deployment Variables

For CI/CD and Vercel deployment, also configure these secrets:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel deployment token |
| `ORG_ID` | Vercel organization ID |
| `PROJECT_ID` | Vercel project ID |
| `GA_MEASUREMENT_ID` | Google Analytics measurement ID |

## 🎨 Styling & Customization

The project uses Tailwind CSS with custom brand colors:

```css
/* Custom colors defined in tailwind.config.ts */
colors: {
  hotpink: '#ff1981',    /* Primary brand color */
  hung: '#ffba00',       /* Secondary brand color */
}
```

Typography uses:
- **Headings**: Oswald font family
- **Body text**: Inter font family

## 🔗 API Routes & Data

All pages use Next.js API routes for data fetching:

- **Products**: `/api/products` and `/api/products/[id]`
- **Events**: `/api/events` and `/api/events/[id]`
- **Community**: `/api/posts`
- **Partners**: `/api/partners`
- **Weather**: `/api/weather`
- **Leaderboard**: `/api/leaderboard`

Current implementation uses mock data with proper TypeScript interfaces, ready for real backend integration.

## ♿ Accessibility Features

- **ARIA labels** and roles throughout the application
- **Keyboard navigation** support
- **Screen reader** optimized content
- **Color contrast** meets WCAG guidelines
- **Focus indicators** for interactive elements
- **Semantic HTML** structure

## 📱 Mobile Responsiveness

- **Responsive breakpoints** for all screen sizes
- **Touch-friendly** interface elements
- **Optimized images** and content layout
- **Mobile navigation** patterns

## 🔍 SEO Optimization

- **Structured data** for organization and content
- **Open Graph** meta tags for social sharing
- **Twitter Cards** for enhanced link previews
- **Canonical URLs** and meta descriptions
- **Google Analytics** integration ready
- **Sitemap generation** via Next.js

## 🧪 Testing & Quality

- **ESLint** configuration for code quality
- **Playwright** E2E testing setup
- **TypeScript** for type safety
- **CI/CD pipeline** with automated testing
- **Code formatting** and linting in CI

## 🔐 Security Features

- **Environment variable** validation
- **Input sanitization** ready for implementation
- **HTTPS** enforcement in production
- **Secure headers** via Next.js configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Ensure accessibility compliance
5. Run linting and build checks
6. Submit a pull request

## 👥 Collaborators

Add collaborators by GitHub username or email in your repo settings.

## 💬 Support

DM @SICQR or open an issue for help!

## 📋 TODO: Future Enhancements

### Backend Integration
- [ ] Replace mock APIs with real database
- [ ] Implement user authentication system
- [ ] Add payment processing for shop
- [ ] Real-time features for community

### Features
- [ ] Push notifications for events
- [ ] Advanced search and filtering
- [ ] User-generated content moderation
- [ ] Multi-language support
- [ ] Dark/light theme toggle

### Performance
- [ ] Image optimization and CDN
- [ ] Database query optimization
- [ ] Caching strategies
- [ ] Performance monitoring

### Analytics & Marketing
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] Email marketing integration
- [ ] Social media automation

---

**Built with** ❤️ **for the HOTMESS community**