import { Icon } from "@iconify/react";

const navLinks = [
	{ label: "Componentes", href: "/components", icon: "mdi:view-grid" },
	{ label: "Features", href: "/features", icon: "mdi:star" },
	{ label: "Tutoriais", href: "/tutorials", icon: "mdi:book-open-page-variant" },
	{ label: "Plugins", href: "/plugins", icon: "mdi:puzzle" },
	{ label: "Blog", href: "/blog", icon: "mdi:post" },
];

const resourceLinks = [
	{ label: "Criar Projeto", href: "/create", icon: "mdi:plus-circle" },
];

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-[#0a0a0b] border-t border-gray-800/50">
			{/* Main footer content */}
			<div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
					{/* Brand */}
					<div className="lg:col-span-1">
						<a href="/" className="flex flex-row items-center gap-2 hover:opacity-90 transition-opacity">
							<img src="/images/Logo.png" alt="" className="w-10" />
							<div className="flex flex-col">
								<span className="text-xl font-bold text-primary">Code</span>
								<span className="text-xl font-bold text-secondary">Shelf</span>
							</div>
						</a>
						<p className="mt-4 text-gray-500 text-sm leading-relaxed max-w-xs">
							Plataforma de código aberto para desenvolvimento de aplicativos e sites. Componentes, features e plugins prontos para usar.
						</p>
					</div>

					{/* Explore */}
					<div>
						<h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Explorar</h3>
						<ul className="space-y-3">
							{navLinks.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
									>
										<Icon icon={item.icon} className="text-lg opacity-70" />
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Recursos */}
					<div>
						<h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Recursos</h3>
						<ul className="space-y-3">
							{resourceLinks.map((item) => (
								<li key={item.label}>
									<a
										href={item.href}
										className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
									>
										<Icon icon={item.icon} className="text-lg opacity-70" />
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* CTA */}
					<div>
						<h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Comece agora</h3>
						<p className="text-gray-500 text-sm mb-4">
							Crie seu projeto personalizado com nossos componentes e templates.
						</p>
						<a
							href="/create"
							className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-full hover:bg-cyan-400 transition-colors text-sm"
						>
							<Icon icon="mdi:rocket-launch" className="text-lg" />
							Criar novo projeto
						</a>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-gray-800/50">
				<div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-gray-600 text-sm">
							© {currentYear} CodeShelf. Feito com{" "}
							<span className="text-primary">♥</span> para desenvolvedores
						</p>
						<div className="flex items-center gap-6">
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-primary transition-colors"
								aria-label="GitHub"
							>
								<Icon icon="mdi:github" className="text-2xl" />
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-primary transition-colors"
								aria-label="Twitter"
							>
								<Icon icon="mdi:twitter" className="text-2xl" />
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-primary transition-colors"
								aria-label="Discord"
							>
								<Icon icon="mdi:discord" className="text-2xl" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
