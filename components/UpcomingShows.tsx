import { resolvePublicImage } from '@/lib/imageFallback'
const shows = [
	{
		date: "2025-09-05",
		time: "22:00",
		title: "HOTMESS Friday Live",
		host: "Nic Denton",
		desc: "Kick-off the weekend with Nic's legendary party set, exclusive guests and HOTMESS club vibes.",
		image: "/images/shows/friday-live.jpg",
	},
	{
		date: "2025-09-07",
		time: "18:00",
		title: "Sunday Chill",
		host: "Luna",
		desc: "Luna blends deep house, nu-disco and dreamy grooves for your Sunday wind-down.",
		image: "/images/shows/sunday-chill.jpg",
	},
	{
		date: "2025-09-09",
		time: "20:00",
		title: "Jax Presents: London Energy",
		host: "Jax",
		desc: "Jax brings underground London club tracks and interviews with local legends.",
		image: "/images/shows/london-energy.jpg",
	},
];

export default function UpcomingShows() {
	return (
		<section
			className="w-full max-w-3xl mx-auto my-12 px-4"
			style={{
				opacity: 1,
				transform: "translateY(0)",
				transition: "opacity 0.3s, transform 0.3s",
			}}
		>
			<h2 className="font-heading text-3xl text-hotpink mb-6">
				Upcoming Shows
			</h2>
			<div className="grid gap-8 md:grid-cols-3">
				{shows.map((show) => (
					<div
						key={show.title}
						className="bg-black/80 rounded-xl border border-hotpink p-5 flex flex-col items-center"
					>
										<img
											src={resolvePublicImage(show.image)}
											alt={show.title}
											className="w-24 h-24 object-cover rounded-lg mb-3 border-2 border-hotpink"
										/>
						<div className="font-bold text-hotpink mb-1">{show.title}</div>
						<div className="text-xs mb-2">
							<span className="font-semibold">{show.date}</span> &bull;{" "}
							<span>{show.time}</span>
						</div>
						<div className="text-xs mb-1">
							Host:{" "}
							<span className="font-semibold">{show.host}</span>
						</div>
						<p className="text-sm opacity-80 mb-1 text-center">
							{show.desc}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}