"use client";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { fetchLoungeMessages, sendLoungeMessage, reportMessage } from "@/lib/lounge";
import { useSession } from "@/lib/auth";

export default function LoungeChat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const { user } = useSession();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchLoungeMessages().then(setMessages);
    const id = setInterval(() => fetchLoungeMessages().then(setMessages), 3000); // polling for demo
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-box bg-white rounded-xl shadow-xl p-4" style={{ transition: 'all 0.3s' }}>
      <div className="overflow-y-auto max-h-96">
        {messages.map((m) => (
          <div key={m.id} className="flex items-center mb-2">
            <span className="font-bold">{m.user_handle || "Anon"}:</span>
            <span className="ml-2">{m.text}</span>
            <button
              className="ml-2 text-xs text-red-500"
              onClick={() => reportMessage(m.id)}
            >Report</button>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form
        className="flex gap-2 mt-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!text.trim()) return;
          await sendLoungeMessage(text);
          setText("");
          fetchLoungeMessages().then(setMessages);
        }}
      >
        <button type="button" onClick={() => setShowPicker((v) => !v)}>😊</button>
        {showPicker && (
          <div className="absolute z-10">
            <EmojiPicker onEmojiClick={e => setText(text + e.emoji)} />
          </div>
        )}
        <input
          className="input input-bordered flex-1"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type a message…"
        />
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}