type Item = { label: string; href?: string };

export default function DropdownMenu({ label, href, items }:{ label?: string; href?: string; items?: Item[] }){
	return (
		<div className="relative inline-block">
			<a href={href} className="hover:underline">{label}</a>
			{items && items.length > 0 && (
				<div className="absolute left-0 mt-2 bg-white text-black shadow-lg rounded">
					{items.map((it) => (
						<a key={it.label} href={it.href} className="block px-4 py-2 hover:bg-gray-100">{it.label}</a>
					))}
				</div>
			)}
		</div>
	);
}
