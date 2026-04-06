"use client";

import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useState, useCallback, useEffect } from "react";

const ICONIFY_API = "https://api.iconify.design/search";
const STORAGE_FAVORITES = "icons-favorites";
const STORAGE_RECENT = "icons-recent";
const MAX_RECENT = 5;

function loadFromStorage<T>(key: string, defaultValue: T): T {
	if (typeof window === "undefined") return defaultValue;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return defaultValue;
		return JSON.parse(raw) as T;
	} catch {
		return defaultValue;
	}
}

function saveToStorage(key: string, value: unknown) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// ignore
	}
}

export default function Icons() {
	const [searchTerm, setSearchTerm] = useState("");
	const [icons, setIcons] = useState<string[]>([]);
	const [visibleCount, setVisibleCount] = useState(20);
	const [loading, setLoading] = useState(false);
	const [searched, setSearched] = useState(false);
	const [favorites, setFavorites] = useState<string[]>([]);
	const [recent, setRecent] = useState<string[]>([]);

	useEffect(() => {
		setFavorites(loadFromStorage(STORAGE_FAVORITES, []));
		setRecent(loadFromStorage(STORAGE_RECENT, []));
	}, []);

	const searchIcons = useCallback(async () => {
		if (!searchTerm.trim()) {
			toast.error("Digite um termo para buscar", {
				position: "top-right",
				style: {
					background: "#1d1e22",
					color: "#fff",
					border: "1px solid #333",
					borderRadius: "8px",
				},
			});
			return;
		}

		setLoading(true);
		setSearched(true);
		try {
			const res = await fetch(
				`${ICONIFY_API}?query=${encodeURIComponent(searchTerm.trim())}&limit=500`
			);
			const data = await res.json();
			setIcons(data.icons ?? []);
			setVisibleCount(20);
		} catch {
			toast.error("Erro ao buscar ícones", {
				position: "top-right",
				style: {
					background: "#1d1e22",
					color: "#fff",
					border: "1px solid #333",
					borderRadius: "8px",
				},
			});
			setIcons([]);
			setVisibleCount(20);
		} finally {
			setLoading(false);
		}
	}, [searchTerm]);

	const toggleFavorite = useCallback((iconId: string) => {
		setFavorites((prev) => {
			const next = prev.includes(iconId) ? prev.filter((id) => id !== iconId) : [...prev, iconId];
			saveToStorage(STORAGE_FAVORITES, next);
			return next;
		});
	}, []);

	const addToRecent = useCallback((iconId: string) => {
		setRecent((prev) => {
			const filtered = prev.filter((id) => id !== iconId);
			const next = [iconId, ...filtered].slice(0, MAX_RECENT);
			saveToStorage(STORAGE_RECENT, next);
			return next;
		});
	}, []);

	const copyToClipboard = useCallback((iconId: string) => {
		navigator.clipboard.writeText(iconId);
		addToRecent(iconId);
		toast.success("Copiado!", {
			duration: 2000,
			position: "top-right",
			style: {
				background: "#1d1e22",
				color: "#fff",
				border: "1px solid #333",
				borderRadius: "8px",
			},
		});
	}, [addToRecent]);

	const IconCard = ({ iconId, showFavorite = false, className = "" }: { iconId: string; showFavorite?: boolean; className?: string }) => (
		<div className={`relative flex flex-col items-center gap-2 p-4 bg-[#1d1e22] rounded-xl border-2 border-transparent hover:border-primary/50 transition-colors group ${className}`}>
			{showFavorite && (
				<button
					onClick={(e) => {
						e.stopPropagation();
						toggleFavorite(iconId);
					}}
					aria-label={favorites.includes(iconId) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
					className="absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-white/10 transition-colors"
				>
					<Icon
						icon={favorites.includes(iconId) ? "mdi:star" : "mdi:star-outline"}
						className={`text-xl ${favorites.includes(iconId) ? "text-primary" : "text-gray-500"}`}
					/>
				</button>
			)}
			<button
				onClick={() => copyToClipboard(iconId)}
				className="flex flex-col items-center gap-2 w-full"
				title={`Clique para copiar: ${iconId}`}
			>
				<Icon icon={iconId} className="text-4xl text-primary" />
				<span className="text-xs text-gray-400 font-mono truncate w-full text-center group-hover:text-primary">
					{iconId}
				</span>
			</button>
		</div>
	);

	return (
		<section className="bg-[#0d0d0d] py-16 px-8 md:px-32 flex flex-col gap-12">
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-col gap-2 items-start justify-start">
					<h1 className="text-6xl font-bold text-primary">Icons</h1>
					<h2 className="text-xl font-bold text-secondary max-w-md">
						Buscar ícones no Iconify
					</h2>
				</div>
			</div>

			{(favorites.length > 0 || recent.length > 0) && (
				<div className="flex flex-col gap-8">
					{favorites.length > 0 && (
						<div>
							<h3 className="text-xl font-bold text-white mb-4">Ícones preferidos</h3>
							<div className="flex flex-wrap gap-3">
								{favorites.map((iconId) => (
									<IconCard key={iconId} iconId={iconId} showFavorite className="w-24" />
								))}
							</div>
						</div>
					)}
					{recent.length > 0 && (
						<div>
							<h3 className="text-xl font-bold text-white mb-4">Ícones recentes</h3>
							<div className="flex flex-wrap gap-3">
								{recent.map((iconId) => (
									<IconCard key={iconId} iconId={iconId} showFavorite className="w-24" />
								))}
							</div>
						</div>
					)}
				</div>
			)}

			<div className="flex flex-col sm:flex-row gap-4">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && searchIcons()}
					placeholder="Ex: home, user, search..."
					className="flex-1 px-4 py-3 bg-[#1d1e22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
				/>
				<button
					onClick={searchIcons}
					disabled={loading}
					className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{loading ? (
						<Icon icon="mdi:loading" className="text-xl animate-spin" />
					) : (
						<Icon icon="mdi:magnify" className="text-xl" />
					)}
					{loading ? "Buscando..." : "Buscar"}
				</button>
			</div>

			{searched && (
				<div className="space-y-4">
					<h3 className="text-xl font-bold text-white">
						{loading ? "Carregando..." : icons.length > 0 ? `Resultados (${icons.length})` : "Nenhum ícone encontrado"}
					</h3>
					{!loading && icons.length > 0 && (
						<div className="space-y-4">
							<div className="grid grid-cols-5 gap-4">
								{icons.slice(0, visibleCount).map((iconId) => (
									<IconCard key={iconId} iconId={iconId} showFavorite className="w-full" />
								))}
							</div>
							{visibleCount < icons.length && (
								<div className="flex justify-center">
									<button
										onClick={() => setVisibleCount((prev) => Math.min(prev + 10, icons.length))}
										className="inline-flex items-center gap-2 px-6 py-3 bg-[#1d1e22] border border-gray-700 text-white font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
									>
										Carregar mais
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</section>
	);
}
