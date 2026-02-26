"use client";

import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { useState, useCallback } from "react";

function formatPhone(value: string): string {
	const digits = value.replace(/\D/g, "");
	if (digits.length <= 2) {
		return digits ? `(${digits}` : "";
	}
	if (digits.length <= 7) {
		return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
	}
	return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function digitsOnly(value: string): string {
	return value.replace(/\D/g, "");
}

export default function WhatsAppLinkGenerator() {
	const [phone, setPhone] = useState("");
	const [message, setMessage] = useState("");
	const [generatedLink, setGeneratedLink] = useState("");

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = digitsOnly(e.target.value);
		if (raw.length <= 11) {
			setPhone(formatPhone(raw));
		}
	};

	const generateLink = useCallback(() => {
		const num = digitsOnly(phone);
		if (num.length < 10) {
			toast.error("Digite um número válido (DDD + número)", {
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
		const fullNumber = num.length === 11 ? `55${num}` : `55${num}`;
		const base = `https://wa.me/${fullNumber}`;
		const link = message.trim()
			? `${base}?text=${encodeURIComponent(message.trim())}`
			: base;
		setGeneratedLink(link);
		toast.success("Link gerado!", {
			position: "top-right",
			style: {
				background: "#1d1e22",
				color: "#fff",
				border: "1px solid #333",
				borderRadius: "8px",
			},
		});
	}, [phone, message]);

	const copyLink = useCallback(() => {
		if (!generatedLink) return;
		navigator.clipboard.writeText(generatedLink);
		toast.success("Link copiado!", {
			duration: 2000,
			position: "top-right",
			style: {
				background: "#1d1e22",
				color: "#fff",
				border: "1px solid #333",
				borderRadius: "8px",
			},
		});
	}, [generatedLink]);

	return (
		<section className="bg-[#0d0d0d] py-16 px-8 md:px-32 flex flex-col gap-12">
			<div className="flex flex-col gap-2 mx-auto">
				<h1 className="text-6xl font-bold text-primary text-center">WhatsApp</h1>
				<p className="text-xl font-bold text-secondary max-w-md text-center">
					Gerador de link com mensagem personalizada
				</p>
			</div>

			<div className="flex flex-col gap-6 w-1/3 mx-auto">
				<div>
					<label className="block text-gray-400 text-sm font-medium mb-2">
						Número
					</label>
					<input
						type="tel"
						value={phone}
						onChange={handlePhoneChange}
						placeholder="(11) 99999-9999"
						className="w-full px-4 py-3 bg-[#1d1e22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
					/>
				</div>

				<div>
					<label className="block text-gray-400 text-sm font-medium mb-2">
						Mensagem
					</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Olá! Gostaria de mais informações..."
						rows={4}
						className="w-full px-4 py-3 bg-[#1d1e22] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
					/>
				</div>

				<button
					onClick={generateLink}
					className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20BD5A] transition-colors"
				>
					<Icon icon="mdi:whatsapp" className="text-2xl" />
					Gerar link
				</button>
			</div>

			{generatedLink && (
				<div className="flex flex-col gap-4 max-w-xl w-full mx-auto">
					<h3 className="text-xl font-bold text-white">Link gerado</h3>
					<div className="flex flex-col sm:flex-row gap-3">
						<input
							type="text"
							value={generatedLink}
							readOnly
							className="flex-1 px-4 py-3 bg-[#1d1e22] border border-gray-700 rounded-lg text-gray-300 text-sm truncate"
						/>
						<div className="flex gap-2">
							<button
								onClick={copyLink}
								className="inline-flex items-center gap-2 px-4 py-3 bg-primary text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors shrink-0"
							>
								<Icon icon="solar:copy-outline" className="text-xl" />
								Copiar
							</button>
							<a
								href={generatedLink}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20BD5A] transition-colors shrink-0"
							>
								<Icon icon="mdi:open-in-new" className="text-xl" />
								Abrir
							</a>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
