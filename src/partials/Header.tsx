import { Icon } from "@iconify/react";

export default function Header() {
    const menu = [
        { label: "Top Headers", href: "#" },
        { label: "Headers", href: "#" },
        { label: "Plan Cards", href: "#" },
        { label: "Talk Us", href: "#" },
        { label: "About Us", href: "#" },
        { label: "Footers", href: "#" },
    ];

	return (
		<header className="bg-black py-4 md:px-32 flex flex-row justify-between items-center">
			<a href="/" className="flex flex-row items-center gap-4 hover:-translate-y-2 transition-all duration-300">
				<img src="/images/Logo.png" alt="" />
				<div className="flex flex-col">
					<h1 className=" text-3xl font-bold text-primary">Code</h1>
					<h2 className="text-3xl font-bold text-secondary">Shelf</h2>
				</div>
			</a>

			<nav>
				<ul className="flex flex-row gap-8">
					{menu.map((item) => (
						<li key={item.label}>
							<a href={item.href} className="text-white text-lg font-bold">{item.label}</a>
						</li>
					))}
				</ul>
			</nav>

			<div className="flex flex-row gap-6">
				<button className="flex flex-row items-center px-16 py-2 bg-white rounded-full shadow font-bold text-black text-base focus:outline-none transition-colors duration-150 hover:bg-gray-100">
					<span className="mr-2">
						<Icon icon="mdi:magnify" width="22" height="22" />
					</span>
					Search
				</button>
				<a href="/create" className="flex flex-row items-center px-7 py-2 bg-primary rounded-full shadow font-bold text-white text-base focus:outline-none transition-colors duration-150 hover:bg-cyan-400">
					Create new project
				</a>
			</div>
		</header>
	);
}