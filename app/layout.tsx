import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOTMESS London — The Filth Frequency",
  description: "Radio, drops, and aftercare—made to move through you.",
  keywords: ["HOTMESS", "London", "radio", "queer", "fashion", "drops"],
  openGraph: {
    title: "HOTMESS London — The Filth Frequency",
    description: "Radio, drops, and aftercare—made to move through you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Oswald:wght@200..700&family=JetBrains+Mono:wght@100..800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}