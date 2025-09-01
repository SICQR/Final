import { motion } from "framer-motion";

const podcasts = [
  {
    title: "HOTMESS Talks",
    desc: "Exclusive interviews with designers, DJs, and scene-makers behind the HOTMESS universe.",
    image: "/images/podcasts/hotmess-talks.jpg"
  },
  {
    title: "Fashion & Music Weekly",
    desc: "Roundtable with Nic Denton, Luna, and Jax. Club news, new tracks, and style tips.",
    image: "/images/podcasts/fashion-music-weekly.jpg"
  },
  {
    title: "Queer Culture Now",
    desc: "Luna invites artists and activists for open, raw, and playful conversations.",
    image: "/images/podcasts/queer-culture-now.jpg"
  }
];

export default function PodcastsComingSoon() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto my-12 px-4"
    >
      <h2 className="font-heading text-3xl text-hung mb-6">Podcasts Coming Soon</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {podcasts.map((pod) => (
          <div key={pod.title} className="bg-black/80 rounded-xl border border-hung p-5 flex flex-col items-center">
            <img src={pod.image} alt={pod.title} className="w-24 h-24 object-cover rounded-lg mb-3 border-2 border-hung" />
            <div className="font-bold text-hung mb-1">{pod.title}</div>
            <p className="text-sm opacity-80 mb-1 text-center">{pod.desc}</p>
            <div className="text-xs text-hung">Launching Autumn 2025</div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}