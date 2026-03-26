interface Props {
    href: string
}

export default function BannerMobile({ href }: Props) {
    return (
        <div>
            <video 
                className="w-full aspect-Default md:hidden" 
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