# HOTMESS London — Full Handoff (v2025-09-03)

**Do not ship without reading this page.** This is the watertight brief for website, radio, bot, and ops. 
Brand voice: masc, queer, provocative, unapologetic — with safety first. Europe/London timezone.

## 0. TL;DR Ship List
- ENV set in Vercel + 1Password; Rotate every 90d.
- Sanity + Supabase schemas applied; RLS enabled.
- RadioKing schedule loaded; backup stream configured; loudness ok (-14 LUFS, peak ≤ -1 dBTP).
- Telegram bot online with admin + GDPR commands.
- Affiliate math + legal terms active; payout sheet live.
- Assets uploaded; 404s resolved; OG images per route.
- QA gates: Lighthouse budget, Playwright smoke, axe CI, Sentry releases.
- Analytics events wired; UTM flows persist into checkout + Supabase.
- Legal pages live; cookie consent blocks tags.

## 1. Business Overview
Ecosystem: Fashion (RAW/HUNG/HIGH/SUPERHUNG/SUPERHIGH), HNH MESS (lube), RAW CONVICT RECORDS (music), HOTMESS Radio (media), Affiliate/White-label, Care & Loyalty.

Core taglines:
- HOTMESS London: **Always too much, never enough.**
- HNH MESS: **HAND ‘N’ HAND IS THE ONLY WAY TO LAND.**

## 2. Site Architecture
- `/` Home (hero, now/next, shop teaser, radio teaser, affiliate strip)
- `/radio` Player + schedule (Sanity)
- `/shop` Shopify collections
- `/product/[handle]` PDP + Buy Now
- `/lookbook` Editorial
- `/policy` Privacy/Terms/Affiliate/Cookies
- `/drops/[slug]` Timed drops + legend board
- `/dj/[slug]` DJ bios + mixes
- `/members` Members/affiliate gate
- `/care` Heavy Healthy Real Care
- `/affiliates` Public pitch + signup
- `/status` Public status page

Global components: Header, Footer, NowNextTicker, PlayerDock, ConsentGate, AgeGate, ThemeSkin.

## 3. Stack
Next.js (App Router, TS, pnpm, Vercel) • Sanity v3 • Shopify Storefront API • Supabase (logs: scans, links, bot) • RadioKing • Telegram Bot • Make.com • Sentry • GA4/Plausible.

## 4. User Flows
See `/make/scenarios.md` (QR→Bot→Shop), `/bot/command-map.md`, `/ops/editorial-sop.md`, `/radio/*`.

## 5. Data Models
- Sanity schemas: shows, djs, drops, collections, products, lookbookItem, policy, audioPack, stylePack, membersHero.
- Supabase: scans, affiliates, payouts, links, bot_logs, legend_board, webhooks.
Apply SQL in `/supabase/schema.sql` then enable RLS.

## 6. Radio
- Schedule CSV: `/radio/schedule.csv`
- Jingles map: `/radio/jingles.json`
- Rotation policy: `/radio/rotation.json`
- Audio manifest (gain/cues): `/audio/manifest.csv`

## 7. CI/CD & QA
- Lighthouse config `/ci/lighthouse.config.js`
- Playwright `/tests/e2e/basic.spec.ts`
- GitHub Actions `/ci/playwright.yml`
- Sentry release tagging via build script (not included here).

## 8. Legal & Privacy
- `/legal/privacy.md` `/legal/terms.md` `/legal/cookies.md` `/legal/affiliate-terms.md`
- Data retention `/ops/data-retention.md`

## 9. Analytics
Events spec: `/lib/analytics-events.md`

## 10. Design Tokens
`/styles/tokens.json` (brutalist white + radio daypart skins).

---
**Owner Notes**
- Europe/London timezone; DST edge-cases tested around clock changes.
- Cookie consent must block GA/Sentry prior to opt-in.
- AgeGate on first visit; persist for 30 days.

