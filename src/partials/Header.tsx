import { Icon } from "@iconify/react";
import { useState } from "react";
import Search from "@/components/Search";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	async function handleLogout() {
		if (isLoggingOut) return;
		setIsLoggingOut(true);
		try {
			await fetch("/api/logout", { method: "POST", credentials: "include" });
		} finally {
			window.location.href = "/login";
		}
	}

    const menu = [
        { label: "Componentes", href: "/components" },
        { label: "shadcn/ui", href: "/shadcn" },
        { label: "Features", href: "/features" },
        { label: "Tutoriais", href: "/tutorials" },
        { label: "Ícones", href: "/icons" },
        { label: "Blog", href: "/blog" },
    ];

	return (
		<header className="bg-black py-6 px-4 md:px-16 flex flex-row justify-between items-center relative">
			{/* Logo */}
			<a href="/" className="flex flex-row w-30 items-center gap-2 md:gap-4 hover:md:-translate-y-2 transition-all duration-300 z-20">
				<img src="/images/Logo.png" alt="" className="w-4 md:w-full" />
				
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
			<div className="hidden md:flex flex-row gap-4 lg:gap-6 items-center">
				<Search variant="desktop" />
				<a href="/create" className="flex flex-row items-center px-4 lg:px-12 py-2 bg-primary rounded-full shadow font-bold text-black text-base focus:outline-none transition-colors duration-150 hover:bg-cyan-400">
					<span className="hidden lg:inline">Criar novo projeto</span>
					<span className="lg:hidden">Criar</span>
				</a>

				<button
					type="button"
					onClick={handleLogout}
					disabled={isLoggingOut}
					className="text-white/90 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 disabled:opacity-60"
					aria-label="Sair"
					title="Sair"
				>
					<Icon icon="mdi:logout" width="22" height="22" />
				</button>
			</div>

			{/* Mobile Menu Button */}
			<button 
				className="md:hidden z-20 text-white p-2"
				onClick={() => setIsMenuOpen(!isMenuOpen)}
				aria-label="Abrir ou fechar menu"
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
						<Search variant="mobile" onNavigate={() => setIsMenuOpen(false)} />
						<a href="/create" className="flex flex-row items-center justify-center px-7 py-3 bg-primary rounded-full shadow font-bold text-black text-base focus:outline-none transition-colors duration-150 hover:bg-cyan-400">
							Criar novo projeto
						</a>
						<button
							type="button"
							onClick={() => {
								setIsMenuOpen(false);
								void handleLogout();
							}}
							disabled={isLoggingOut}
							className="flex flex-row items-center justify-center gap-2 px-7 py-3 bg-white/10 rounded-full shadow font-bold text-white text-base focus:outline-none transition-colors duration-150 hover:bg-white/15 disabled:opacity-60"
							aria-label="Sair"
						>
							<Icon icon="mdi:logout" width="22" height="22" />
							Sair
						</button>	
					</div>
				</div>
			)}
		</header>
	);
}