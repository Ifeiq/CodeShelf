"use client";

import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { Icon } from "@iconify/react";

import "swiper/css";

import DynamicCodes from "@/components/DynamicCodes";

type Props = {
  codes: string[];
};

export default function DynamicCodesSwiper({ codes }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!codes || codes.length === 0) {
    return <p className="text-white/70">Nenhum código encontrado.</p>;
  }

  return (
    <div className="relative flex items-center gap-4">
      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Anterior"
        className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-primary hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
      >
        <Icon icon="mdi:chevron-left" className="text-2xl" />
      </button>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className=""
      >
        {codes.map((code, idx) => (
          <SwiperSlide key={idx}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <DynamicCodes code={code} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Próximo"
        className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-primary hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
      >
        <Icon icon="mdi:chevron-right" className="text-2xl" />
      </button>
    </div>
  );
}

