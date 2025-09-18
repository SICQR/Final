import type { Metadata } from "next";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOTMESS London — The Filth Frequency",
  description: "Radio, drops, and aftercare—made to move through you.",
  keywords: ["HOTMESS", "London", "radio", "queer", "fashion", "drops", "LGBTQ+", "community", "aftercare"],
  authors: [{ name: "HOTMESS London" }],
  creator: "HOTMESS London",
  publisher: "HOTMESS London",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "HOTMESS London — The Filth Frequency",
    description: "Radio, drops, and aftercare—made to move through you.",
    url: "https://hotmessldn.com",
    siteName: "HOTMESS London",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HOTMESS London - Queer engine. Streamed. Scanned. Worn.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOTMESS London — The Filth Frequency",
    description: "Radio, drops, and aftercare—made to move through you.",
    creator: "@hotmessldn",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL('https://hotmessldn.com'),
  alternates: {
    canonical: "https://hotmessldn.com",
  },
  verification: {
    google: "your-google-verification-code",
  },
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Oswald:wght@200..700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* Google Analytics - Replace with your GA4 measurement ID */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `,
          }}
        />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HOTMESS London",
              "url": "https://hotmessldn.com",
              "logo": "https://hotmessldn.com/logo.png",
              "description": "Queer engine. Streamed. Scanned. Worn. Radio, drops, and aftercare—made to move through you.",
              "sameAs": [
                "https://instagram.com/hotmessldn",
                "https://twitter.com/hotmessldn",
                "https://discord.gg/hotmess"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "areaServed": "GB",
                "availableLanguage": "English"
              }
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}