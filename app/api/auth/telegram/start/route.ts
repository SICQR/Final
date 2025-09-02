import { NextResponse } from "next/server";
import crypto from "crypto";

// Start the Telegram deep link flow.
// Assumes you’ll store nonce server-side or sign it (stateless) for /verify.
export async function GET() {
  const nonce = crypto.randomBytes(16).toString("hex");
  // TODO: persist nonce with expiry (KV/DB) for later verification.
  const botName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME; // e.g., hotmess_radio_bot
  const url = `https://t.me/${botName}?start=verify_${nonce}`;
  return NextResponse.redirect(url);
}
