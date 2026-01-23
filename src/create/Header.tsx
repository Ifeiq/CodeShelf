import { Icon } from "@iconify/react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Importar todos os Headers
const headersModules = import.meta.glob('/src/Headers/*.jsx', { 
    import: 'default', 
    eager: true 
});

export default function Header() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

    // Converter os módulos em array
    const headers = Object.entries(headersModules).map(([path, component], index) => {
        const fileName = path.split('/').pop()?.replace('.jsx', '') || `header-${index}`;
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

    return (
        <div className="w-full px-8">
            <div className="max-w-7xl mx-auto">


                {/* Swiper Container */}
                <div className="relative">
                    {/* Botão Anterior */}
                    <button
                        onClick={handlePrev}
                        className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 hover:scale-110 cursor-pointer text-white p-3 rounded-full transition-all duration-300 shadow-lg"
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
                        {headers.map((header, index) => {
                            const Component = header.component;
                            return (
                                <SwiperSlide key={header.id}>
                                    <div className="rounded-xl">
                                       
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
                </div>

              
            </div>
        </div>
    );
}