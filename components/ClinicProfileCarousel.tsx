"use client";

import { useRef } from 'react';
import ClinicCard from '@/components/ClinicCard';

interface ClinicProfileCarouselProps {
  clinics: any[];
  displayCity: string;
}

export default function ClinicProfileCarousel({ clinics, displayCity }: ClinicProfileCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' }); // 24 = gap
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-20 group">
      {/* Mobile Arrows block */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-500 tracking-widest uppercase">Swipe to view more</h2>
        <div className="flex gap-2">
          <button 
            onClick={scrollLeft} 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white  shadow-sm border border-gray-200  text-teal-600 hover:bg-teal-50 :bg-gray-700 transition"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={scrollRight} 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white  shadow-sm border border-gray-200  text-teal-600 hover:bg-teal-50 :bg-gray-700 transition"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel / Grid */}
      <div 
        ref={scrollContainerRef}
        className="
          flex overflow-x-auto snap-x snap-mandatory 
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 
          md:grid md:grid-cols-2 lg:grid-cols-3 
          gap-6 md:gap-8 pb-4
        "
      >
        {clinics?.map((clinic: any) => (
          <div 
            key={clinic.id} 
            className="snap-start shrink-0 w-[85vw] sm:w-[300px] md:w-auto h-auto flex flex-col"
          >
            <ClinicCard
              name={clinic.name}
              address={clinic.address || clinic.area || clinic.city || displayCity}
              rating={clinic.rating}
              slug={clinic.slug || clinic.id}
            />
          </div>
        ))}
        {(!clinics || clinics.length === 0) && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white  rounded-xl border border-gray-200 ">
            No clinic details available.
          </div>
        )}
      </div>
    </div>
  );
}
