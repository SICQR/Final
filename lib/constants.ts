export const SITE = {
  name: "HOTMESS London",
  routes: {
    home: "/",
    shop: "/shop",
    radio: "/radio",
    care: "/care",
    affiliate: "/affiliate",
    records: "/records",
    legal: "/legal"
  },
  streamUrl: process.env.NEXT_PUBLIC_STREAM_URL ?? ""
};

export type NavItem = { href: string; label: string; external?: boolean };

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/radio", label: "Radio" },
  { href: "/care", label: "Care" },
  { href: "/affiliate", label: "Affiliate" },
  { href: "/records", label: "Records" },
  { href: "/legal", label: "Legal" }
];