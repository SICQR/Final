import RadioHero from "@/components/RadioHero";
import UpcomingShows from "@/components/UpcomingShows";
import PodcastsComingSoon from "@/components/PodcastsComingSoon";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center py-8 min-h-[60vh] text-center">
      <RadioHero />
      <UpcomingShows />
      <PodcastsComingSoon />
    </section>
  );
}