"use client";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
export default function AffiliateDashboard() {
  const [code] = useState("DEMOAFFILIATE123");
  // Demo stats
  const stats = { clicks: 120, signups: 8, commissions: "$340" };
  return (
    <div className="bg-white/10 border border-white/30 rounded-xl p-6 flex flex-col items-center">
      <div className="mb-4">
  <QRCodeSVG value={`https://hotmess.com/?ref=${code}`} size={96} fgColor="#ff1981" />
      </div>
      <div className="mb-2 font-bold">Your Affiliate Code:</div>
      <div className="mb-4 px-4 py-2 rounded bg-black/30 text-hotpink font-mono">{code}</div>
      <div className="mb-2">Stats:</div>
      <div className="flex gap-8 justify-center text-center mb-2">
        <div>
          <div className="font-bold text-xl">{stats.clicks}</div>
          <div className="text-xs opacity-70">Clicks</div>
        </div>
        <div>
          <div className="font-bold text-xl">{stats.signups}</div>
          <div className="text-xs opacity-70">Signups</div>
        </div>
        <div>
          <div className="font-bold text-xl">{stats.commissions}</div>
          <div className="text-xs opacity-70">Commissions</div>
        </div>
      </div>
    </div>
  );
}