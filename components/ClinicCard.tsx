import Link from 'next/link';

interface ClinicCardProps {
  name: string;
  address: string;
  rating: number | null;
  slug: string;
  specialtySlug?: string;
}

export default function ClinicCard({ name, address, rating, slug, specialtySlug = 'ivf' }: ClinicCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg className="w-12 h-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">{name}</h3>
          <div className="flex items-center shrink-0 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded text-sm font-semibold text-blue-700 dark:text-blue-300 ml-3">
            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {rating || '4.5'}
          </div>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6 flex-1">
          <svg className="w-4 h-4 mr-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-2">{address}</span>
        </div>
        <div className="mt-auto">
            <Link href={`/${specialtySlug}-clinics/${slug}`} className="block w-full text-center bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/40 font-medium py-2.5 rounded-lg transition-colors">
            View Details
            </Link>
        </div>
      </div>
    </div>
  );
}
