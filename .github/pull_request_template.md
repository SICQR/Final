## HOTMESS — Handoff Pack PR

**What does this change?**
- [ ] Adds docs/ + ops/ + legal/ handoff pack
- [ ] Adds /status and /affiliates routes (Next.js App Router, TS)
- [ ] Adds CI (Lighthouse, Playwright) and analytics events spec

**How to test**
1. `pnpm build && pnpm start`
2. Visit `/status` → should render "All systems: UP"
3. Visit `/affiliates` → CTA to Telegram bot
4. Run Playwright: `pnpm exec playwright test`

**Checklist**
- [ ] .env set in Vercel
- [ ] Sanity & Supabase schemas applied
- [ ] RadioKing schedule loaded + backup stream set
- [ ] Cookie consent blocks analytics
