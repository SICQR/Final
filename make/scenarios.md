# Make.com Scenarios

1) QR → Scan → Bot
Trigger: Webhook (QR link). 
Actions: Write `scans`, parse UTM, send Telegram welcome, offer /drop or /radio.

2) Checkout → Affiliate Attribution
Trigger: Shopify order create.
Actions: Match UTM/link, write commission row, update legend_board, notify affiliate.

3) Refund → Clawback
Trigger: Shopify refund.
Actions: Reverse commission, log payout adjustment, notify affiliate.

4) Weekly Payouts
Trigger: CRON Friday 10:00 Europe/London.
Actions: Sum balances ≥ £50, create Stripe payouts, write `payouts` rows, send Telegram confirmations.

5) Radio Ops Alerts
Trigger: Uptime monitor (site/stream) → webhook.
Actions: If Sev0, switch to backup stream, push #ops alert.

6) Polls & Giveaways
Trigger: Radio segment times.
Actions: Post Telegram poll, collect results to `links`, randomly pick winner, notify with code.
