import { ivfclinics } from '@/src/data/ivf-clinics';
import { gynecologyclinics } from '@/src/data/gynecology-clinics';
import Link from 'next/link';
import ClinicImage from './ClinicImage';

export default async function FeaturedClinics() {
  const clinics = [...ivfclinics, ...gynecologyclinics].slice(0, 6);

  return (
    <section className="py-20 bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900  mb-2">Featured Clinics</h2>
            <p className="text-gray-600 ">Discover top-rated fertility centers across India</p>
          </div>
          <Link href="/ivf/mumbai" className="hidden md:block text-teal-600 hover:text-teal-700 font-medium transition-colors">
            View All &rarr;
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinics?.map((clinic: any) => (
            <div key={clinic.id} className="bg-white  rounded-2xl shadow-sm border border-gray-100  overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gray-200  relative overflow-hidden">
                <ClinicImage 
                  src={clinic.image_url || `/images/${clinic.specialty_slug}-clinics/${clinic.city_slug}/${clinic.slug}.webp`} 
                  alt={clinic.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900  line-clamp-1">{clinic.name}</h3>
                  <div className="flex items-center shrink-0 bg-blue-50  px-2 py-1 rounded text-sm font-semibold text-blue-700  ml-3">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {clinic.rating || '4.5'}
                  </div>
                </div>
                <div className="flex items-center text-gray-500  text-sm mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {clinic.city}
                </div>
                <Link href={`/clinic/${clinic.slug || clinic.id}`} className="block w-full text-center bg-teal-50  text-teal-600  hover:bg-teal-100 :bg-teal-900/40 font-medium py-2.5 rounded-lg transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
          {(!clinics || clinics.length === 0) && (
            <div className="col-span-full py-12 text-center bg-white  rounded-2xl border border-gray-100 ">
              <p className="text-gray-500  font-medium">No clinics available to display.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
