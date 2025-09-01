import RadioPlayer from "@/components/RadioPlayer";

export default function RadioPage() {
  return (
    <section className="px-6 py-16 max-w-3xl mx-auto">
      <h2 className="font-heading text-4xl mb-6 text-hotpink">HOTMESS Radio</h2>
      <RadioPlayer streamUrl="https://your-demo-stream.com/stream.mp3" />
      <p className="mt-6 opacity-70">Tune in for exclusive mixes, fashion show audio, and more.</p>
    </section>
  );
}