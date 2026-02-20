import { Icon } from "@iconify/react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importar todos os Footers
const footersModules = import.meta.glob('../UI/Footers/*.tsx', {
    import: 'default',
    eager: true
});

export default function Footer() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    // Converter os módulos em array
    const footers = Object.entries(footersModules).map(([path, component], index) => {
        const fileName = path.split('/').pop()?.replace(/\.(tsx|jsx)$/, '') || `footer-${index}`;
        return {
            id: fileName,
            component: component as React.ComponentType<any>,
        };
    });

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div className="w-full px-8">
            <div className={`max-w-7xl pt-16  bg-white mx-auto ${isOpen ? 'block' : 'hidden'}`}>


                {/* Swiper Container */}
                <div className="relative">
                    {/* Botão Anterior */}
                    <button
                        onClick={handlePrev}
                        className="absolute -left-10 top-1/2 -translate-y-1/2 z-10  hover:scale-110 cursor-pointer text-white p-3 rounded-full transition-all duration-300 shadow-2xl"
                        aria-label="Previous slide"
                    >
                        <Icon icon="mdi:chevron-left" className="text-2xl" />
                    </button>

                    {/* Swiper */}
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onSlideChange={(swiper) => {
                            setSelectedIndex(swiper.activeIndex);
                        }}

                        className="px-12"
                    >
                        {footers.map((footer, index) => {
                            const Component = footer.component;
                            return (
                                <SwiperSlide key={footer.id}>
                                    <div className=" rounded-xl">
                                        <div className="overflow-hidden">
                                            <Component />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    {/* Botão Próximo */}
                    <button
                        onClick={handleNext}
                        className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 hover:scale-110 cursor-pointer text-white p-3 rounded-full transition-all duration-300 shadow-2xl"
                        aria-label="Next slide"
                    >
                        <Icon icon="mdi:chevron-right" className="text-2xl" />
                    </button>
                    <button
                        onClick={handleClose}
                        className="absolute -right-20 top-1/2 -translate-y-1/2 z-10  hover:text-red-500 transition-all cursor-pointer duration-300 text-white p-3 rounded-full transition-all duration-300 shadow-2xl"
                        aria-label="Next slide"
                    >
                        <Icon icon="famicons:close" className="text-2xl" />
                    </button>
                </div>


            </div>
        </div>
    );
}