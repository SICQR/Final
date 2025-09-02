export type Product = {
  handle: string;
  image: string;
  title: string;
  collection: string;
  priceCents: number;
};

export const PRODUCTS: Product[] = [
  {
    handle: "hotmess-tshirt",
    image: "/icon-192.png",
    title: "HOTMESS T-Shirt",
    collection: "Apparel",
    priceCents: 2500,
  },
  {
    handle: "hotmess-hat",
    image: "/icon-512.png",
    title: "HOTMESS Hat",
    collection: "Accessories",
    priceCents: 1800,
  },
];
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