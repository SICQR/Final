import { NextRequest, NextResponse } from "next/server";
import { getServerAdmin } from "@/lib/supabase";

const TG_API = (t: string) => `https://api.telegram.org/bot${t}`;

async function sendMessage(token: string, chatId: number | string, text: string) {
  await fetch(`${TG_API(token)}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true })
  });
}

export async function POST(req: NextRequest, context: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return NextResponse.json({ error: "bot token missing" }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const command = (context?.params?.command || "").toLowerCase();
  const chatId = body.chat_id ?? body.chatId ?? body.chatID ?? body.chat ?? 0;
  const args = (body.args ?? body.text ?? "").toString().trim();

  if (!chatId) return NextResponse.json({ error: "chat_id required" }, { status: 400 });

  try {
    switch (command) {
      case "start": {
        const msg = [
          "👑 <b>HOTMESS Radio</b>",
          "Queer radio you can wear.",
          "Listen live: /radio",
          "Get wet: /wet",
          "Earn: /claim"
        ].join("\n");
        await sendMessage(token, chatId, msg);
        break;
      }
      case "radio": {
        const stream = process.env.NEXT_PUBLIC_STREAM_URL || "https://example.com/stream";
        await sendMessage(token, chatId, `▶️ Listen live:\n${stream}`);
        break;
      }
      case "wet": {
        const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://hotmess.example"}/legal/aftercare`;
        await sendMessage(token, chatId, `💧 Aftercare is not an afterthought.\n${url}`);
        break;
      }
      case "drop": {
        const url = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/shop`;
        await sendMessage(token, chatId, `🧡 Next drop lands soon.\nBrowse drops: ${url}`);
        break;
      }
      case "claim": {
        // Create affiliate row (id auto-generated)
        try {
          const supabase = getServerAdmin();
          const handle = args?.length ? args.replace(/[^\w-]/g, "").toLowerCase() : `user${chatId}`;
          const display_name = handle;
          const { data, error } = await supabase
            .from("affiliates")
            .insert([{ handle, display_name, tg_user_id: Number(chatId) }])
            .select()
            .single();
          if (error && !String(error.message).includes("duplicate key")) throw error;

          const joined = data?.id
            ? `✅ Affiliate created: @${handle}`
            : `ℹ️ You already have an affiliate: @${handle}`;
          await sendMessage(token, chatId, `${joined}\nUse /stats to see your scans.`);
        } catch (error) {
          await sendMessage(token, chatId, "⚠️ Affiliate system not configured yet. Contact admin.");
        }
        break;
      }
      case "stats": {
        try {
          const supabase = getServerAdmin();
          // find affiliate by tg_user_id
          const { data: aff } = await supabase
            .from("affiliates")
            .select("id, handle")
            .eq("tg_user_id", Number(chatId))
            .maybeSingle();
          if (!aff?.id) {
            await sendMessage(token, chatId, "No affiliate found. Use /claim to register.");
            break;
          }
          const since = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
          const { count } = await supabase
            .from("qr_scans")
            .select("*", { count: "exact", head: true })
            .eq("affiliate_id", aff.id)
            .gte("scanned_at", since);
          await sendMessage(token, chatId, `📈 Scans (30d) for @${aff.handle}: ${count || 0}`);
        } catch (error) {
          await sendMessage(token, chatId, "⚠️ Stats system not configured yet. Contact admin.");
        }
        break;
      }
      case "broadcast":
      case "updateqr":
      case "pin":
      case "unpin": {
        await sendMessage(token, chatId, "Admin command scaffolded. Wire permissions & logic next.");
        break;
      }
      default: {
        await sendMessage(token, chatId, "Unknown command.");
      }
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "tg error" }, { status: 500 });
  }
}

// Simple GET for browser smoke tests
export async function GET(request: NextRequest, context: any) {
  return NextResponse.json({ ok: true, command: context?.params?.command });
}