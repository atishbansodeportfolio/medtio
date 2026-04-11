import Link from 'next/link';

const CITIES = [
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
];

export default function GynecologyClinicsLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Top Gynecology Clinics in India
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Find expert women&apos;s health care at top-rated gynecology clinics near you.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {CITIES.map((city) => (
              <Link 
                key={city.slug} 
                href={`/gynecology-clinics/${city.slug}`}
                className="bg-gray-50 dark:bg-gray-800/50 hover:bg-rose-50 dark:hover:bg-rose-900/20 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group"
              >
                <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  {city.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
