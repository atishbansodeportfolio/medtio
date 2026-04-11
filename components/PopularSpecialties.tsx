import Link from 'next/link';
import Image from 'next/image';

const SPECIALTIES = [
  {
    name: 'IVF',
    slug: 'ivf',
    description: 'Advanced fertility treatments',
    image: '/specialties/ivf2.png',
    accent: 'teal',
  },
  {
    name: 'Dermatology',
    slug: 'dermatology',
    description: 'Skin, hair & nail care',
    image: '/specialties/dermatology2.png',
    accent: 'sky',
  },
  {
    name: 'Gynecology',
    slug: 'gynecology',
    description: "Women's health specialists",
    image: '/specialties/gynecology2.png',
    accent: 'rose',
  },
  {
    name: 'Cardiology',
    slug: 'cardiology',
    description: 'Heart & cardiovascular care',
    image: '/specialties/cardiology2.png',
    accent: 'red',
  },
  {
    name: 'Orthopedic',
    slug: 'orthopedic',
    description: 'Bone, joint & spine care',
    image: '/specialties/orthopedic2.png',
    accent: 'amber',
  },
  {
    name: 'Pediatrics',
    slug: 'pediatrics',
    description: 'Child healthcare experts',
    image: '/specialties/pediatrics3.png',
    accent: 'purple',
  },
];

export default function PopularSpecialties() {
  return (
    <section className="py-16 bg-white dark:bg-background border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Popular Specialties
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPECIALTIES.map((spec) => (
            <Link
              key={spec.name}
              href={`/${spec.slug}-clinics/mumbai`}
              className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white dark:bg-gray-800/60 flex flex-col"
            >
              {/* Real Image Area */}
              <div className="relative w-full overflow-hidden" style={{ height: '200px' }}>
                <Image
                  src={spec.image}
                  alt={spec.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                />
              </div>

              {/* Text Area */}
              <div className="p-3 flex flex-col gap-0.5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                  {spec.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                  {spec.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
