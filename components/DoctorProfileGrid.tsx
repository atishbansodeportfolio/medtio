"use client";

import { useRef } from 'react';
import Link from 'next/link';

interface DoctorProfileGridProps {
  doctors: any[];
}

export default function DoctorProfileGrid({ doctors }: DoctorProfileGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstElementChild?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
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
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-700 transition"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={scrollRight} 
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-teal-600 hover:bg-teal-50 dark:hover:bg-gray-700 transition"
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
        {doctors?.map((doctor: any) => (
          <div 
            key={doctor.id} 
            className="snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-auto h-auto flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6 flex-grow flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-teal-50 dark:bg-gray-700 mb-4 overflow-hidden flex items-center justify-center border-2 border-teal-100 dark:border-teal-900/50">
                {doctor.image_url ? (
                  <img src={doctor.image_url} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-teal-200 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                <Link href={`/doctor/${doctor.slug || doctor.id}`} className="hover:text-teal-600 transition-colors">
                  {doctor.name}
                </Link>
              </h3>
              
              <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-3">
                {doctor.qualification || 'Fertility Specialist'}
              </p>
              
              <div className="w-full space-y-2 mt-2">
                <div className="flex justify-between items-center text-sm border-b border-gray-50 dark:border-gray-700 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">Clinic</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{doctor.clinic_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-gray-50 dark:border-gray-700 pb-2">
                  <span className="text-gray-500 dark:text-gray-400">Experience</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{doctor.experience_years ? `${doctor.experience_years} years` : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-gray-500 dark:text-gray-400">Rating</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 mr-1">{doctor.rating || 'N/A'}</span>
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6 pt-2 mt-auto">
              <Link 
                href={`/doctor/${doctor.slug || doctor.id}`}
                className="block w-full text-center py-2.5 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:hover:bg-teal-900/40 text-teal-600 dark:text-teal-400 font-semibold rounded-lg transition-colors border border-transparent"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
        {(!doctors || doctors.length === 0) && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 w-full">
            No doctor details available.
          </div>
        )}
      </div>
    </div>
  );
}
