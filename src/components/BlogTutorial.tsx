"use client";

import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

export default function BlogTutorial() {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
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
	};

	return (
		<section className="max-w-4xl mx-auto px-4 md:px-8 py-16 my-16 bg-[#0d0d0d] rounded-xl">
			<h2 className="text-4xl font-bold text-primary mb-2">Como criar este blog</h2>
			<p className="text-gray-400 mb-12">
				Integre seu site Astro com WordPress usando a REST API. Siga os passos abaixo.
			</p>

			<div className="space-y-8">
				{/* Passo 1 */}
				<div className="bg-[#1d1e22] rounded-xl border-2 border-transparent hover:border-primary/50 transition-colors p-6">
					<div className="flex items-center gap-3 mb-4">
						<span className="bg-primary text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">1</span>
						<h3 className="text-xl font-bold text-white">Crie seu WordPress</h3>
					</div>
					<p className="text-gray-400 text-sm leading-relaxed mb-4">
						Primeiro, configure um WordPress (local ou em produção). Para ter posts de teste rapidamente, baixe e importe o backup:
					</p>
					<div className="bg-[#131315] rounded-lg p-4 border border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<p className="text-primary font-mono text-sm mb-1">blog-teste-local-20260219-*.wpress</p>
							<p className="text-gray-500 text-xs">
								Use o plugin All-in-One WP Migration para importar o arquivo .wpress. Com isso você já terá vários posts de teste prontos.
							</p>
						</div>
						<a
							href="/blog-teste-local-20260219-190210-4lvkxgvdapwa.wpress"
							download
							className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors text-sm shrink-0"
						>
							<Icon icon="mdi:download" className="text-lg" />
							Baixar backup
						</a>
					</div>
				</div>

				{/* Passo 2 */}
				<div className="bg-[#1d1e22] rounded-xl border-2 border-transparent hover:border-primary/50 transition-colors p-6">
					<div className="flex items-center gap-3 mb-4">
						<span className="bg-primary text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">2</span>
						<h3 className="text-xl font-bold text-white">Baixe os arquivos necessários</h3>
					</div>
					<p className="text-gray-400 text-sm leading-relaxed mb-4">
						Baixe os arquivos abaixo e coloque nos respectivos caminhos:
					</p>
					<div className="space-y-3">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#131315] rounded-lg border border-gray-700">
							<div className="flex items-center gap-2">
								<Icon icon="mdi:file-document" className="text-primary flex-shrink-0" />
								<code className="text-primary text-sm">src/components/Blog.tsx</code>
							</div>
							<a
								href="/downloads/Blog.tsx"
								download="Blog.tsx"
								className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors text-sm shrink-0 w-fit"
							>
								<Icon icon="mdi:download" className="text-base" />
								Baixar
							</a>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#131315] rounded-lg border border-gray-700">
							<div className="flex items-center gap-2">
								<Icon icon="mdi:file-document" className="text-primary flex-shrink-0" />
								<code className="text-primary text-sm">src/pages/posts/[slug].astro</code>
							</div>
							<a
								href="/downloads/[slug].astro"
								download="[slug].astro"
								className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors text-sm shrink-0 w-fit"
							>
								<Icon icon="mdi:download" className="text-base" />
								Baixar
							</a>
						</div>
					</div>
					
				</div>

				{/* Passo 3 */}
				<div className="bg-[#1d1e22] rounded-xl border-2 border-transparent hover:border-primary/50 transition-colors p-6">
					<div className="flex items-center gap-3 mb-4">
						<span className="bg-primary text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">3</span>
						<h3 className="text-xl font-bold text-white">Crie a página blog.astro</h3>
					</div>
					<p className="text-gray-400 text-sm leading-relaxed mb-4">
						Crie o arquivo <code className="text-primary">src/pages/blog.astro</code>, importe o componente Blog e defina a URL do seu WordPress:
					</p>
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 p-3 bg-[#131315] rounded-lg border border-gray-700">
						<div className="flex items-center gap-2">
							<Icon icon="mdi:file-document" className="text-primary flex-shrink-0" />
							<code className="text-primary text-sm">src/pages/blog.astro</code>
						</div>
						<a
							href="/downloads/blog.astro"
							download="blog.astro"
							className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors text-sm shrink-0 w-fit"
						>
							<Icon icon="mdi:download" className="text-base" />
							Baixar
						</a>
					</div>
					<div className="relative bg-[#131315] rounded-lg p-4 border border-gray-700 overflow-x-auto">
						<button
							className="absolute top-3 right-3 text-primary hover:text-white transition-colors z-10"
							title="Copiar código"
							onClick={() => copyToClipboard(`---
import Layout from "@/layouts/Layout.astro";
import Blog from "@/components/Blog";

export const prerender = false;

const BLOG_API_URL = "https://seu-wordpress.com"; // Altere para a URL do seu WordPress
---

<Layout>
  <Blog client:load blogApiUrl={BLOG_API_URL} />
</Layout>`)}
						>
							<Icon icon="solar:copy-outline" className="text-xl" />
						</button>
						<pre className="text-sm text-white pr-10">
{`---
import Layout from "@/layouts/Layout.astro";
import Blog from "@/components/Blog";

export const prerender = false;

const BLOG_API_URL = "https://seu-wordpress.com"; // Altere para a URL do seu WordPress
---

<Layout>
  <Blog client:load blogApiUrl={BLOG_API_URL} />
</Layout>`}
						</pre>
					</div>
					<p className="text-gray-500 text-xs mt-2">
						Substitua <code className="text-primary">https://seu-wordpress.com</code> pela URL do seu WordPress (ex: <code className="text-primary">http://blog-teste.local</code>).
					</p>
				</div>

				{/* Passo 4 */}
				<div className="bg-[#1d1e22] rounded-xl border-2 border-transparent hover:border-primary/50 transition-colors p-6">
					<div className="flex items-center gap-3 mb-4">
						<span className="bg-primary text-black font-bold text-lg rounded-full w-10 h-10 flex items-center justify-center">4</span>
						<h3 className="text-xl font-bold text-white">Configure a URL no arquivo [slug].astro</h3>
					</div>
					<p className="text-gray-400 text-sm leading-relaxed mb-4">
						Abra <code className="text-primary">src/pages/posts/[slug].astro</code> e altere a constante <code className="text-primary">BLOG_API_URL</code> para a URL do seu WordPress:
					</p>
					<div className="relative bg-[#131315] rounded-lg p-4 border border-gray-700 overflow-x-auto">
						<button
							className="absolute top-3 right-3 text-primary hover:text-white transition-colors z-10"
							title="Copiar"
							onClick={() => copyToClipboard('const BLOG_API_URL = "https://seu-wordpress.com";')}
						>
							<Icon icon="solar:copy-outline" className="text-xl" />
						</button>
						<code className="text-primary text-sm">
							const BLOG_API_URL = &quot;https://seu-wordpress.com&quot;;
						</code>
					</div>
				</div>

				{/* Pronto */}
				<div className="bg-primary/10 rounded-xl border-2 border-primary/30 p-6 text-center">
					<Icon icon="mdi:check-circle" className="text-4xl text-primary mx-auto mb-2" />
					<h3 className="text-xl font-bold text-primary mb-1">Pronto!</h3>
					<p className="text-gray-400 text-sm">
						Seu blog está funcionando. Acesse <code className="text-primary">/blog</code> para ver os posts.
					</p>
				</div>
			</div>
		</section>
	);
}
