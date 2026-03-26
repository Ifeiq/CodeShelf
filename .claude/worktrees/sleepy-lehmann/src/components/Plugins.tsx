"use client";

import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useState } from "react";

interface WordPressPlugin {
	name: string;
	slug: string;
	version: string;
	author: string;
	rating: number;
	num_ratings: number;
	active_installs: number;
	download_link: string;
	last_updated: string;
	short_description?: string;
	icons?: { "1x"?: string; "2x"?: string; svg?: string };
}

interface QueryResult {
	plugins: WordPressPlugin[];
	info: { page: number; pages: number; results: number };
}

export default function Plugins() {
	const [searchTerm, setSearchTerm] = useState("");
	const [author, setAuthor] = useState("");
	const [tag, setTag] = useState("");
	const [plugins, setPlugins] = useState<WordPressPlugin[]>([]);
	const [info, setInfo] = useState<QueryResult["info"] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const perPage = 4;

	const fetchPlugins = async (pageNum: number = 1) => {
		const search = searchTerm.trim();
		if (!search) {
			toast.error("Digite um termo para buscar", {
				duration: 2000,
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
		setError(null);

		try {
			const params = new URLSearchParams({
				action: "query_plugins",
				"request[search]": search,
				"request[page]": String(pageNum),
				"request[per_page]": String(perPage),
			});
			if (author.trim()) params.set("request[author]", author.trim());
			if (tag.trim()) params.set("request[tag]", tag.trim());

			const response = await fetch(
				`https://api.wordpress.org/plugins/info/1.2/?${params.toString()}`
			);
			const data = await response.json();

			if (data.error) {
				setError(data.error);
				setPlugins([]);
				setInfo(null);
				toast.error(data.error, {
					duration: 2000,
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

			const pluginsList = (data.plugins || []).map((p: Record<string, unknown>) => ({
				name: String(p.name || "").replace(/&#8217;/g, "'").replace(/&amp;/g, "&"),
				slug: (p.slug as string) || "",
				version: (p.version as string) || "",
				author: typeof p.author === "string" ? p.author.replace(/<[^>]*>/g, "").trim() : "Unknown",
				rating: (p.rating as number) || 0,
				num_ratings: (p.num_ratings as number) || 0,
				active_installs: (p.active_installs as number) || 0,
				download_link: (p.download_link as string) || "",
				last_updated: (p.last_updated as string) || "",
				short_description: p.short_description as string | undefined,
				icons: p.icons as { "1x"?: string; "2x"?: string; svg?: string } | undefined,
			}));

			setPlugins(pluginsList);
			setInfo(data.info || { page: 1, pages: 1, results: 0 });
			setPage(pageNum);

			toast.success(`${pluginsList.length} plugin(s) encontrado(s)`, {
				duration: 2000,
				position: "top-right",
				style: {
					background: "#1d1e22",
					color: "#fff",
					border: "1px solid #333",
					borderRadius: "8px",
				},
			});
		} catch {
			setError("Erro ao buscar plugins. Tente novamente.");
			setPlugins([]);
			setInfo(null);
			toast.error("Erro ao buscar plugins", {
				duration: 2000,
				position: "top-right",
				style: {
					background: "#1d1e22",
					color: "#fff",
					border: "1px solid #333",
					borderRadius: "8px",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = (pluginData: WordPressPlugin) => {
		if (!pluginData.download_link) return;

		const link = document.createElement("a");
		link.href = pluginData.download_link;
		link.download = `${pluginData.slug}.zip`;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		toast.success(`${pluginData.slug}.zip sendo baixado!`, {
			duration: 2000,
			position: "top-right",
			style: {
				background: "#1d1e22",
				color: "#fff",
				border: "1px solid #333",
				borderRadius: "8px",
			},
		});
	};

	const stripHtml = (html?: string) =>
		html ? html.replace(/<[^>]*>/g, "").trim() : "";

	return (
		<section className="bg-[#0d0d0d] py-16 px-8 md:px-32 gap-32 flex flex-col">
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-col gap-2 items-start justify-start">
					<h1 className="text-6xl font-bold text-primary">Plugins</h1>
					<h2 className="text-xl font-bold text-secondary max-w-md">
						Buscar plugins do WordPress.org
					</h2>
				</div>
			</div>

			<div className="flex flex-col gap-6 w-full mx-auto relative">
				<div className="flex flex-col gap-3 w-full max-w-2xl mx-auto">
					<div className="flex flex-col sm:flex-row gap-3">
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && fetchPlugins(1)}
							placeholder="Termo de busca (ex: backup, elementor, seo)"
							className="flex-1 px-4 py-3 bg-[#1d1e22] border-2 border-[#333] rounded-xl text-white placeholder:text-gray-500 focus:border-primary focus:outline-none transition-colors"
						/>
						<button
							onClick={() => fetchPlugins(1)}
							disabled={loading}
							className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 shrink-0"
						>
							{loading ? (
								<>
									<Icon icon="svg-spinners:90-ring-with-bg" className="text-xl" />
									Buscando...
								</>
							) : (
								<>
									<Icon icon="mdi:magnify" className="text-xl" />
									Buscar
								</>
							)}
						</button>
					</div>
				</div>

				{error && (
					<div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 max-w-2xl mx-auto w-full">
						{error}
					</div>
				)}

				{info && info.results > 0 && (
					<p className="text-gray-500 text-sm text-center">
						{info.results.toLocaleString()} resultado(s) • Página {info.page} de {info.pages}
					</p>
				)}

				<div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto w-full">
					{plugins.map((plugin) => (
						<div
							key={plugin.slug}
							onClick={() => handleDownload(plugin)}
							className="flex gap-4 p-6 bg-[#1d1e22] rounded-xl cursor-pointer hover:bg-[#2a2b30] hover:scale-[1.02] transition-all duration-300 border-2 border-transparent hover:border-primary"
						>
							<div className="shrink-0">
								{plugin.icons?.svg || plugin.icons?.["1x"] || plugin.icons?.["2x"] ? (
									<img
										src={plugin.icons.svg || plugin.icons["2x"] || plugin.icons["1x"]}
										alt=""
										className="w-16 h-16 rounded-lg object-contain bg-[#0d0d0d]"
									/>
								) : (
									<Icon
										icon="simple-icons:wordpress"
										className="text-5xl text-[#21759b]"
									/>
								)}
							</div>
							<div className="flex flex-col gap-1 min-w-0 flex-1">
								<h3 className="text-lg font-bold text-white truncate">{plugin.name}</h3>
								<p className="text-secondary text-xs">v{plugin.version} • {plugin.author}</p>
								{plugin.short_description && (
									<p className="text-gray-400 text-sm mt-1 line-clamp-2">
										{stripHtml(plugin.short_description)}
									</p>
								)}
								<div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
									<span>⭐ {plugin.rating}%</span>
									<span>📥 {plugin.active_installs >= 1e6 ? `${(plugin.active_installs / 1e6).toFixed(1)}M+` : plugin.active_installs >= 1e3 ? `${(plugin.active_installs / 1e3).toFixed(0)}K+` : plugin.active_installs}+</span>
								</div>
								<div className="flex items-center gap-2 text-primary text-xs font-medium mt-2">
									<Icon icon="mdi:download" />
									Clique para baixar o plugin
								</div>
							</div>
						</div>
					))}
				</div>

				{info && info.pages > 1 && (
					<div className="flex items-center justify-center gap-4 w-full">
						<button
							onClick={() => fetchPlugins(page - 1)}
							disabled={page <= 1 || loading}
							className="px-4 py-2 bg-[#1d1e22] border border-[#333] rounded-lg text-white disabled:opacity-50 hover:border-primary/50 transition-colors"
						>
							← Anterior
						</button>
						<button
							onClick={() => fetchPlugins(page + 1)}
							disabled={page >= info.pages || loading}
							className="px-4 py-2 bg-[#1d1e22] border border-[#333] rounded-lg text-white disabled:opacity-50 hover:border-primary/50 transition-colors"
						>
							Próxima →
						</button>
					</div>
				)}

				{!loading && plugins.length === 0 && searchTerm.trim() && !error && (
					<p className="text-gray-500 text-center py-8">
						Nenhum plugin encontrado. Tente outro termo.
					</p>
				)}
			</div>
		</section>
	);
}
