interface HeroProps {
	title: string;
	subtitle: string;
	description: string;	
}

export default function Hero({ title, subtitle, description }: HeroProps) {
	return (
		<section className="bg-[#8c8e8e] py-12 md:py-32 pb-16 md:pb-50 px-4 md:px-32 flex flex-col items-center justify-center">
			<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-primary text-center">{title}</h1>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-secondary text-center">{subtitle}</h1>
            <p className="text-white text-xs sm:text-sm font-bold mt-4 text-center w-11/12 sm:w-9/12 md:w-6/10 mx-auto px-2">{description}</p>
		</section>
	);
}