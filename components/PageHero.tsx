import { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  sub: string;
  children: ReactNode;
};

export default function PageHero({ title, sub, children }: PageHeroProps) {
  return (
    <section style={{ position: "relative", minHeight: "60vh", display: "grid", alignContent: "end", padding: "40px 20px", background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,.55) 80%)" }} aria-label="Hero">
      <h1 style={{ color: "#fff", fontFamily: "Oswald, Impact, sans-serif", fontWeight: 800, lineHeight: .96, fontSize: "clamp(28px, 10vw, 72px)", letterSpacing: ".5px", textTransform: "uppercase", marginBottom: 8 }}>{title}</h1>
      <p style={{ color: "rgba(255,255,255,.9)", font: "400 15px/1.45 Manrope, system-ui, sans-serif", maxWidth: "38ch", marginBottom: 16 }}>{sub}</p>
      {children}
    </section>
  );
}
