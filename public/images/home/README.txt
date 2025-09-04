HOTMESS image bundle (public/images/home)
=================================================

Drop the `public/` folder at your project root so files end up as:
  ./public/images/home/<section>/<slug>_<width>w.jpg

Sections: hero, products, editorial, art

Usage (Next.js):
----------------
import Image from 'next/image';

<Image
  src="/images/home/hero/hero_always-too-much_1920w.jpg"
  alt="Crowned man under headline"
  width=1920
  height={see_manifest_height}
  priority
  className="w-full h-auto object-cover"
/>

See public/images/home/manifest.json for exact sizes and alt texts.
