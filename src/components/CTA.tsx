import { Icon } from "@iconify/react";

export default function CTA() {
	return (
		<section className="bg-black py-8 px-8 md:px-32 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-32">
			<h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl text-center md:text-left">
				Encontre sua <span className="uppercase">UI</span> perfeita agora!
			</h2>
			<button className="bg-white flex flex-row items-center gap-2 rounded-full text-black font-bold px-12 md:px-16 py-3 hover:opacity-90 transition-opacity whitespace-nowrap">
				Buscar <Icon icon="mdi:arrow-right" width="22" height="22" />
			</button>
		</section>
	);
}

