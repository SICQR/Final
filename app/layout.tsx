import SponsorshipTickerVertical from "@/components/SponsorshipTickerVertical";
import StickyRadioDrawer from "@/components/StickyRadioDrawer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans min-h-screen flex flex-col">
        <SponsorshipTickerVertical />
        <StickyRadioDrawer />
        {children}
      </body>
    </html>
  );
}