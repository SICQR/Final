import { getLookbookSlides } from "@/lib/sanity";
import LookbookSlide from "@/components/LookbookSlide";

type LookbookSlideProps = {
  imageUrl: string;
  title: string;
  subtitle: string;
  font: string;
  color: string;
  overlay: boolean;
  video: string;
};

function toLookbookSlide(raw: Record<string, any>): LookbookSlideProps {
  return {
    imageUrl: raw.imageUrl ?? '',
    title: raw.title ?? '',
    subtitle: raw.subtitle ?? '',
    font: raw.font ?? 'font-heading text-6xl md:text-8xl',
    color: raw.color ?? 'text-white',
    overlay: !!raw.overlay,
    video: raw.video ?? '',
  };
}

export default async function LookbookPage() {
  const slides: Array<Record<string, any>> = await getLookbookSlides();
  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory">
        {slides.map((slide: Record<string, any>, i: number) => (
          <LookbookSlide key={i} {...toLookbookSlide(slide)} />
        ))}
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-white font-bold drop-shadow">Scroll →</span>
        <span className="mt-1 text-white text-3xl animate-bounce">→</span>
      </div>
    </main>
  );
}