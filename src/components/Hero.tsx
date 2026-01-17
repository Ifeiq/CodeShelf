interface HeroProps {
	title: string;
	subtitle: string;
	description: string;	
}

export default function Hero({ title, subtitle, description }: HeroProps) {
	return (
		<section className="bg-[#8c8e8e] py-32 pb-50 md:px-32 flex flex-col items-center justify-center">
			<h1 className="text-8xl font-bold text-primary">{title}</h1>
            <h1 className="text-8xl font-bold text-secondary text-center">{subtitle}</h1>
            <p className="text-white text-sm font-bold mt-4 text-center w-6/10 mx-auto">{description}</p>
		</section>
	);
}