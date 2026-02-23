"use client";

import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";

const PAGES = [
	{ label: "Início", href: "/" },
	{ label: "Componentes", href: "/components" },
	{ label: "Features", href: "/features" },
	{ label: "Tutoriais", href: "/tutorials" },
	{ label: "Ícones", href: "/icons" },
	{ label: "Plugins", href: "/plugins" },
	{ label: "Blog", href: "/blog" },
	{ label: "Todo", href: "/todo" },
	{ label: "Criar novo projeto", href: "/create" },
];

type SearchProps = {
	variant?: "desktop" | "mobile";
	onNavigate?: () => void;
};

export default function Search({ variant = "desktop", onNavigate }: SearchProps) {
	const [isOpen, setIsOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener("click", handleClickOutside);
		}
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isOpen]);

	const buttonClass =
		variant === "mobile"
			? "flex flex-row items-center justify-center w-full px-8 py-3 bg-white rounded-full shadow font-bold text-black text-base focus:outline-none transition-colors duration-150 hover:bg-gray-100"
			: "flex flex-row items-center gap-2 px-8 py-2 bg-white rounded-full shadow font-bold text-black text-base focus:outline-none transition-colors duration-150 hover:bg-gray-100";

	return (
		<div className="relative" ref={panelRef}>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
				className={buttonClass}
				aria-label="Buscar páginas"
				aria-expanded={isOpen}
			>
				<Icon icon="mdi:magnify" width="22" height="22" className="text-black" />
				{variant === "desktop" && <span className="hidden lg:inline">Buscar</span>}
				{variant === "mobile" && <span className="ml-2">Buscar</span>}
			</button>

			{isOpen && (
				<div className="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-[#1d1e22] border border-gray-700 rounded-xl shadow-xl z-50 py-2">
					<p className="px-4 py-2 text-gray-500 text-xs font-medium uppercase tracking-wider">
						Páginas
					</p>
					<ul className="flex flex-col">
						{PAGES.map((page) => (
							<li key={page.href}>
								<a
									href={page.href}
									onClick={() => {
										onNavigate?.();
										setIsOpen(false);
									}}
									className="w-full flex items-center gap-2 px-4 py-3 text-left text-white hover:bg-gray-800 hover:text-primary transition-colors text-sm"
								>
									<Icon icon="mdi:page-next-outline" className="text-lg text-gray-500 flex-shrink-0" />
									{page.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
