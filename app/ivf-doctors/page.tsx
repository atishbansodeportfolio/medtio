import Link from 'next/link';

const CITIES = [
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Bangalore', slug: 'bangalore' },
  { name: 'Hyderabad', slug: 'hyderabad' },
];

export default function IVFDoctorsLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50  pb-20">
      <section className="bg-white  border-b border-gray-200  pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900  mb-6">
            Top IVF Doctors in India
          </h1>
          <p className="text-xl text-gray-600  max-w-2xl mx-auto mb-10">
            Compare years of experience, success rates, and ratings of leading fertility specialists.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {CITIES.map((city) => (
              <Link 
                key={city.slug} 
                href={`/ivf-doctors/${city.slug}`}
                className="bg-gray-50  hover:bg-teal-50 :bg-teal-900/20 border border-gray-100  rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1.5 group"
              >
                <span className="text-xl font-bold text-gray-900  group-hover:text-teal-600 transition-colors">
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
