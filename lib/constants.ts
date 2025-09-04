export const NAV = [
  { label: "Radio", href: "/radio", items: [
    { label: "Listen Live", href: "/radio" },
    { label: "Schedule", href: "/status" },
    { label: "Now / Next API", href: "/api/now-next" },
  ]},
  { label: "Shop", href: "/shop", items: [
    { label: "Drops", href: "/shop" },
    { label: "Members", href: "/members" },
    { label: "Affiliates", href: "/affiliates" },
  ]},
  { label: "About", href: "/about", items: [
    { label: "Care", href: "/care" },
    { label: "Press", href: "/press" },
  ]},
];
export const TICKER_ITEMS = [
  "HOTMESS LIVE — London’s Filth Frequency",
  "Every scan earns — Join the rewards",
  "RANCH HAND — Fall/Winter 2025 — Shop Now",
  "Aftercare, not afterthought",
];
export const STREAM_URL = process.env.NEXT_PUBLIC_STREAM_URL || "";
