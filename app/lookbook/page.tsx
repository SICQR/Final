import { getLookbookSlides } from "@/lib/sanity";
import LookbookSlide from "@/components/LookbookSlide";

export default async function LookbookPage() {
  const slides = await getLookbookSlides();
  return (
    <main className="w-screen h-screen">
      <div className="w-full h-full flex overflow-x-auto snap-x snap-mandatory">
        {slides.map((slide, i) => (
          <LookbookSlide key={i} {...slide} />
        ))}
      </div>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="text-white font-bold drop-shadow">Scroll →</span>
        <span className="mt-1 text-white text-3xl animate-bounce">→</span>
      </div>
    </main>
  );
}