import { resolvePublicImage } from '@/lib/imageFallback'

export default function MemberTease() {
  return (
    <picture>
      {/* Swap to Sanity image when wired */}
      <source media="(min-width:900px)" srcSet={resolvePublicImage('/images/members-hero-wide.jpg')} />
      <img
        src={resolvePublicImage('/images/members-hero-vertical.jpg')}
        alt="Blurred editorial portrait with 'MEMBERS ONLY' overlay"
        style={{ width: "100%", display: "block", filter: "grayscale(10%)" }}
      />
    </picture>
  );
}
