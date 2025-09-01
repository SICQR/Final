export default function Footer() {
  return (
    <footer className="w-full px-6 py-8 text-center text-xs opacity-60">
      &copy; {new Date().getFullYear()} HOTMESS &mdash; Built on Next.js, Tailwind, Sanity, Framer Motion, Radix UI
    </footer>
  );
}