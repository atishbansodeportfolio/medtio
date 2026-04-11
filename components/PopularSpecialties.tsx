import Link from 'next/link';

const SPECIALTIES = [
  { name: 'IVF', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { name: 'Dermatology', icon: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5' },
  { name: 'Gynecology', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Cardiology', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { name: 'Orthopedic', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { name: 'Pediatrics', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

export default function PopularSpecialties() {
  return (
    <section className="py-16 bg-white dark:bg-background border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Popular Specialties</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPECIALTIES.map((spec) => (
            <Link 
              key={spec.name} 
              href={`/${spec.name.toLowerCase()}/mumbai`}
              className="bg-gray-50 dark:bg-gray-800/50 border border-transparent dark:border-gray-700/50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-teal-100 dark:hover:border-teal-900 group"
            >
              <div className="w-14 h-14 mx-auto bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-100 dark:group-hover:bg-teal-800/50 transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={spec.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{spec.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
