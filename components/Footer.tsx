import Link from "next/link";

export default function Footer(){
  return (
    <footer className="mt-20 border-t border-[var(--line)]">
      <div className="container py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-black tracking-[0.18em] mb-3">HOTMESS</div>
          <p className="text-[var(--sub)]">Queer engine. Streamed. Scanned. Worn.</p>
        </div>
        <nav>
          <div className="font-semibold mb-2">Information</div>
          <ul className="space-y-2 text-[var(--sub)]">
            <li><Link href="/care">Care</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </nav>
        <div>
          <div className="font-semibold mb-2">Contact</div>
          <ul className="space-y-2 text-[var(--sub)]">
            <li><a href="mailto:hi@hotmessldn.com">hi@hotmessldn.com</a></li>
            <li>London</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)] py-4 text-center text-xs text-[var(--sub)]">© {new Date().getFullYear()} HOTMESSLDN</div>
    </footer>
  );
}