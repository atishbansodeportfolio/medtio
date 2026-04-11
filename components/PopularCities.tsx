import Link from 'next/link';

const CITIES = ['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad'];

export default function PopularCities() {
  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Popular Cities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CITIES.map((city) => (
            <Link 
              key={city} 
              href={`/ivf-clinics/${city.toLowerCase()}`}
              className="bg-gray-50 dark:bg-gray-800/50 hover:bg-teal-50 dark:hover:bg-teal-900/20 border border-gray-100 dark:border-gray-800 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-teal-600 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {city}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
