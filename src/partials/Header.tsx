import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menu = [
        { label: "Top Headers", href: "#" },
        { label: "Headers", href: "#" },
        { label: "Plan Cards", href: "#" },
        { label: "About Us", href: "#" },
        { label: "Footers", href: "#" },
    ];

	return (
		<header className="bg-black py-4 px-4 md:px-16 flex flex-row justify-between items-center relative">
			{/* Logo */}
			<a href="/" className="flex flex-row items-center gap-2 md:gap-4 hover:md:-translate-y-2 transition-all duration-300 z-20">
				<img src="/images/Logo.png" alt="" className="w-10 md:w-auto" />
				<div className="flex flex-col">
					<h1 className="text-2xl md:text-3xl font-bold text-primary">Code</h1>
					<h2 className="text-2xl md:text-3xl font-bold text-secondary">Shelf</h2>
				</div>
			</a>

			{/* Desktop Navigation */}
			<nav className="hidden lg:block">
				<ul className="flex flex-row gap-8">
					{menu.map((item) => (
						<li key={item.label}>
							<a href={item.href} className="text-white text-lg font-bold hover:text-primary transition-colors">{item.label}</a>
						</li>
					))}
				</ul>
			</nav>

			{/* Desktop Buttons */}
			<div className="hidden md:flex flex-row gap-4 lg:gap-6">
				<a href="/features" className="flex flex-row items-center px-8 py-2 bg-white rounded-full shadow font-bold text-black text-base focus:outline-none transition-colors duration-150 hover:bg-gray-100">
					<span className="hidden lg:inline">More Features</span>
				</a>
				<a href="/create" className="flex flex-row items-center px-4 lg:px-7 py-2 bg-primary rounded-full shadow font-bold text-white text-base focus:outline-none transition-colors duration-150 hover:bg-cyan-400">
					<span className="hidden lg:inline">Create new project</span>
					<span className="lg:hidden">Create</span>
				</a>
			</div>

			{/* Mobile Menu Button */}
			<button 
				className="md:hidden z-20 text-white p-2"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				aria-label="Toggle menu"
			>
				<Icon icon={isMenuOpen ? "mdi:close" : "mdi:menu"} width="32" height="32" />
			</button>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800 z-10 shadow-lg">
					<nav className="py-4">
						<ul className="flex flex-col">
							{menu.map((item) => (
								<li key={item.label}>
									<a 
										href={item.href} 
										className="text-white text-lg font-bold px-4 py-3 block hover:bg-gray-900 hover:text-primary transition-colors"
										onClick={() => setIsMenuOpen(false)}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex flex-col gap-3 px-4 pb-4 border-t border-gray-800 pt-4">
						<button className="flex flex-row items-center justify-center px-8 py-3 bg-white rounded-full shadow font-bold text-black text-base focus:outline-none transition-colors duration-150 hover:bg-gray-100">
							<span className="mr-2">
								<Icon icon="mdi:magnify" width="22" height="22" />
							</span>
							More Features
						</button>
						<a href="/create" className="flex flex-row items-center justify-center px-7 py-3 bg-primary rounded-full shadow font-bold text-white text-base focus:outline-none transition-colors duration-150 hover:bg-cyan-400">
							Create new project
						</a>
					</div>
				</div>
			)}
		</header>
	);
}