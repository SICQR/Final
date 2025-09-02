# HOTMESS London — Web + Radio + Members (Next.js App Router)

Men-only (18+), consent-first, aftercare available.  
**Voice map**: Core (site), Collection-spicy (HUNG/RAW/SUPERHUNG only), Hustler (Affiliate), Serious (Care/Legal).

## 🔧 Tech Stack
- **Next.js (App Router)**, React, TypeScript
- **Sanity** (content), scheduled publishing + webhooks
- **RadioKing** (stream), PlayerDock component
- **Telegram Bot** (identity: Members verify + JWT)
- **Make.com + Google Sheets + Notion** (automation, ledger, moderation)

## 📦 Monorepo Structure (key)

app/
layout.tsx
page.tsx # Home
radio/page.tsx
records/page.tsx
shop/page.tsx
shop/[collection]/page.tsx
shop/product/[slug]/page.tsx
members/page.tsx
members/verify/page.tsx
members/xxx/page.tsx
affiliate/page.tsx
care/page.tsx
partners/page.tsx
community/page.tsx
about/page.tsx
press/page.tsx
accessibility/page.tsx
privacy/hub/page.tsx
legal/(hub)/page.tsx
legal/privacy/page.tsx
legal/terms/page.tsx
legal/care-disclaimer/page.tsx
legal/ugc/page.tsx
legal/abuse/page.tsx
legal/dmca/page.tsx
legal/18-plus/page.tsx
legal/sponsor/page.tsx
components/
Header.tsx Footer.tsx StickyActions.tsx PlayerDock.tsx CrossPromo.tsx
ConsentGate.tsx MemberTease.tsx AffiliateTools.tsx CollectionTabs.tsx
ProductCard.tsx PDPGallery.tsx LookbookPanel.tsx
StylePackProvider.tsx
lib/
stylepacks.ts sanity.ts attribution.ts cookies.ts jwt.ts telegram.ts
api routes (App):
api/revalidate/route.ts
api/auth/telegram/verify/route.ts
api/bot/webhook/route.ts
api/affiliate/issue/route.ts
sanity/
schemas/{stylePack.ts,audioPack.ts,show.ts,hero.ts,collection.ts,product.ts,policy.ts}

## 🧩 Components (site-wide)
- **StickyActions** – Shop • Listen • Join Members • Affiliate • Care
- **PlayerDock** – mini player (expands on /radio and /members/xxx)
- **ConsentGate** – modal for 18+, men-only, UGC post consent
- **CrossPromo** – context-aware 3-CTA strip
- **MemberTease** – blurred previews with “Join via Telegram”
- **AffiliateTools** – QR + short link generator (UTM attach)
- **StylePackProvider** – injects CSS variables by active Style Pack

## 🎨 Voice Map (enforced)
- **Core**: Home, Radio, Records, Members, Partners, Community, About
- **Collection-spicy**: HUNG, RAW, SUPERHUNG (Shop only)
- **Playful (light)**: HIGH
- **Hustler/Provider**: Affiliate
- **Serious**: Care, Legal, Accessibility, Privacy Hub

## 🔐 Identity & Gating
- **/members → Join with Telegram** (deep link `t.me/hotmess_radio_bot?start=verify_{nonce}`)
- Bot asks self-attest 18+/men-only + consent → signs short-lived **JWT**
- Site consumes token at **/members/verify** → sets session → **/members/xxx**
- Route guards check `session.role` (member|mod|creator)

## 🌐 Environment
Create `.env.local`:

NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=xxxx
REVALIDATE_SECRET=xxxx

TELEGRAM_BOT_TOKEN=8335xxxxxxxxxxxxxxxxxxxx
TELEGRAM_BOT_WEBHOOK_SECRET=xxxx
JWT_SECRET=long_random_string
SHOPIFY_STOREFRONT_TOKEN=xxxx
OPENWEATHER_API_KEY=xxxx
GOOGLE_SHEETS_WEBHOOK_SECRET=xxxx

## 🗄️ Sanity Schemas (minimum viable)
- **stylePack**: { title, mode(brutalistDay|nightRadio|editorialLookbook), colors, type, radius, shadow, motionMs, audioPackRef }
- **audioPack**: { intro, outro, stingers[], ttsVoice }
- **show**: { title, schedule, stylePackRef, sponsor, introTemplate, outroTemplate, stingerRefs[] }
- **hero**: { headline, subhead, image, ctas[] }
- **collection**: { title (RAW/HUNG/HIGH/SUPERHUNG), tagline, image, slug }
- **product**: { title, images[], price, sizes[], collectionRef, copy, availability }
- **policy**: { title, slug, content }

## 🔁 Revalidation
Sanity → Webhook → `POST /api/revalidate` with header `x-secret: REVALIDATE_SECRET` and JSON `{ "tag": "hero" | "show" | "stylePack" | "collection" | "product" }`.

## 🤖 Make.com Scenarios
1. **Bot Gateway**: Telegram → command parse → actions → responses (verify, link, radio, drop).
2. **Affiliate Ledger**: Webhook from `/api/affiliate/issue` + Shopify order events → Google Sheet `affiliate_ledger` → weekly payout queue.
3. **Members Roster**: verification events → Notion DB (role, consent ts).
4. **Radio Liners**: cron → pull Show + OpenWeather → fill VO templates → TTS → upload to Sanity `audioPack`.
5. **Care Triage**: /care form → anonymised intake sheet + SLA alert.

**Google Sheet columns (affiliate_ledger):**
`timestamp, telegram_id, link_id, sku, amount_gbp, order_id, utm_source, utm_campaign, commission_rate, commission_due_gbp, payout_status`

## 🚀 Scripts

pnpm dev # run local
pnpm build && pnpm start
pnpm typecheck
pnpm lint

## ✅ QA Checklist (ship gate)
- Voice map correct per page (Core/Spicy/Hustler/Serious).
- StickyActions present on all pages; CrossPromo visible near end.
- ConsentGate triggers on Members join + UGC post + Affiliate link gen.
- Aftercare disclaimer visible on /care and where “aftercare” appears.
- Revalidate webhook updates hero/style/show without redeploy.
- /members/verify consumes JWT and denies expired tokens.
- Affiliate links add UTM and log to Sheets (Make scenario fires).

## 🧯 Troubleshooting
- **JWT errors**: confirm `JWT_SECRET`, check token exp (15 min default).  
- **Telegram deep link**: ensure BotFather webhook set to `/api/bot/webhook` with your `TELEGRAM_BOT_WEBHOOK_SECRET`.  
- **Sanity assets not refreshing**: verify webhook `x-secret` and tag names.  
- **Audio not rotating**: confirm Make cron, OpenWeather key, Sanity file upload permissions.

## 📣 Accessibility
- 16px+ body, high contrast, alt text on all media, focus states visible.
- Radio player controls labeled; transcripts/tracklists linked.

## ⚖️ Legal & Safety
- Men-only 18+ policy live; Age Verification page linked.
- UGC/Moderation, Abuse & Safety, DMCA routes live with forms.
- Sponsorship Disclosures auto-tag on sponsored sections.