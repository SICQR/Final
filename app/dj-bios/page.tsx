import { resolvePublicImage } from '@/lib/imageFallback'

const DJs = [
	{
		name: "Nic Denton",
		image: "/images/nic-denton.jpg",
		bio: "After 6 years at Gaydio, Nic brings his bold style and legendary energy to HOTMESS. Known for high-energy sets and boundary-pushing selections.",
		socials: [{ platform: "Instagram", url: "https://instagram.com/nicdenton" }],
	},
	{
		name: "Luna",
		image: "/images/dj-luna.jpg",
		bio: "Luna’s eclectic taste and flawless mixing fuse underground with mainstream. Expect deep house, nu-disco, and surprises.",
		socials: [{ platform: "Instagram", url: "https://instagram.com/djluna" }],
	},
	{
		name: "Jax",
		image: "/images/dj-jax.jpg",
		bio: "Jax brings London club vibes worldwide—genre-bending sets, crowd energy, and exclusive bangers.",
		socials: [{ platform: "Instagram", url: "https://instagram.com/dj_jax" }],
	},
];

export default function DjBiosPage() {
	return (
		<section>
			<div className="px-6 py-16 max-w-4xl mx-auto">
				<h1 className="font-heading text-4xl mb-8 text-hotpink text-center">
					Meet the HOTMESS DJs
				</h1>
				<div className="grid gap-8 md:grid-cols-3">
					{DJs.map((dj) => (
						<div
							key={dj.name}
							style={{
								opacity: 1,
								transform: "translateY(0)",
								transition: "opacity 0.3s, transform 0.3s",
							}}
						>
													<div className="bg-black/80 rounded-xl border border-hotpink drop-shadow-xl p-6 flex flex-col items-center">
													<img
														src={resolvePublicImage(dj.image)}
														alt={dj.name}
														className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-hotpink"
													/>
								<h2 className="font-heading text-2xl text-hotpink mb-2">
									{dj.name}
								</h2>
								<p className="text-sm opacity-80 mb-2 text-center">
									{dj.bio}
								</p>
								<div className="flex gap-2">
									{dj.socials.map((s) => (
										<a
											key={s.platform}
											href={s.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-hotpink hover:text-hung underline text-xs"
										>
											{s.platform}
										</a>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}