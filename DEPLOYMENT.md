# Deployment Verification Checklist

## Pre-Deployment
- [x] Build passes: `npm run build`
- [x] Linting passes: `npm run lint`
- [x] Dependencies installed: `npm install`
- [x] Required files present:
  - [x] `public/favicon.ico`
  - [x] `app/api/health/route.ts`
  - [x] `vercel.json` configured

## Environment Variables Required for Deployment
Set these in your deployment platform (e.g., Vercel):

### Required
- `SANITY_PROJECT_ID` - Your Sanity project ID
- `SANITY_DATASET` - Sanity dataset name (usually "production")
- `ADMIN_USER` - Admin username for /admin route
- `ADMIN_PASS` - Admin password for /admin route

### Optional
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Shopify storefront API token
- `TELEGRAM_BOT_TOKEN` - Telegram bot token for notifications
- `TELEGRAM_CHAT_ID` - Telegram chat ID for notifications
- `NEXT_PUBLIC_SITE_URL` - Your site URL

## Post-Deployment Verification
1. Visit `/api/health` to check system status
2. Visit `/api/test` to verify API routes work
3. Visit `/admin` to test admin authentication
4. Check that favicon loads correctly
5. Verify all pages render without errors

## Common Issues
- **Font loading warning**: This is a build-time optimization warning and doesn't affect deployment
- **Missing environment variables**: Check deployment platform environment variable settings
- **Admin route 401**: Ensure `ADMIN_USER` and `ADMIN_PASS` are set