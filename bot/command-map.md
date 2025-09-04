# Telegram Bot — Command Map

Public:
/start — welcome + menu
/radio — now/next + stream link
/drop — current/next drop + timer
/wet — HNH MESS promo + code
/earn — affiliate balance + payout request
/care — aftercare links (ride-share, support)
/exportme — GDPR export
/deleteme — GDPR delete

Admin (restricted):
/push <msg> — broadcast
/payouts run — run weekly payouts
/legend — read-only leaderboard top 10
/ban <user_id> — ban abusive users

Edge-case replies:
- Rate limit: “Easy, bull. Try again in a minute.”
- Unknown: “Not my frequency. Try /radio or /drop.”
- Language toggle soon (EN/ES).

State persistence: `bot_logs` with TTL; recover menus after restarts.
