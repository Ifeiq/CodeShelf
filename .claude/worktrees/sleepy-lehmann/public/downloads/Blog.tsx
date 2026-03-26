"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const BLOG_API_URL = "http://blog-teste.local";
const PER_PAGE = 3;

interface Post {
	id: number;
	slug: string;
	date: string;
	title: { rendered: string };
	content: { rendered: string };
	featured_media: number;
	imageUrl?: string | null;
}

function formatDate(dateStr: string) {
	const date = new Date(dateStr);
	const meses = [
		"janeiro", "fevereiro", "março", "abril", "maio", "junho",
		"julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
	];
	return `${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
}

function stripHtml(html: string, maxLength = 150) {
	return html
		.slice(0, maxLength)
		.replace(/<\/?[^>]+(>|$)/g, "")
		.replace(/&nbsp;/g, " ")
		.trim() + "...";
}

async function getImageUrl(apiUrl: string, featuredMediaId: number): Promise<string | null> {
	if (!featuredMediaId) return null;
	try {
		const res = await fetch(
			`${apiUrl}/wp-json/wp/v2/media/${featuredMediaId}?_fields=source_url`
		);
		if (!res.ok) return null;
		const media = await res.json();
		return media.source_url;
	} catch {
		return null;
	}
}

function extractImageFromContent(html: string): string | null {
	const match = html.match(/<img[^>]+src="([^"]+)"/);
	return match ? match[1] : null;
}

async function fetchPosts(apiUrl: string, page: number): Promise<Post[]> {
	try {
		const res = await fetch(
			`${apiUrl}/wp-json/wp/v2/posts?page=${page}&per_page=${PER_PAGE}&_fields=id,title,slug,content,featured_media,date`
		);
		if (!res.ok) return [];
		const posts: Post[] = await res.json();
		const postsWithImages = await Promise.all(
			posts.map(async (post) => {
				let imageUrl = await getImageUrl(apiUrl, post.featured_media);
				if (!imageUrl) imageUrl = extractImageFromContent(post.content.rendered);
				return { ...post, imageUrl };
			})
		);
		return postsWithImages;
	} catch {
		return [];
	}
}

interface BlogProps {
	blogApiUrl?: string;
}

export default function Blog({ blogApiUrl = BLOG_API_URL }: BlogProps) {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [loadingMore, setLoadingMore] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		async function loadInitial() {
			setLoading(true);
			const data = await fetchPosts(blogApiUrl, 1);
			setPosts(data);
			setHasMore(data.length >= PER_PAGE);
			setLoading(false);
		}
		loadInitial();
	}, [blogApiUrl]);

	async function handleLoadMore() {
		const nextPage = currentPage + 1;
		setLoadingMore(true);
		const newPosts = await fetchPosts(blogApiUrl, nextPage);
		setPosts((prev) => [...prev, ...newPosts]);
		setCurrentPage(nextPage);
		setHasMore(newPosts.length >= PER_PAGE);
		setLoadingMore(false);
	}

	return (
		<section className="text-primary pb-8">
			<div className="bg-primary py-16">
				<h1 className="text-center text-white font-bold text-4xl mb-8">Blog</h1>
				<p className="text-center text-white text-lg">
					Fique por dentro das novidades, dicas e tutoriais para aproveitar ainda mais seu conhecimento.
				</p>
			</div>

			{loading ? (
				<div className="max-w-7xl mx-auto py-16 text-center">
					<Icon icon="svg-spinners:90-ring-with-bg" className="text-5xl text-primary mx-auto" />
					<p className="text-white mt-4">Carregando posts...</p>
				</div>
			) : (
				<>
					<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 py-8">
						{posts.map((post) => (
							<article
								key={post.id}
								className="bg-white hover:-translate-y-1 duration-300 rounded-lg shadow-lg overflow-hidden"
							>
								{post.imageUrl && (
									<a href={`/posts/${post.slug}/`}>
										<img
											src={post.imageUrl}
											alt={`Imagem do post: ${post.title.rendered}`}
											className="w-full h-48 object-cover"
											loading="lazy"
										/>
									</a>
								)}
								<div className="p-6 text-black">
									<h2 className="text-xl font-bold mb-2">
										<a
											href={`/posts/${post.slug}/`}
											className="text-black hover:underline"
											dangerouslySetInnerHTML={{ __html: post.title.rendered }}
										/>
									</h2>
									<p className="text-sm mb-4 flex items-center gap-2 text-black">
										<Icon icon="mdi:calendar" className="text-lg flex-shrink-0" />
										{formatDate(post.date)}
									</p>
									<p className="text-sm leading-relaxed mb-4 text-black">
										{stripHtml(post.content.rendered)}
									</p>
									<a
										href={`/posts/${post.slug}/`}
										className="text-black hover:underline"
									>
										Leia mais »
									</a>
								</div>
							</article>
						))}
					</div>

					{hasMore && posts.length > 0 && (
						<div className="text-center mt-8">
							<button
								onClick={handleLoadMore}
								disabled={loadingMore}
								className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-secondary duration-300 disabled:opacity-50"
							>
								{loadingMore ? "Carregando..." : "Ver Mais"}
							</button>
						</div>
					)}
				</>
			)}
		</section>
	);
}
