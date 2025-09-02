import fetch from "node-fetch";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GROUP_ID = process.env.TELEGRAM_GROUP_ID; // Set your lounge group id

export async function handleTelegramMessage(body: any) {
  // Example: mirror message to lounge, moderate, etc.
  if (body.message && body.message.text) {
    // TODO: validate sender is a member, log to Supabase, echo to lounge
    return { ok: true, mirrored: true };
  }
  return { ok: false };
}

export async function createTelegramInviteLink(userId: string) {
  // TODO: check if user exists in lounge, generate invite link (Telegram Bot API)
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createChatInviteLink`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: GROUP_ID,
      member_limit: 1,
      creates_join_request: true
    })
  });
  const json = await res.json() as { result?: { invite_link?: string } };
  return json.result?.invite_link;
}

export async function sendTelegramMessage(text: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: GROUP_ID,
      text
    })
  });
}