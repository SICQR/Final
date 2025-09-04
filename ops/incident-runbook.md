# Incident Runbook
Sev0: Stream down > 2 min. Action: switch to backup mount, post status, ping #ops.
Sev1: Checkout blocked. Action: enable maintenance banner, investigate Shopify API, rollback last deploy.
Sev2: Minor UI/404s. Action: Hotfix within 4h.

Healthchecks: /radio, /api/now-next, /shop ping every 15s. Alerts → Telegram #ops.
