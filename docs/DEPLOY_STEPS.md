# Deploy Steps (Vercel)

1) Create project in Vercel; import GitHub repo.
2) Set env vars from `env/.env.example` (see README-HANDOFF for list).
3) Build command: `pnpm build` — Output: `.next`
4) Add Sentry DSN (optional), GA4/Plausible domains.
5) Connect custom domains; enable HTTPS.
6) Sanity Studio: deploy separately or host on /studio subdomain.
7) Run Playwright in preview; block merge if failing.
