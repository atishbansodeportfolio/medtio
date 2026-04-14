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
          md:grid md:grid-cols-2 lg:grid-cols-4 
          gap-6 md:gap-8 pb-4
        "
      >
        {doctors?.map((doctor: any) => (
          <div 
            key={doctor.id} 
            className="snap-start shrink-0 w-[85vw] sm:w-[320px] md:w-auto h-auto flex flex-col bg-white  rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 "
          >
            <div className="p-6 flex-grow flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-teal-50  mb-4 overflow-hidden flex items-center justify-center border-2 border-teal-100 ">
                {doctor.image_url ? (
                  <img src={doctor.image_url} alt={doctor.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-10 h-10 text-teal-200 " fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                )}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900  mb-1">
                <Link href={`/${doctor.specialty_slug || 'ivf'}-doctors/${doctor.slug || doctor.id}`} className="hover:text-teal-600 transition-colors">
                  {doctor.name}
                </Link>
              </h3>
              
              <p className="text-xs text-teal-600  font-medium mb-3">
                {doctor.qualification || 'Fertility Specialist'}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center bg-blue-50  px-1.5 py-0.5 rounded text-[10px] font-bold text-blue-700 ">
                  <svg className="w-3 h-3 mr-0.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {doctor.rating || '4.5'}
                </div>
                <div className="text-[10px] text-gray-400 font-medium">
                  {doctor.clinic_name || 'Top Clinic'}
                </div>
              </div>

              <p className="text-[11px] text-gray-600  leading-relaxed mb-6 text-left line-clamp-4">
                Dr. {doctor.name} is a highly regarded {doctor.qualification || 'specialist'} practicing at {doctor.clinic_name || 'reputed medical centers'}. With {doctor.experience_years ? doctor.experience_years + ' years' : 'extensive years'} of clinical expertise, they focus on providing compassionate, patient-centered fertility care. Their commitment to utilizing advanced reproductive technologies has helped numerous families achieve successful outcomes.
              </p>
              
              <div className="w-full space-y-1.5 mt-auto">
                <div className="flex justify-between items-center text-[10px] border-b border-gray-50  pb-1.5 font-medium">
                  <span className="text-gray-400 uppercase tracking-tighter">Experience</span>
                  <span className="text-gray-700 ">{doctor.experience_years ? `${doctor.experience_years} years` : 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] pt-1 font-medium">
                  <span className="text-gray-400 uppercase tracking-tighter">Specialty</span>
                  <span className="text-gray-700 ">{doctor.specialty_slug?.toUpperCase() || 'IVF'}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6 pt-2 mt-auto">
              <Link 
                href={`/${doctor.specialty_slug || 'ivf'}-doctors/${doctor.slug || doctor.id}`}
                className="block w-full text-center py-2.5 bg-teal-50 hover:bg-teal-100  :bg-teal-900/40 text-teal-600  font-semibold rounded-lg transition-colors border border-transparent"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
        {(!doctors || doctors.length === 0) && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white  rounded-xl border border-gray-200  w-full">
            No doctor details available.
          </div>
        )}
      </div>
    </div>
  );
}
