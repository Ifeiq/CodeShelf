interface Props {
    href: string
}

export default function Banner({ href }: Props) {
    return (
        <div>
            <video 
                className="w-full aspect-Default hidden md:block max-lg:hidden" 
                src={href} 
                autoPlay 
                loop 
                muted 
                playsInline 
                controlsList="nodownload"
            >
                Banner não disponível
            </video>
        </div>
    )
}