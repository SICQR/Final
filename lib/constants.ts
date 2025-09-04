export const STREAM_URL = process.env.NEXT_PUBLIC_STREAM_URL || "";

// Simple navigation structure used by Header and MobileNav.
export const NAV: { label: string; href: string; items?: { label: string; href: string }[] }[] = [
	{ label: "Radio", href: "/radio" },
	{ label: "Shop", href: "/shop" },
	{ label: "About", href: "/about" },
	{ label: "Affiliate", href: "/affiliate" },
];
