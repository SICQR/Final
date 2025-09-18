import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "HOTMESS London — The Filth Frequency",
  description: "Radio, drops, and aftercare—made to move through you.",
  keywords: ["HOTMESS", "London", "radio", "queer", "fashion", "drops"],
  openGraph: {
    title: "HOTMESS London — The Filth Frequency",
    description: "Radio, drops, and aftercare—made to move through you.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://hotmessldn.com",
    siteName: "HOTMESS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HOTMESS - The Filth Frequency",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hotmessldn",
    creator: "@hotmessldn",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "HOTMESS London" }],
  creator: "HOTMESS London",
  publisher: "HOTMESS London",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Oswald:wght@200..700&display=swap" 
          rel="stylesheet" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
        )}
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}